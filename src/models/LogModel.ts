import * as uuid from 'uuid/v4';
import { models } from 'models';
import { AbstractModel } from './AbstractModel';

export class LogModel implements AbstractModel<models.log.Attributes, models.log.RawAttributes> {
  private id?: string;
  private date: string;
  private startTime: string;
  private endTime: string;
  private duration: number;
  private projectId: string;
  private note: string;
  private createdAt?: Date;
  private updatedAt?: Date;

  constructor(attributes?: models.log.Attributes | models.log.RawAttributes, isRaw: boolean = true) {
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
  public get Date(): string {
    return this.date;
  }
  public get StartTime(): string {
    return this.startTime;
  }
  public get EndTime(): string {
    return this.endTime;
  }
  public get Duration(): number {
    return this.duration;
  }
  public get ProjectId(): string {
    return this.projectId;
  }
  public get Note(): string {
    return this.note;
  }
  public get CreatedAt(): Date {
    return this.createdAt;
  }
  public get UpdatedAt(): Date {
    return this.updatedAt;
  }

  public setId(id: string): LogModel {
    this.id = id;
    return this;
  }
  public setDate(date: string): LogModel {
    this.date = date;
    return this;
  }
  public setStartTime(time: string): LogModel {
    this.startTime = time;
    return this;
  }
  public setEndTime(time: string): LogModel {
    this.endTime = time;
    return this;
  }
  public setDuration(num: number): LogModel {
    this.duration = num;
    return this;
  }
  public setProjectId(projectId: string): LogModel {
    this.projectId = projectId;
    return this;
  }
  public setNote(note: string): LogModel {
    this.note = note;
    return this;
  }
  public setCreatedAt(stamp: Date): LogModel {
    this.createdAt = stamp;
    return this;
  }
  public setUpdatedAt(stamp: Date): LogModel {
    this.updatedAt = stamp;
    return this;
  }

  public mapJson(attributes: models.log.Attributes): LogModel {
    if (attributes !== undefined) {
      this.setId(attributes.id);
      this.setDate(attributes.date);
      this.setStartTime(attributes.startTime);
      this.setEndTime(attributes.endTime);
      this.setDuration(attributes.duration);
      this.setProjectId(attributes.projectId);
      this.setNote(attributes.note);
      this.setCreatedAt(attributes.createdAt);
      this.setUpdatedAt(attributes.updatedAt);
    }
    return this;
  }
  public mapDatabaseObject(attributes: models.log.RawAttributes): LogModel {
    if (attributes !== undefined) {
      this.setId(attributes.id);
      this.setDate(attributes.date);
      this.setStartTime(attributes.start_time);
      this.setEndTime(attributes.end_time);
      this.setDuration(attributes.duration);
      this.setProjectId(attributes.project_id);
      this.setNote(attributes.note);
      this.setCreatedAt(attributes.created_at);
      this.setUpdatedAt(attributes.updated_at);
    }
    return this;
  }

  public validate(): boolean {
    return !!this.date &&
           !!this.startTime &&
           !!this.endTime &&
           !!this.duration &&
           !!this.projectId &&
           !!this.note;
  }

  public toJSON(): Log {
    if (!this.id) {
      this.id = uuid();
    }
    return new Log(this);
  }
  public toDatabaseObject(): RawLog {
    if (!this.id) {
      this.id = uuid();
    }
    return new RawLog(this);
  }

  public merge(model: LogModel): LogModel {
    this.setId(model.id || this.Id);
    this.setDate(model.date || this.Date);
    this.setStartTime(model.startTime || this.StartTime);
    this.setEndTime(model.endTime || this.EndTime);
    this.setDuration(model.duration || this.Duration);
    this.setProjectId(model.projectId || this.ProjectId);
    this.setNote(model.note || this.Note);
    this.setCreatedAt(model.createdAt || this.CreatedAt);
    this.setUpdatedAt(model.updatedAt || this.UpdatedAt);
    return this;
  }
}

export class Log implements models.log.Attributes {
  public id?: string;
  public date: string;
  public startTime: string;
  public endTime: string;
  public duration: number;
  public projectId: string;
  public note: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(builder: LogModel) {
    this.id = builder.Id;
    this.date = builder.Date;
    this.startTime = builder.StartTime;
    this.endTime = builder.EndTime;
    this.duration = builder.Duration;
    this.projectId = builder.ProjectId;
    this.note = builder.Note;
    this.createdAt = builder.CreatedAt;
    this.updatedAt = builder.UpdatedAt;
  }
}

// tslint:disable:variable-name
export class RawLog implements models.log.RawAttributes {
  public id?: string;
  public date: string;
  public start_time: string;
  public end_time: string;
  public duration: number;
  public project_id: string;
  public note: string;
  public created_at?: Date;
  public updated_at?: Date;

  constructor(builder: LogModel) {
    this.id = builder.Id;
    this.date = builder.Date;
    this.start_time = builder.StartTime;
    this.end_time = builder.EndTime;
    this.duration = builder.Duration;
    this.project_id = builder.ProjectId;
    this.note = builder.Note;
    this.created_at = builder.CreatedAt;
    this.updated_at = builder.UpdatedAt;
  }
}