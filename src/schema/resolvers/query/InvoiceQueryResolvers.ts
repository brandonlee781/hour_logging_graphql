import { Context } from '../../../context';
import { InvoiceModel } from '../../../models/';

export const allInvoices = async (
  root, 
  data, 
  context: Context<common.PageinationArguments>
): Promise<{invoices: InvoiceModel[]}> => {
  const invoices = await context.Services.InvoiceService.findAll({ limit: 100, offset: 0 });
  return { invoices };
};

export const oneInvoice = async (
  root,
  { input: { id } }, 
  context: Context<common.PageinationArguments>
): Promise<{invoice: InvoiceModel}> => {
  const invoice = await context.Services.InvoiceService.findById(id);
  return { invoice };
};