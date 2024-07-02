import jwt from 'jsonwebtoken';

import { jwtConfig, refreshTokenConfig } from '../config';

const generateJWT = (user) => jwt.sign(
  user,
  jwtConfig.secret,
  { expiresIn: jwtConfig.expiresIn },
);

const setAuthResponse = (res, bearerToken, refreshToken) => {
  res.cookie(refreshTokenConfig.key, refreshToken, {
    httpOnly: true,
    sameSite: refreshTokenConfig.requireSecure ? 'none' : 'lax',
    secure: refreshTokenConfig.requireSecure,
    maxAge: refreshTokenConfig.maxAge,
    domain: refreshTokenConfig.domain,
  });
  res.setHeader('authorization', `Bearer ${bearerToken}`);
};

export {
  generateJWT,
  setAuthResponse,
};
