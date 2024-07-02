import { errorMessagesConstants } from '../constants';
import { UserModel } from '../models';

const signupValidatorSchema = {
  id: {
    exists: true,
    trim: true,
    errorMessage: errorMessagesConstants.Auth.PhoneNumberOrEmailRequired,
    custom: {
      options: async (id) => {
        const user = await UserModel.findById(id);

        if (user) return Promise.reject(new Error(errorMessagesConstants.Auth.ExistingUser));

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
