import mysql2 from 'mysql2/promise';
import consola from 'consola';

import * as tableQueries from '../queries';
import { dbConfig } from '../config';

let pool;

const db = () => {
  if (!pool) throw new Error('Database not connected!');

  return pool;
};

const initializeDb = async (db) => {
  const query = `
    ${tableQueries.userQueries.createTable()}
    ${tableQueries.refreshTokenQueries.createTable()}
    ${tableQueries.fileQueries.createTable()}
  `;

  await db.query(query);
};

const connectToDatabase = async () => {
  try {
    if (!pool) {
      pool = await mysql2.createConnection(dbConfig);
      await initializeDb(pool);
      consola.success({ message: 'DB connection established', badge: true });
    } else {
      consola.warn({ message: 'DB connection already established', badge: true });
    }
  } catch (error) {
    consola.error({ message: `DB connection error: "${error}"`, badge: true });
    process.exit();
  }
};

export default db;
export { connectToDatabase };
