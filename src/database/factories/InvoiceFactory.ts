import * as faker from 'faker';
import { DateTime } from 'luxon';
import { InvoiceModel, LogModel } from '../../models';

export const makeInvoice = (logs: LogModel[], num: number): InvoiceModel => {
  const hours = logs.map(log => log.Duration);
  return (new InvoiceModel())
    .setNumber(num)
    .setDate(DateTime.fromJSDate(faker.date.recent()).toFormat('yyyy-MM-dd'))
    .setLogs(logs.map(log => log.toJSON()))
    .setHours(hours.reduce((a, b) => a + b))
    .setRate(25);
};