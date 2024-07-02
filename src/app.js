// importing packages
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import http from 'http';
import consola from 'consola';

// importing other stuff
import { corsConfig } from './config';
import './config/passport';
import indexRouter from './routes';
import cookieParser from './middlewares/auth/cookie';
import { errorLogger, errorHandler, invalidPathHandler } from './middlewares';
import { connectToDatabase } from './utils/db';

async function start() {
  await connectToDatabase();
  const app = express();
  const server = http.createServer(app);
  app.enable('trust proxy');
  app.use(morgan('[:date[iso]] - :remote-addr - :user-agent - :method - :url - :status - :response-time ms'));
  app.use(cors(corsConfig));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use('/', indexRouter);
  app.use(invalidPathHandler);
  app.use(errorLogger);
  app.use(errorHandler);

  const PORT = +process.env.PORT || 3000;

  server.listen(PORT, () => {
    consola.ready({
      message: `Server is listening on http://127.0.0.1:${PORT}`,
      badge: true,
    });
  });
}

start();
