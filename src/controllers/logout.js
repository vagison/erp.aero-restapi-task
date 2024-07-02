import PrettyError from 'pretty-error';

import { refreshTokenConfig } from '../config';
import { responseMessagesConstants } from '../constants';
import { BearerTokenModel, RefreshTokenModel } from '../models';

export default async (req, res, next) => {
  try {
    if (req.cookies && req.cookies.refreshToken) {
      // Marking refreshToken and bearerToken inactive
      const { refreshToken } = req.cookies;
      await RefreshTokenModel.markInactive(refreshToken);
      await BearerTokenModel.markTokensInactive(refreshToken);
    }
  } catch (error) {
    const pe = new PrettyError();
    console.log(pe.render(error));
  }

  res.clearCookie(refreshTokenConfig.key);

  return res.json({ message: responseMessagesConstants.Auth.Logout });
};
