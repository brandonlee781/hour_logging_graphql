import * as express from 'express';
import * as bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { schema } from './schema';
import { connectMongo } from './mongo-connection';

const PORT = 3000;

const start = async () => {
  const mongo = await connectMongo();
  const app = express();

  app.use('/graphql', bodyParser.json(), graphqlExpress({ 
    schema,
    context: { mongo },
  }));
  app.get('/graphiql', graphiqlExpress({ 
    endpointURL: '/graphql' 
  }));

  app.listen(PORT, () => {
    console.log(`GraphQL server started on port ${PORT}`);
  });
};

start();
