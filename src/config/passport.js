import passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

import { jwtConfig } from '.';
import db from '../utils/db';
import { findById } from '../queries/users';

passport.use(
  new JWTStrategy(
    {
      secretOrKey: jwtConfig.secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        const results = (await db().execute(findById(token.id)))[0];
        const user = results[0];

        if (user) {
          return done(null, user);
        }

        return done(null, false);
      } catch (error) {
        return done(error, false);
      }
    },
  ),
);
