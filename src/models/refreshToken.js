import moment from 'moment';
import { v4 as uuid } from 'uuid';

import { timeConstants } from '../constants';
import db from '../utils/db';
import {
  createToken,
  findTokenById,
  markTokenInactive,
} from '../queries/refreshToken';

function processToken(token) {
  if (!token) return;

  const processedToken = { ...token };
  processedToken.createDate = processedToken.create_date;
  delete processedToken.create_date;

  return processedToken;
}

async function findById(id) {
  const [response] = await db().execute(findTokenById(id));
  const token = response[0];

  return processToken(token);
}

async function create(user) {
  const refreshTokenData = {
    id: uuid(),
    user: user.id,
    createDate: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
  };

  await db().execute(createToken(refreshTokenData));

  return refreshTokenData.id;
}

async function markInactive(id) {
  return db().execute(markTokenInactive(id));
}

async function isTokenValid(id) {
  const token = await findById(id);
  const expired = (moment(token.createDate, 'YYYY-MM-DD HH:mm:ss').add(timeConstants.twoWeeks)).isBefore(moment());

  if (!token || !token.active || expired) {
    return false;
  }

  return token;
}

export {
  create,
  findById,
  markInactive,
  isTokenValid,
};
