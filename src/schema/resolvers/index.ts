import { Context } from '../../context/Context';
import { 
  allLogs, 
  oneLog, 
  allProjects, 
  oneProject,
  allLogsByProjectName,
  allLogsByProjectId,
} from './query';
import { createLog, updateLog, deleteLog } from './mutation';

export const resolvers = {
  Query: {
    allLogs,
    oneLog,
    allLogsByProjectName,
    allLogsByProjectId,

    allProjects,
    oneProject,
  },
  Mutation: {
    createLog,
    updateLog,
    deleteLog
  },
  Log: {
    project: async ({ projectId }, data, context: Context<common.PageinationArguments>) => {
      const project = await context.Services.ProjectService.findById(projectId);
      return project.toDatabaseObject();
    },
  },
};