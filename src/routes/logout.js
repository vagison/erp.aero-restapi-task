import express from 'express';
import { logoutController } from '../controllers';
import { jwtMiddleware } from '../middlewares';

const logoutRouter = express.Router();

logoutRouter.get('/', jwtMiddleware, logoutController);

export default logoutRouter;
