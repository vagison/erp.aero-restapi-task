import mysql2 from 'mysql2/promise';
import consola from 'consola';

import { dbConfig } from '../config';

let pool;

const connectToDatabase = async () => {
  try {
    if (!pool) {
      pool = await mysql2.createConnection(dbConfig);
      consola.success({ message: 'DB connection established', badge: true });
    } else {
      consola.warn({ message: 'DB connection already established', badge: true });
    }
  } catch (error) {
    consola.error({ message: `DB connection error: "${error}"`, badge: true });
    process.exit();
  }
};

const db = () => {
  if (!pool) throw new Error('Database not connected!');

  return pool;
};

export default db;
export { connectToDatabase };
