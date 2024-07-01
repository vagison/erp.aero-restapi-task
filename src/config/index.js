import dotenv from 'dotenv';
import { timeConstants } from '../constants';

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
  multipleStatements: true,
};

const jwtConfig = {
  secret: process.env.JWT_SECRET || 'keyboard-cat',
  expiresIn: +process.env.JWT_EXPIRES_IN || 600,
};

const refreshTokenConfig = {
  key: process.env.REFRESH_TOKEN_KEY || 'refreshToken',
  requireSecure: process.env.REFRESH_TOKEN_REQUIRE_SECURE === 'true',
  maxAge: +process.env.REFRESH_TOKEN_MAX_AGE || timeConstants.twoWeeks,
  domain: process.env.REFRESH_TOKEN_DOMAIN || 'localhost',
};

export {
  corsConfig, dbConfig, jwtConfig, refreshTokenConfig,
};
