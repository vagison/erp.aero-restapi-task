import express from 'express';
import { signupController } from '../controllers';
import { requestValidator } from '../middlewares';
import {
  signupValidatorSchema,
} from '../utils/schemas';
import { sanitizeCredentials } from '../middlewares/auth/sanitize';

const signupRouter = express.Router();

signupRouter.post('/', sanitizeCredentials, requestValidator(signupValidatorSchema), signupController.signup);
// authRouter.get('/me', jwtMiddleware, authController.me);

export default signupRouter;
