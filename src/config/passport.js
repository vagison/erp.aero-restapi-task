import passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

import { jwtConfig } from '.';
import { UserModel } from '../models';

passport.use(
  new JWTStrategy(
    {
      secretOrKey: jwtConfig.secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        const userInDB = await UserModel.find(token.id);
        const user = { id: userInDB.id };

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
