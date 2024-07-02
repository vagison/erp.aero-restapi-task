import db from '../utils/db';

import {
  findTokenById,
  createToken,
  markTokensInactiveByRefreshTokenId,
} from '../queries/bearerToken';

// Helpers
function processToken(token) {
  if (!token) return;

  const processedToken = { ...token };
  processedToken.refreshToken = processedToken.refresh_token;
  delete processedToken.refresh_token;

  return processedToken;
}

// Controllers
async function findById(id) {
  const [response] = await db().execute(findTokenById(id));
  const token = processToken(response[0]);

  return token;
}

async function create(bearerToken, refreshToken) {
  const bearerTokenData = {
    bearerToken,
    refreshToken,
  };

  await db().execute(createToken(bearerTokenData));

  return bearerToken;
}

async function markTokensInactive(id) {
  return db().execute(markTokensInactiveByRefreshTokenId(id));
}

async function isTokenValid(id) {
  const token = await findById(id);

  if (!token || !token.active) {
    return false;
  }

  return true;
}

export {
  findById,
  create,
  markTokensInactive,
  isTokenValid,
};
