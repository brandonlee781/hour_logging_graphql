import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolvers';

const typeDefs = `
  type Log {
    id: ID!
    startTime: String
    endTime: String
    date: String
    duration: Int
    project: String
    notes: String
  }

  type Query {
    allLogs: [Log!]!
  }

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

export const schema = makeExecutableSchema({ typeDefs, resolvers });
