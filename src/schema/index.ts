import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolvers';
import { Log, Project } from './types';

const RootQuery = `
  type Query {
    allLogs: [Log!]!
    allProjects: [Project!]!
  }
`;
const Mutations = `
  type Mutation {
    createLog(
      startTime: String, 
      endTime: String, 
      date: String, 
      duration: Int, 
      project: String, 
      notes: String
    ): Log
  }
`;

export const schema = makeExecutableSchema({ 
  resolvers, 
  typeDefs: [
    Log,
    Project,
    RootQuery,
    Mutations
  ], 
});
