import * as passport from 'passport';
import { Strategy, ExtractJwt, JwtFromRequestFunction } from 'passport-jwt';
import { Logger } from '../core';
require('dotenv').config();

export class Authenticate {

  public static initialize() {
    const strategy = this.getStrategy();
    passport.use(strategy);
    return passport.initialize();
  }

  public static authenticate() {
    const strategy = this.getStrategy();
    passport.use(strategy);
    return passport.authenticate('jwt', { session: false });
  }
  
  public static getStrategy() {
    const params = {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    };
    return new Strategy(params, async (payload, done) => {
      if (payload) {
        return done(null, { email: payload.email });
      }
      return done(null, false);
    });
  }

}