import * as fs from 'fs';
import * as glob from 'glob-promise';
import * as path from 'path';
import { parse, buildASTSchema, extendSchema, GraphQLSchema } from 'graphql';
import { extractExtensionDefinitions, makeExecutableSchema } from 'graphql-tools';
import { resolvers } from '../schema/resolvers';

export class Schema {
  pathString = null;

  constructor() {
    this.pathString = '../schema/**/*.graphql';
  }

  init = (): Promise<GraphQLSchema> => {
    return new Promise(async (resolve, reject) => {
      try {
        const p = path.resolve(__dirname, this.pathString);
        const graphqlTypeDefs = await this.fileLoader(p);
        const schema = await this.buildSchema(graphqlTypeDefs);
        const executable = makeExecutableSchema({
          resolvers,
          typeDefs: schema,
        });
        resolve(executable);
      } catch (err) {
        reject(err);
      }
    });
  }

  buildSchema(typeDefs: string) {
    const astDocument = parse(typeDefs);
    return astDocument;
  }

  fileLoader = async (pattern) => {
    const files = await this.getGlob(pattern);
    const schemaFile = await this.makeSchema(files);
    return Promise.resolve(schemaFile);
  }

  private getGlob = async (pattern) => {
    return await glob(pattern);
  }
  private makeSchema = async (fileNames) => {
    const promises = fileNames.map(this.readFile);
    return Promise.all(promises).then(content => content.join());
  }
  private readFile = async (fileName) => {
    return new Promise((resolve, reject) => {
      fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

}