import * as winston from 'winston';

import { Environment } from './Environment';

/**
 * Configure the winston logger
 */
const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level: Environment.getConfig().logger.console.level,
      timestamp: Environment.isProduction(),
      handleExceptions: Environment.isProduction(),
      json: Environment.isProduction(),
      colorize: !Environment.isProduction(),
    }),
  ],
  exitOnError: false,
});

const stream = streamFunction => ({
  stream: streamFunction
});

const write = writeFunction => ({
  write: (message: string) => writeFunction(message),
});

/**
 * Winston logger stream for Morgan
 */
export const winstonStream = stream(write(logger.info));

// Configure the debug module
process.env.DEBUG = Environment.getConfig().logger.debug;
// imports debug module
import * as Debug from 'debug';
const debug = Debug('app:response');

/**
 * Debug stream for mogran
 */
export const debugStream = stream(write(logger.info));

const format = (scope: string, message: string): string => `[${scope}]: ${message}`;

// tslint:disable:no-any
const parse = (args: any[]) => (args.length > 0) ? args : '';

export const Logger = (scope: string) => {
  const scopeDebug = Debug(scope);
  return {
    debug: (message: string, ...args: any[]) => {
      if (Environment.isProduction()) {
        logger.debug(format(scope, message), parse(args));
      }
      scopeDebug(message, parse(args));
    },
    verbose: (message: string, ...args: any[]) => logger.verbose(format(scope, message), parse(args)),
    silly: (message: string, ...args: any[]) => logger.silly(format(scope, message), parse(args)),
    info: (message: string, ...args: any[]) => logger.info(format(scope, message), parse(args)),
    warn: (message: string, ...args: any[]) => logger.warn(format(scope, message), parse(args)),
    error: (message: string, ...args: any[]) => logger.error(format(scope, message), parse(args)),
  };
};