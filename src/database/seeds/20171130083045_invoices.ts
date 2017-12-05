import { Tables } from '../../core/Tables';
import * as Knex from 'knex';
import * as _ from 'lodash';
import { DateTime } from 'luxon';
import { LogModel } from '../../models/index';
import { makeInvoice } from '../factories/InvoiceFactory';

interface Invoice {
  number: number;
  date: string;
  logs: LogModel[];
  hours: number;
}

exports.seed = async (db: Knex): Promise<void> => {
  const logsRaw = await db.select().from(Tables.Logs);
  const logs: LogModel[] = logsRaw.map(log => new LogModel(log));
  // Start with today
  const today = DateTime.local();
  const weeks = [];
  // Divide the last month in weeks
  let i = 0;
  while (i <= 4) {
    weeks.push(today.minus({ days: i * 7 }));
    i += 1;
  }
  // each invoice will be one weeks worth of logs
  const invoices: Invoice[] = weeks.map((week, key) => {
    const currLogs = logs.filter((log) => {
      const dt = DateTime.fromISO(log.Date);
      return dt < week && dt > week.minus({ days: 7 });
    });
    return {
      logs: currLogs,
      number: key + 1,
      date: week.plus({ days: 7 }).toFormat('yyyy-MM-dd'),
      hours: currLogs.map(l => l.Duration).reduce((a, b) => { return a + b; }, 0),
    };
  });

  const entries = invoices.map((inv) => {
    const currInv = Object.assign({}, makeInvoice(inv).toJSON());
    return {
      id: currInv.id,
      number: currInv.number,
      date: currInv.date,
      logs: JSON.stringify(currInv.logs),
      hours: currInv.hours,
      rate: currInv.rate
    };
  });
  return await db(Tables.Invoices).insert(entries);
};
