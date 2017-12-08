import { Context } from '../../../context';
import { InvoiceModel } from '../../../models/';

interface CreateInvoiceInput {
  input: {
    invoice: {
      number: number;
      date: string;
      hours: number;
      rate: number;
      logs: string[];
    };
  };
}

export const createInvoice = async (
  root,
  { input: { invoice } }: CreateInvoiceInput,
  context: Context<common.PageinationArguments>
): Promise<{ invoice: InvoiceModel }> => {
  const allInvoices = await context.Services.InvoiceService.findAll({ limit: 100, offset: 0 });
  const logs = await context.Services.LogService.findByIds(invoice.logs);
  const invoiceObject = {
    logs,
    number: allInvoices.length + 1,
    date: invoice.date,
    hours: invoice.hours,
    rate: invoice.rate,
  };
  const invoiceModel = new InvoiceModel(invoiceObject, false);
  const newInvoice = await context.Services.InvoiceService.create(invoiceModel);
  return { invoice: newInvoice };
};