import express from 'express';

import testRouter from './test';
import signupRouter from './signup';
import signinRouter from './signin';
import logoutRouter from './logout';
import infoRouter from './info';

const indexRouter = express.Router();

indexRouter.use('/test', testRouter);
indexRouter.use('/signup', signupRouter);
indexRouter.use('/signin', signinRouter);
indexRouter.use('/logout', logoutRouter);
indexRouter.use('/info', infoRouter);

export default indexRouter;
