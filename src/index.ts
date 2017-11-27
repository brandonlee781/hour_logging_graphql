import {
  Environment,
  Server,
  winstonStream,
  debugStream
} from './core';

// Import express libraries
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as cors from 'cors';

// Import customer middleware

// Import routes
import { DefaultRoutes, GraphQLRoute } from './routes';

// Create the express app
const app = Server.init();

// Helmet config
app.use(helmet());
app.use(helmet.noCache());
app.use(helmet.hsts({
  maxAge: 31536000,
  includeSubdomains: true,
}));

// Enable cors
app.use(cors());

// Add winston logging
app.use(morgan('dev', debugStream));
app.use(morgan('combined', winstonStream));

// Map routes to the application
DefaultRoutes.map(app);
GraphQLRoute.map(app);

Server.run(app, Environment.getConfig().server.port);