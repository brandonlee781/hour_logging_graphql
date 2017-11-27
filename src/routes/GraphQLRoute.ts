import * as express from 'express';
import * as bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';

import { Environment, DB } from '../core';
import { Exception } from '../exceptions';
import { schema } from '../schema';
import {
  Context,
  ServicesContext
} from '../context';
import {
  ProjectActions,
  LogActions
} from '../actions';
import {
  ProjectService,
  LogService
} from '../services';

export class GraphQLRoute {

  static map(app: express.Application): void {
    GraphQLRoute.buildContext();

    app.use('/graphql', bodyParser.json(), graphqlExpress({ 
      schema,
      context: {
        Services: ServicesContext.getInstance()
      }
    }));
    if (Environment.getName() !== 'production') {
      app.use('/graphiql', graphiqlExpress({
        endpointURL: '/graphql'
      }));
    }
  }

  private static buildContext(): void {
    ServicesContext.getInstance()
      .setProjectService(new ProjectService(new ProjectActions(DB)))
      .setLogService(new LogService(new LogActions(DB)));
  }

}