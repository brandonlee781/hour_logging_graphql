import * as uuid from 'uuid/v4';
import { models } from 'models';
import { LogModel } from './LogModel';
import { AbstractModel } from './AbstractModel';

export class Invoice implements models.invoice.Attributes {
  public id?: string;
  public number?: number;
  public date?: string;
  public logs?: models.log.Attributes[];
  public hours?: number;
  public rate?: number;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(builder: InvoiceModel) {
    this.id = builder.Id;
    this.number = builder.Number;
    this.date = builder.Date;
    this.logs = typeof builder.Logs === 'object' ? builder.Logs : JSON.parse(builder.Logs);
    this.hours = builder.Hours;
    this.rate = builder.Rate;
    this.createdAt = builder.CreatedAt;
    this.updatedAt = builder.UpdatedAt;
  }
}

// tslint:disable:variable-name
export class RawInvoice implements models.invoice.RawAttributes {
  public id?: string;
  public number?: number;
  public date?: string;
  public logs?: string;
  public hours?: number;
  public rate?: number;
  public created_at?: Date;
  public updated_at?: Date;

  constructor(builder: InvoiceModel) {
    this.id = builder.Id;
    this.number = builder.Number;
    this.date = builder.Date;
    this.logs = JSON.stringify(builder.Logs);
    this.hours = builder.Hours;
    this.rate = builder.Rate;
    this.created_at = builder.CreatedAt;
    this.updated_at = builder.UpdatedAt;
  }
}

export class InvoiceModel implements AbstractModel<models.invoice.Attributes, models.invoice.RawAttributes> {
  private id?: string;
  private number: number;
  private date: string;
  private logs: models.log.Attributes[] | string;
  private hours: number;
  private rate: number;
  private createdAt?: Date;
  private updatedAt?: Date;

  // tslint:disable-next-line:no-any
  constructor(attributes?: any, isRaw: boolean = true) {
    if (attributes) {
      if (isRaw) {
        this.mapDatabaseObject(attributes);
      } else {
        this.mapJson(attributes);
      }
    }
  }

  public get Id(): string {
    return this.id;
  }
  public get Number(): number {
    return this.number;
  }
  public get Date(): string {
    return this.date;
  }
  public get Logs(): models.log.Attributes[] | string {
    return this.logs;
  }
  public get Hours(): number {
    return this.hours;
  }
  public get Rate(): number {
    return this.rate;
  }
  public get CreatedAt(): Date {
    return this.createdAt;
  }
  public get UpdatedAt(): Date {
    return this.updatedAt;
  }

  public setId(id: string): InvoiceModel {
    this.id = id;
    return this;
  }
  public setNumber(num: number): InvoiceModel {
    this.number = num;
    return this;
  }
  public setDate(date: string): InvoiceModel {
    this.date = date;
    return this;
  }
  public setLogs(logs: models.log.Attributes[]): InvoiceModel  {
    this.logs = logs;
    return this;
  }
  public setHours(hours: number): InvoiceModel {
    this.hours = hours;
    return this;
  }
  public setRate(rate: number): InvoiceModel {
    this.rate = rate;
    return this;
  }
  public setCreatedAt(stamp: Date): InvoiceModel {
    this.createdAt = stamp;
    return this;
  }
  public setUpdatedAt(stamp: Date): InvoiceModel {
    this.updatedAt = stamp;
    return this;
  }

  public mapJson(attributes: models.invoice.Attributes): InvoiceModel {
    if (attributes !== undefined) {
      this.setId(attributes.id);
      this.setNumber(attributes.number);
      this.setDate(attributes.date);
      this.setLogs(attributes.logs);
      this.setHours(attributes.hours);
      this.setRate(attributes.rate);
      this.setCreatedAt(attributes.createdAt);
      this.setUpdatedAt(attributes.updatedAt);
    }
    return this;
  }
  public mapDatabaseObject(attributes: models.invoice.RawAttributes): InvoiceModel {
    if (attributes !== undefined) {
      this.setId(attributes.id);
      this.setNumber(attributes.number);
      this.setDate(attributes.date);
      this.setLogs(JSON.parse(attributes.logs));
      this.setHours(attributes.hours);
      this.setRate(attributes.rate);
      this.setCreatedAt(attributes.created_at);
      this.setUpdatedAt(attributes.updated_at);
    }
    return this;
  }

  public validate(): boolean {
    return !!this.number &&
           !!this.date &&
           !!this.logs &&
           !!this.hours &&
           !!this.rate;
  }

  public toJSON(): Invoice {
    if (!this.id) {
      this.id = uuid();
    }
    return new Invoice(this);
  }
  public toDatabaseObject(): RawInvoice {
    if (!this.id) {
      this.id = uuid();
    }
    return new RawInvoice(this);
  }

  public merge(model: InvoiceModel): InvoiceModel {
    let logs;
    this.setNumber(model.Number || this.Number);
    this.setDate(model.Date || this.Date);
    if (model.Logs) {
      logs = Array.isArray(model.Logs) ? model.Logs : JSON.parse(model.Logs);
    } else if (this.Logs) {
      logs = Array.isArray(this.Logs) ? this.Logs : JSON.parse(this.Logs);
    }
    this.setLogs(logs);
    return this;
  }
}
