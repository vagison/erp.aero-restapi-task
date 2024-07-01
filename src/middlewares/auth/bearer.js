import createHttpError from 'http-errors';

import { BearerTokenModel } from '../../models';
import { errorMessagesConstants } from '../../constants';

async function isBearerValid(req, res, next) {
  try {
    const isTokenValid = await BearerTokenModel.isTokenValid(req.headers.authorization.split(' ')[1]);

    if (!isTokenValid) {
      throw createHttpError.Unauthorized(errorMessagesConstants.Auth.InvalidBearerToken);
    }

    next();
  } catch (error) {
    next(error);
  }
}

export { isBearerValid };
