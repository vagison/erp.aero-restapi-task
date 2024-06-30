import passport from 'passport';
import createError from 'http-errors';

import { errorMessagesConstants } from '../../constants';

export default (req, res, next) => passport.authenticate('jwt', { session: false }, (err, user) => {
  if (err) {
    return next(err);
  }

  if (!user) {
    throw createError.Unauthorized(errorMessagesConstants.User.AccessDenied);
  }

  // Forward user information to the next middleware
  req.user = user;
  return next();
})(req, res, next);
