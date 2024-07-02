import express from 'express';

import { jwtMiddleware } from '../middlewares';
import { isBearerValid } from '../middlewares/auth/bearer';
import { infoController } from '../controllers';

const infoRouter = express.Router();

infoRouter.get('/', jwtMiddleware, isBearerValid, infoController.get);

export default infoRouter;
