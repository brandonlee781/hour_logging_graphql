import * as Knex from 'knex';

import { models } from 'models';
import { Tables } from '../core/Tables';
import { AbstractActions } from './AbstractActions';
import { Utils } from '../core/Utils';

export class InvoiceActions extends AbstractActions<Knex> {

  public async findAll(options: common.PageinationArguments): Promise<models.invoice.RawAttributes[]> {
    return this.db
      .select()
      .from(Tables.Invoices)
      .limit(options.limit)
      .offset(options.offset)
      .orderBy('created_at', 'desc');
  }

  public async findById(id: string): Promise<models.invoice.RawAttributes> {
    const results = await this.db
      .select()
      .from(Tables.Invoices)
      .where('invoices.id', id);
    return Utils.single(results);
  }

  public async findByIds(ids: string[]): Promise<models.invoice.RawAttributes[]> {
    return this.db
      .select()
      .from(Tables.Invoices)
      .whereIn('invoices.id', ids);
  }

  public async create(invoice: models.invoice.RawAttributes): Promise<string> {
    return this.db
      .insert(invoice)
      .returning('id')
      .into(Tables.Invoices);
  }

}