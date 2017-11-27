import * as express from 'express';
import * as http from 'http';

import { Environment } from './Environment';
import { Logger } from './Logger';

const log = Logger('app:core:server');

export class Server {

  static init(): express.Application {
    return express();
  }

  static run(app: express.Application, port: string): http.Server {
    const server = app.listen(this.normalizePort(port));
    server.on('listening', () => this.onListening(server));
    server.on('error', error => this.onError(server, error));
    log.debug('Server was started on enviroment %s', Environment.getName());
    return server;
  }

  static normalizePort(port: string): number | string | boolean {
    const parsedPort = parseInt(port, 10);
    if (isNaN(parsedPort)) {
      return port; // named pipe
    }
    if (parsedPort >= 0) {
      return parsedPort; // port number
    }
    return false;
  }

  static onListening(server: http.Server): void {
    log.debug(`Listening on ${this.bind(server.address())}`);
  }

  static onError(server: http.Server, error: NodeJS.ErrnoException & Error): void {
    if (error.syscall !== 'listening') {
      throw error;
    }
    const addr = server.address();
    switch (error.code) {
      case 'EACCES':
        log.error(`${this.bind(addr)} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EASSRINUSE':
        log.error(`${this.bind(addr)} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  // tslint:disable-next-line:no-any
  private static bind(addr: string | any): string {
    return typeof addr === 'string'
      ? `pipe ${addr}`
      : `port ${addr.port}`;
  }
}