import express from 'express';

import { infoController } from '../controllers';
import { jwtMiddleware } from '../middlewares';
import { isBearerValid } from '../middlewares/auth/bearer';

const infoRouter = express.Router();

infoRouter.get('/', jwtMiddleware, isBearerValid, infoController.get);

export default infoRouter;
