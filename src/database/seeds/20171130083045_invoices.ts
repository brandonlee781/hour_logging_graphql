import { Tables } from '../../core/Tables';
import * as Knex from 'knex';
import * as _ from 'lodash';
import { LogModel } from '../../models/index';
import { makeInvoice } from '../factories/InvoiceFactory';

const randNum = (a: number) => Math.floor(Math.random() * (a - 0 + 1)) + 0;
const getLogs = (logs: LogModel[], start: number): LogModel[] => {
  let i = 0;
  const y = (start + 10) <= logs.length ? start : logs.length - 10;
  const items = [];
  while (i  < 10) {
    items.push(logs[y + i]);
    i += 1;
  }
  return items;
};
exports.seed = async (db: Knex): Promise<void> => {
  const logsRaw = await db.select().from(Tables.Logs);
  const logs = logsRaw.map(log => new LogModel(log));
  const entries = _.times(10, (ind) => {
    const num = ind + 1;
    return makeInvoice(getLogs(logs, randNum(logs.length)), num).toDatabaseObject();
  });
  return await db(Tables.Invoices).insert(entries);
};
