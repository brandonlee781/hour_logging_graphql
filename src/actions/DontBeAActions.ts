import * as Knex from 'knex';

import { models } from 'models';
import { Tables } from '../core/Tables';
import { AbstractActions } from './AbstractActions';
import { Utils } from '../core/Utils';

export class DontBeAActions extends AbstractActions<Knex> {

  public async findAll(options: common.PageinationArguments): Promise<models.dontBeA.RawAttributes[]> {
    return this.db
      .select()
      .from(Tables.DontBeA)
      .limit(options.limit)
      .offset(options.offset);
  }

  public async findRandom(): Promise<models.dontBeA.RawAttributes> {
    const results = await this.db
      .select()
      .from(Tables.DontBeA);
    const index = this.randNum(1, results.length - 1);
    return results[index];
  }

  private randNum(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}