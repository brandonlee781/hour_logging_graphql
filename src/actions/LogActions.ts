import * as Knex from 'knex';

import { models } from 'models';
import { Tables } from '../core/Tables';
import { AbstractActions } from './AbstractActions';
import { Utils } from '../core/Utils';

export class LogActions extends AbstractActions<Knex> {

  public async findAll(options: common.PageinationArguments): Promise<models.log.RawAttributes[]> {
    return this.db
      .select('logs.*', 'projects.id as project_id', 'projects.name as project_name')
      .from(Tables.Logs)
      .join('projects', { project_id: 'projects.id' })
      .limit(options.limit)
      .offset(options.offset)
      .orderBy('created_at', 'desc')
      .orderBy('date', 'desc')
      .orderBy('start_time', 'desc');
  }

  public async findById(id: string): Promise<models.log.RawAttributes> {
    const results = await this.db
      .select('logs.*', 'projects.id as project_id', 'projects.name as project_name')
      .from(Tables.Logs)
      .join('projects', { project_id: 'projects.id' })
      .where('logs.id', id);
    return Utils.single(results);
  }

  public async findByIds(ids: string[]): Promise<models.log.RawAttributes[]> {
    const queryStr = this.db
        .select('logs.*', 'projects.id as project_id', 'projects.name as project_name')
        .from(Tables.Logs)
        .join('projects', { project_id: 'projects.id' })
        .whereIn('logs.id', ids)
        .toString();
    return this.db
      .select('logs.*', 'projects.id as project_id', 'projects.name as project_name')
      .from(Tables.Logs)
      .join('projects', { project_id: 'projects.id' })
      .whereIn('logs.id', ids);
  }

  public async findByProjectId(
    id: string, 
    limit: number, 
    offset: number
  ): Promise<models.log.RawAttributes[]> {
    return this.db
      .select('logs.*', 'projects.id as project_id', 'projects.name as project_name')
      .from(Tables.Logs)
      .join('projects', { project_id: 'projects.id' })
      .where('projects.id', id)
      .limit(limit)
      .offset(offset)
      .orderBy('created_at', 'desc')
      .orderBy('date', 'desc')
      .orderBy('start_time', 'desc');
  }

  public async findByDate(
    start: string = '1970-01-01',
    end: string = '2100-01-01',
    limit: number,
    offset: number,
    project?: string,
  ): Promise<models.log.RawAttributes[]> {
    return this.db
      .select('logs.*', 'projects.id as project_id', 'projects.name as project_name')
      .from(Tables.Logs)
      .join('projects', { project_id: 'projects.id' })
      .whereBetween('date', [start, end])
      .where(function () {
        if (project) {
          this.where('projects.name', project).orWhere('projects.id', project);
        }
      })
      .limit(limit)
      .offset(offset)
      .orderBy('created_at', 'desc')
      .orderBy('date', 'desc')
      .orderBy('start_time', 'desc');
  }

  public async search(text: string): Promise<models.log.RawAttributes[]> {
    return this.db
      .select('logs.*', 'projects.id as project_id', 'projects.name as project_name')
      .from(Tables.Logs)
      .join('projects', { project_id: 'projects.id' })
      .where('notes', 'like', `%${text}%`)
      .orderBy('updated_at', 'DESC');
  }

  public async create(project: models.log.RawAttributes): Promise<string> {
    return this.db
      .insert(project)
      .returning('id')
      .into(Tables.Logs);
  }

  public async update(project: models.log.RawAttributes): Promise<void> {
    await this.db
      .update(project)
      .into(Tables.Logs)
      .where('id', project.id);
  }

  public async delete(id: string): Promise<void> {
    return await this.db
      .del()
      .from(Tables.Logs)
      .where('id', id);
  }

}