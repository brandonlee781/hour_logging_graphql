import { GraphQLFieldConfig, GraphQLList } from 'graphql';

import { models } from 'models';
import { Project } from '../../models';
import { Logger } from '../../core';
import { Context } from '../../context';
import { Project as ProjectType } from '../types';
import { LimitArgument, OffsetArgument } from '../arguments';
import { AbstractQuery, GraphQLQueryInterface } from './AbstractQuery';

export class FindAllProjectsQuery extends AbstractQuery implements GraphQLFieldConfig, GraphQLQueryInterface {

  public log = Logger('app:schemas:project:FindAllProjectsQuery');

  public type = ProjectType;
  public args = {
    limit: new LimitArgument(),
    offset: new OffsetArgument(),
  };

  public before(
    context: Context<common.PageinationArguments>, 
    args: common.PageinationArguments
  ): Promise<common.PageinationArguments> {
    this.log.debug('before hook args', args);
    LimitArgument.validate(args.limit);
    OffsetArgument.validate(args.limit);
    return Promise.resolve(args);
  }

  public async execute(
    args: common.PageinationArguments, 
    context: Context<common.PageinationArguments>
  ): Promise<Project[]> {
    this.log.debug('resolve findAllProjects()');
    const projects = await context.Services.ProjectService.findAll({
      limit: args.limit,
      offset: args.offset
    });
    return projects.map(project => project.toJSON());
  }

}