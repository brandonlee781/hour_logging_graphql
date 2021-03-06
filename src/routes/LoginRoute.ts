import * as express from 'express';
import * as bodyParser from 'body-parser';
import { sign } from 'jsonwebtoken';
import { Environment, DB } from '../core';
import { genSalt, hash, compare } from 'bcryptjs';
require('dotenv').config();

type Res = express.Response;
type Req = express.Request;

const jwtSecret = process.env.JWT_SECRET;

export class LoginRoute {

  static map(app: express.Application): void {
    app.post('/api/login', async (req: Req, res: Res) => {
      const user = req.body;
      const dbPass = await DB.select().from('users').where('email', user.email);
      const comp = await compare(user.password, dbPass[0].password);
      const token = await sign(
        { email: dbPass[0].email, id: dbPass[0].id }, 
        jwtSecret, 
        { expiresIn: '14d' }
      );

      if (comp) {
        res.json({ token });
      } else {
        res.status(401).json({ error: 'username and password do not match' });
      }

    });
  }
}