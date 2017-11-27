import { Context } from '../context/Context';
import { allLogs, allProjects } from './queries';
import { createLog } from './mutations';

export const resolvers = {
  Query: {
    allLogs,
    allProjects
  },
  Mutation: {
    createLog
  },
  Log: {
    project: async ({ projectId }, data, context: Context<common.PageinationArguments>) => {
      const project = await context.Services.ProjectService.findById(projectId);
      return project.toDatabaseObject();
    }
  }
};