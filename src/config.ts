// tslint:disable
require('dotenv').config();
export = <config.Environments> {
  /**
   * Development Environments
   * ------------------------------------------
   * 
   * This is the local development environment, which is used by the developers
   */
  development: {
    database: {
      connection: `mysql://root:${process.env.MYSQL_PASS}@localhost:3306/hour_logger`,
      client: 'mysql',
      migrations: {
        directory: './src/database/migrations',
        tableName: 'version',
      },
      seeds: {
        directory: './src/database/seeds',
      },
    },
    server: {
      host: 'localhost',
      port: process.env.PORT || '3000',
      graphiql: true,
    },
    logger: {
      debug: 'app*',
      console: {
        level: 'error',
      },
    },
  },
  /**
   * Test Environment
   * -------------------------------------
   * 
   * This environment is used by the unit, migration and database test.
   */
  test: {
    database: {
      connection: `mysql://root:${process.env.MYSQL_PASS}@localhost:3306/hour_logger_test`,
      client: 'mysql',
      migrations: {
        directory: './src/databse/migrations',
        tableName: 'version'
      },
      seeds: {
        directory: './src/databse/seeds'
      }
    },
    server: {
      host: 'localhost',
      port: '8080' || process.env.PORT,
      graphiql: false,
    },
    logger: {
      debug: '',
      console: {
        level: 'none',
      },
    },
  },
  /**
   * Production Environment
   * ------------------------------------
   * 
   * This configuratino will be used by the cloud server.
   */
  production: {
    database: {
      connection: `mysql://root:${process.env.MYSQL_PASS}@localhost:3306/hour_logger_prod`,
      client: 'mysql',
      migrations: {
        directory: './src/database/migrations',
        tableName: 'version',
      },
      seeds: {
        directory: './src/database/seeds',
      },
    },
    server: {
      host: 'localhost',
      port: process.env.PORT || '3000',
      graphiql: false,
    },
    logger: {
      debug: '',
      console: {
        level: 'debug',
      },
    },
  },
};