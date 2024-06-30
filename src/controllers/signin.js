import createError from 'http-errors';

import { generateJWT, setAuthResponse } from '../utils/auth';
import { RefreshTokenModel, UserModel } from '../models';
import { errorMessagesConstants } from '../constants';

const signin = async (req, res, next) => {
  try {
    const { id, password } = req.body;
    const user = await UserModel.find(id);

    if (!user) {
      throw createError.NotFound(errorMessagesConstants.User.NotFound);
    }

    if (!(await UserModel.isValidPassword(password, user.password))) {
      throw createError.Unauthorized(errorMessagesConstants.User.InvalidPassword);
    }

    // Create or update the refreshToken
    const refreshToken = await RefreshTokenModel.create(user);

    // Create a bearerToken
    const bearerToken = generateJWT(user);

    setAuthResponse(
      res,
      bearerToken,
      refreshToken,
    );

    return res.json({ bearerToken });
  } catch (error) {
    next(error);
  }
};

const newBearerToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      throw createError.BadRequest(errorMessagesConstants.Auth.RefreshTokenRequired);
    }

    const refreshTokenInDb = await RefreshTokenModel.isTokenValid(refreshToken);

    const bearerToken = generateJWT({ id: refreshTokenInDb.user });

    setAuthResponse(
      res,
      bearerToken,
      refreshToken,
    );

    return res.json({ bearerToken });
  } catch (error) {
    next(error);
  }
};

export {
  signin, newBearerToken,
};
