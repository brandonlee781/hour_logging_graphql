import { DontBeAActions } from '../actions';
import { DontBeAModel } from '../models/DontBeAModel';
import { Logger } from '../core/Logger';
import { NotFoundException } from '../exceptions';

export class DontBeAService {

  private log = Logger('app:service:DontBeAService');

  constructor(private dontBeAAction: DontBeAActions) {}

  public async findAll(options: common.PageinationArguments): Promise<DontBeAModel[]> {
    this.log.debug('findAll called');
    const results = await this.dontBeAAction.findAll(options);
    return results.map(result => new DontBeAModel(result));
  }

  public async findRandom(): Promise<DontBeAModel> {
    this.log.debug('findRandom called');
    const result = await this.dontBeAAction.findRandom();
    return new DontBeAModel(result);
  }
}