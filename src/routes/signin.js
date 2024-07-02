import express from 'express';

import { sanitizeCredentials } from '../middlewares/auth/sanitize';
import { requestValidator } from '../middlewares';
import {
  signinValidationSchema,
} from '../utils/schemas';
import { signinController } from '../controllers';

const signinRouter = express.Router();

signinRouter.post('/', sanitizeCredentials, requestValidator(signinValidationSchema), signinController.signin);
signinRouter.post('/new_token', signinController.newBearerToken);

export default signinRouter;
