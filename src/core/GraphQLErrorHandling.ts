import * as uuid from 'uuid';
import {
  GraphQLType,
  GraphQLSchema,
  GraphQLObjectType,
} from 'graphql';

import { Environment } from './';
import { IsException } from '../exceptions';

// Mark field/type/schema
export const Processed = Symbol();

export class GraphQLErrorHandling {

  public static watch(schema: GraphQLSchema): void {
    this.maskSchema(schema);
  }

  private static maskSchema(schema: GraphQLSchema): void {
    const types = schema.getTypeMap();
    for (const typeName in types) {
      if (!Object.hasOwnProperty.call(types, typeName)) {
        continue;
      }
      this.maskType(types[typeName]);
    }
  }

  private static maskType(type: GraphQLType): void {
    const objectType: GraphQLObjectType = <GraphQLObjectType> type;
    if (objectType[Processed] || !objectType.getFields) {
      return;
    }

    const fields = objectType.getFields();
    for (const fieldName in fields) {
      if (!Object.hasOwnProperty.call(fields, fieldName)) {
        continue;
      }
      this.maskField(fields[fieldName]);
    }
  }

  // tslint:disable-next-line:no-any
  private static maskField(field: any): void {
    const resolveFn = field.resolve;
    if (field[Processed] || !resolveFn) {
      return;
    }

    field[Processed] = true;
    field.resolve = async (...args) => {
      try {
        const out = resolveFn.call(this, ...args);
        return await Promise.resolve(out);
      } catch (error) {
        throw this.handler(error);
      }
    };
  }

  // tslint:disable-next-line:no-any
  private static handler(error: any): Error {
    if (error[IsException]) {
      return new Error(error.toString());
    }
    const errId = uuid.v4();
    error.message = `${error.message}: ${errId}`;
    if (!Environment.isTest()) {
      console.error(error && error.stack || error);
    }
    error.message = `InternalError:${errId}`;
    return error;
  }
}
