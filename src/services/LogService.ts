import { LogActions } from '../actions';
import { LogModel, Log } from '../models/LogModel';
import { Logger } from '../core/Logger';
import { NotFoundException } from '../exceptions';

export interface DateFind {
  start: string;
  end: string;
  project?: string;
}

export class LogService {

  private log = Logger('app:service:LogService');

  constructor(private logActions: LogActions) {}

  public async findAll(
    options: common.PageinationArguments = { limit: 100, offset: 0 }
  ): Promise<LogModel[]> {
    this.log.debug('findAll called');
    const results = await this.logActions.findAll(options);
    return await results.map(result => new LogModel(result));
  }

  public async findById(id: string): Promise<LogModel> {
    this.log.debug('findById called with id=', id);
    const result = await this.logActions.findById(id);
    if (result === null) {
      throw new NotFoundException(id);
    }
    return new LogModel(result);
  }

  public async findByIds(ids: string[]): Promise<LogModel[]> {
    this.log.debug('findByIds called with ids=', ids);
    const results = await this.logActions.findByIds(ids);
    return results.map(result => new LogModel(result));
  }

  public async findByProjectId(
    id: string,
    options: common.PageinationArguments = { limit: 100, offset: 0 }
  ): Promise<LogModel[]> {
    this.log.debug('findByProjectId called with id=', id);
    const results = await this.logActions.findByProjectId(id, options.limit, options.offset);
    return results.map(result => new LogModel(result));
  }

  public async findByDate(
    input: DateFind = { start: '1907-01-01', end: '2100-01-01' },
    options: common.PageinationArguments = { limit: 100, offset: 0 },
    project?: string,
  ): Promise<LogModel[]> {
    this.log.debug('findByDate called with dates=', input.start, input.end);
    const results = await this.logActions.findByDate(
      input.start, input.end, 
      options.limit, options.offset,
      input.project
    );
    return results.map(result => new LogModel(result));
  }

  public async search(text: string): Promise<LogModel[]> {
    this.log.debug('search called with text=', text);
    const results = await this.logActions.search(text);
    return results.map(result => new LogModel(result));
  }

  public async create(logModel: LogModel): Promise<LogModel> {
    this.log.debug('created called with =', LogModel);
    await this.logActions.create(logModel.toDatabaseObject());
    return this.findById(logModel.Id);
  }

  public async update(logId: string, newLogModel: LogModel): Promise<LogModel> {
    this.log.debug('updated called with = ', newLogModel);
    const logModel = await this.findById(logId);
    logModel.merge(newLogModel);
    await this.logActions.update(logModel.toDatabaseObject());
    return this.findById(logId);
  }

  public async delete(id: string): Promise<void> {
    this.log.debug('delete called with id=', id);
    return await this.logActions.delete(id);
  }
}