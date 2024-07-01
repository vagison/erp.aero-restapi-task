import express from 'express';
import { signinController } from '../controllers';
import { requestValidator } from '../middlewares';
import {
  signinValidationSchema,
} from '../utils/schemas';
import { sanitizeCredentials } from '../middlewares/auth/sanitize';

const signinRouter = express.Router();

signinRouter.post('/', sanitizeCredentials, requestValidator(signinValidationSchema), signinController.signin);
signinRouter.post('/new_token', signinController.newBearerToken);

export default signinRouter;
