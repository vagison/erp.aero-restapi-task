import express from 'express';

import { jwtMiddleware } from '../middlewares';
import { logoutController } from '../controllers';

const logoutRouter = express.Router();

logoutRouter.get('/', jwtMiddleware, logoutController);

export default logoutRouter;
