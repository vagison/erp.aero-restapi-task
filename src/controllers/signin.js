import createHttpError from 'http-errors';

import { generateJWT, setAuthResponse } from '../utils/auth';
import { BearerTokenModel, RefreshTokenModel, UserModel } from '../models';
import { errorMessagesConstants } from '../constants';

const signin = async (req, res, next) => {
  try {
    const { id, password } = req.body;
    const user = await UserModel.find(id);

    if (!user) {
      throw createHttpError.NotFound(errorMessagesConstants.User.NotFound);
    }

    if (!(await UserModel.isValidPassword(password, user.password))) {
      throw createHttpError.Unauthorized(errorMessagesConstants.User.InvalidPassword);
    }

    delete user.password;

    // Create a refreshToken
    const refreshToken = await RefreshTokenModel.create(user);

    // Create a bearerToken
    const bearerToken = generateJWT(user);

    // Store a connection between both token types
    await BearerTokenModel.create(bearerToken, refreshToken);

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
      throw createHttpError.BadRequest(errorMessagesConstants.Auth.InvalidRefreshToken);
    }

    const refreshTokenInDb = await RefreshTokenModel.isTokenValid(refreshToken);

    if (!refreshTokenInDb) {
      throw createHttpError.BadRequest(errorMessagesConstants.Auth.InvalidRefreshToken);
    }

    // Create a bearerToken
    const bearerToken = generateJWT({ id: refreshTokenInDb.user });

    // Mark all previous bearerTokens inactive for given refreshToken
    await BearerTokenModel.markTokensInactive(refreshToken);

    // Store a connection between both token types
    await BearerTokenModel.create(bearerToken, refreshToken);

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
