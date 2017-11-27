import { Project } from './project';

export const Log = `
  type Log {
    id: ID!
    startTime: String
    endTime: String
    date: String
    duration: Int
    project: Project
    note: String
    createdAt: String
    updatedAt: String
  }
`;