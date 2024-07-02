import mysql2 from 'mysql2/promise';
import consola from 'consola';

import { dbConfig } from '../config';
import * as tableQueries from '../queries';
import { errorMessagesConstants, logMessagesConstants } from '../constants';

let pool;

const db = () => {
  if (!pool) throw new Error(errorMessagesConstants.Database.NotConnected);

  return pool;
};

const initializeDb = async (db) => {
  const query = `
    ${tableQueries.userQueries.createTable()}
    ${tableQueries.refreshTokenQueries.createTable()}
    ${tableQueries.bearerTokenQueries.createTable()}
    ${tableQueries.fileQueries.createTable()}
  `;

  await db.query(query);
};

const connectToDatabase = async () => {
  try {
    if (!pool) {
      pool = await mysql2.createConnection(dbConfig);
      await initializeDb(pool);
      consola.success({ message: logMessagesConstants.Database.ConnectionEstablished, badge: true });
    } else {
      consola.warn({ message: logMessagesConstants.Database.ConnectionAlreadyEstablished, badge: true });
    }
  } catch (error) {
    consola.error({ message: `${errorMessagesConstants.Database.ConnectionError} "${error}"`, badge: true });
    process.exit();
  }
};

export default db;
export {
  connectToDatabase,
};
