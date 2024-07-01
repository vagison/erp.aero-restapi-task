import db from './db';
import { findById } from '../queries/users';
import { errorMessagesConstants } from '../constants';

const signupValidatorSchema = {
  id: {
    exists: true,
    trim: true,
    errorMessage: errorMessagesConstants.Auth.PhoneNumberOrEmailRequired,
    custom: {
      options: async (id) => {
        const results = (await db().execute(findById(id)))[0];
        const user = results[0];

        if (user) {
          return Promise.reject(new Error(errorMessagesConstants.Auth.ExistingUser));
        }

        return '';
      },
    },
  },
  password: {
    exists: true,
    trim: true,
    errorMessage: errorMessagesConstants.Auth.PasswordRequired,
    isLength: {
      options: {
        min: 6,
      },
      errorMessage: errorMessagesConstants.Auth.InvalidPasswordLength,
    },
  },
};

const signinValidationSchema = {
  id: {
    exists: true,
    trim: true,
    errorMessage: errorMessagesConstants.Auth.PhoneNumberOrEmailRequired,
  },
  password: {
    exists: true,
    trim: true,
    errorMessage: errorMessagesConstants.Auth.PasswordRequired,
    isLength: {
      options: {
        min: 1,
      },
      errorMessage: errorMessagesConstants.Auth.PasswordRequired,
    },
  },
};
export {
  signupValidatorSchema,
  signinValidationSchema,
};
