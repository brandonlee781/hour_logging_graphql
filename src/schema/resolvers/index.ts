import { Context } from '../../context/Context';
import { 
  allLogs, 
  oneLog, 
  allProjects, 
  oneProject,
  allLogsByProjectName,
  allLogsByProjectId,
  allLogsByDates,
  allInvoices,
  oneInvoice,
  allDontBeAs,
  randomDontBeA
} from './query';
import { 
  createLog, 
  updateLog, 
  deleteLog,
  createProject,
  createInvoice,
} from './mutation';

export const resolvers = {
  Query: {
    allLogs,
    oneLog,
    allLogsByProjectName,
    allLogsByProjectId,
    allLogsByDates,

    allProjects,
    oneProject,

    allInvoices,
    oneInvoice,

    allDontBeAs,
    randomDontBeA,
  },
  Mutation: {
    createLog,
    updateLog,
    deleteLog,
    createProject,
    createInvoice,
  },
  Log: {
    project: async ({ projectId }, data, context: Context<common.PageinationArguments>) => {
      const project = await context.Services.ProjectService.findById(projectId);
      return project.toDatabaseObject();
    },
  },
};