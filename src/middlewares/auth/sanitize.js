import createHttpError from 'http-errors';
import * as EmailValidator from 'email-validator';
import parsePhoneNumber from 'libphonenumber-js';
import { errorMessagesConstants } from '../../constants';

const sanitizeCredentials = (req, res, next) => {
  try {
    if (EmailValidator.validate(req.body.id)) {
      return next();
    } else {
      const phoneNumber = parsePhoneNumber(`+${req.body.id.replace(/\D/g, '')}`);

      if (phoneNumber?.number) {
        req.body.id = phoneNumber.number;
        return next();
      } else {
        throw createHttpError.UnprocessableEntity(errorMessagesConstants.Auth.NoPhoneNumberOrEmail);
      }
    }
  } catch (error) {
    next(error);
  }
};

export { sanitizeCredentials };
