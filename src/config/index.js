import dotenv from 'dotenv';

dotenv.config();

const corsConfig = {
  origin: '*',
  credentials: true,
};

export { corsConfig };
