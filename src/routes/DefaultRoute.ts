import * as express from 'express';

export class DefaultRoute {

  static map(app: express.Application): void {
    app.get('/api/', (req: express.Request, res: express.Response) => {
      const pkg = require('../../package.json');
      res.json({
        name: pkg.name,
        version: pkg.version,
        description: pkg.description,
      });
    });
  }
}