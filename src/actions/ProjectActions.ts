import * as Knex from 'knex';

import { models } from 'models';
import { Tables } from '../core/Tables';
import { AbstractActions } from './AbstractActions';
import { Utils } from '../core/Utils';

export class ProjectActions extends AbstractActions<Knex> {

  public async findAll(options: common.PageinationArguments): Promise<models.project.RawAttributes[]> {
    return this.db
      .select()
      .from(Tables.Projects)
      .limit(options.limit)
      .offset(options.offset);
  }

  public async findById(id: string): Promise<models.project.RawAttributes> {
    const results = await this.db
      .select()
      .from(Tables.Projects)
      .where('id', id);
    return Utils.single(results);
  }

  public async findByIds(ids: string[]): Promise<models.project.RawAttributes[]> {
    return this.db
      .select()
      .from(Tables.Projects)
      .whereIn('id', ids);
  }

  public async search(text: string): Promise<models.project.RawAttributes[]> {
    return this.db
      .select()
      .from(Tables.Projects)
      .where('name', 'like', `%${text}%`)
      .orderBy('updated_at', 'DESC');
  }

  public async create(project: models.project.RawAttributes): Promise<string> {
    const ids = await this.db
      .insert(project)
      .into(Tables.Projects);
    return Utils.single<string>(ids);
  }

  public async update(project: models.project.RawAttributes): Promise<void> {
    await this.db
      .update(project)
      .into(Tables.Projects)
      .where('id', project.id);
  }

  public async delete(id: string): Promise<void> {
    await this.db
      .delete()
      .from(Tables.Projects)
      .where('id', id);
  }

}