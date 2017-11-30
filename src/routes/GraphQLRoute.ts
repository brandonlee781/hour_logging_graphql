import { resolvers } from '../schema/resolvers';
import * as express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';

import { Environment, DB } from '../core';
import { Schema } from '../core/Schema';
import { Exception } from '../exceptions';
// import { schema } from '../schema';
import {
  Context,
  ServicesContext
} from '../context';
import {
  ProjectActions,
  LogActions,
  InvoiceActions
} from '../actions';
import {
  ProjectService,
  LogService,
  InvoiceService
} from '../services';
import { Authenticate } from '../middleware/Authenticate';
import { addResolveFunctionsToSchema } from 'graphql-tools';

export class GraphQLRoute {

  static async map(app: express.Application): Promise<void> {
    GraphQLRoute.buildContext();
    const schemaClass = new Schema();
    const schema = await schemaClass.init();

    app.use('/graphql', Authenticate.authenticate(), graphqlExpress(request => ({ 
      schema,
      context: {
        Services: ServicesContext.getInstance(),
        user: request.user
      }
    })));
    if (Environment.getName() !== 'production') {
      app.use('/graphiql', graphiqlExpress({
        endpointURL: '/graphql',
        // tslint:disable-next-line
        passHeader: `'Authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImJyYW5kb25sZWU3ODFAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkcmYzMldyayJ9.o4D-YFd07Davg2jBQG1j80rYIzN0joCGfOpkNy79Vz0'`
      }));
    }
  }

  private static buildContext(): void {
    ServicesContext.getInstance()
      .setProjectService(new ProjectService(new ProjectActions(DB)))
      .setLogService(new LogService(new LogActions(DB)))
      .setInvoiceService(new InvoiceService(new InvoiceActions(DB)));
  }

}