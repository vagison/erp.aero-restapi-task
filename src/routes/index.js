import express from 'express';

import testRouter from './test';
import signupRouter from './signup';
import signinRouter from './signin';
import logoutRouter from './logout';
import infoRouter from './info';
import fileRouter from './file';

const indexRouter = express.Router();

indexRouter.use('/test', testRouter);
indexRouter.use('/signup', signupRouter);
indexRouter.use('/signin', signinRouter);
indexRouter.use('/logout', logoutRouter);
indexRouter.use('/info', infoRouter);
indexRouter.use('/file', fileRouter);

export default indexRouter;
