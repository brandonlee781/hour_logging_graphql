import * as faker from 'faker';
import { DateTime } from 'luxon';
import { InvoiceModel, LogModel } from '../../models';

interface Invoice {
  number: number;
  date: string;
  logs: LogModel[];
  hours: number;
}

export const makeInvoice = (invoice: Invoice): InvoiceModel => {
  return (new InvoiceModel())
    .setNumber(invoice.number)
    .setDate(invoice.date)
    .setLogs(invoice.logs.map(log => log.toJSON()))
    .setHours(invoice.hours)
    .setRate(25);
};