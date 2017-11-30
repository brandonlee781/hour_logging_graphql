import { InvoiceActions } from '../actions';
import { InvoiceModel, Invoice } from '../models/InvoiceModel';
import { Logger } from '../core/Logger';
import { NotFoundException } from '../exceptions';
import { models } from 'models';

export class InvoiceService {

  private log = Logger('app:service:InvoiceService');

  constructor(private invoiceActions: InvoiceActions) {}

  public async findAll(options: common.PageinationArguments): Promise<InvoiceModel[]> {
    this.log.debug('findAll called');
    const results: models.invoice.RawAttributes[] = await this.invoiceActions.findAll(options);
    return await results.map(result => new InvoiceModel(result));
  }

  public async findById(id: string): Promise<InvoiceModel> {
    this.log.debug('findById called with id=', id);
    const result = await this.invoiceActions.findById(id);
    if (result === null) {
      throw new NotFoundException(id);
    }
    return new InvoiceModel(result);
  }

  public async findByIds(ids: string[]): Promise<InvoiceModel[]> {
    this.log.debug('findByIds called with ids=', ids);
    const results = await this.invoiceActions.findByIds(ids);
    return results.map(result => new InvoiceModel(result));
  }

  public async create(invoiceModel: InvoiceModel): Promise<InvoiceModel> {
    this.log.debug('created called with =', invoiceModel);
    await this.invoiceActions.create(invoiceModel.toDatabaseObject());
    return this.findById(invoiceModel.Id);
  }
}