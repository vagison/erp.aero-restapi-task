import express from 'express';
import { infoController } from '../controllers';
import { jwtMiddleware } from '../middlewares';

const infoRouter = express.Router();

infoRouter.get('/', jwtMiddleware, infoController.get);

export default infoRouter;
