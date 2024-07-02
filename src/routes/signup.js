import express from 'express';

import { sanitizeCredentials } from '../middlewares/auth/sanitize';
import { requestValidator } from '../middlewares';
import {
  signupValidatorSchema,
} from '../utils/schemas';
import { signupController } from '../controllers';

const signupRouter = express.Router();

signupRouter.post('/', sanitizeCredentials, requestValidator(signupValidatorSchema), signupController.signup);

export default signupRouter;
