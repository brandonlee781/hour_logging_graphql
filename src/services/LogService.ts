import { LogActions } from '../actions';
import { LogModel, Log } from '../models/LogModel';
import { Logger } from '../core/Logger';
import { NotFoundException } from '../exceptions';

export class LogService {

  private log = Logger('app:service:LogService');

  constructor(private logActions: LogActions) {}

  public async findAll(options: common.PageinationArguments): Promise<LogModel[]> {
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

  public async search(text: string): Promise<LogModel[]> {
    this.log.debug('search called with text=', text);
    const results = await this.logActions.search(text);
    return results.map(result => new LogModel(result));
  }

  public async create(logModel: LogModel): Promise<LogModel> {
    this.log.debug('created called with =', LogModel);
    const id = await this.logActions.create(logModel.toDatabaseObject());
    return this.findById(id);
  }

  public async update(newLogModel: LogModel): Promise<LogModel> {
    this.log.debug('updated called with = ', newLogModel);
    const logModel = await this.findById(newLogModel.Id);
    logModel.merge(newLogModel);
    await this.logActions.update(logModel.toDatabaseObject());
    return this.findById(newLogModel.Id);
  }

  public async delete(id: string): Promise<void> {
    this.log.debug('delete called with id=', id);
    return this.logActions.delete(id);
  }
}