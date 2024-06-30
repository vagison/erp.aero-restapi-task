import dotenv from 'dotenv';

dotenv.config();

const corsConfig = {
  origin: '*',
  credentials: true,
};

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

export { corsConfig, dbConfig };
