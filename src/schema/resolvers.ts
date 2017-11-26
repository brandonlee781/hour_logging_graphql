import { allLogs } from './queries';
import { createLog } from './mutations';

export const resolvers = {
  Query: {
    allLogs
  },
  Mutation: {
    createLog
  },
  Log: {
    id: root => root._id || root.id,
  }
};