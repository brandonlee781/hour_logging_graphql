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
import * as bodyParser from 'body-parser';

// Import customer middleware
import { Authenticate } from './middleware/Authenticate';

// Import routes
import { DefaultRoute, GraphQLRoute, LoginRoute } from './routes';

// Create the express app
// Export to be used in testing
export const app = Server.init();

// Helmet config
app.use(helmet());
app.use(helmet.noCache());
app.use(helmet.hsts({
  maxAge: 31536000,
  includeSubdomains: true,
}));

// Enable cors
app.use(cors());

// Use body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Add winston logging
app.use(morgan('dev', debugStream));
app.use(morgan('combined', winstonStream));

// Use custom middleware
app.use(Authenticate.initialize());

// Map routes to the application
DefaultRoute.map(app);
GraphQLRoute.map(app);
LoginRoute.map(app);

export default Server.run(app, Environment.getConfig().server.port);