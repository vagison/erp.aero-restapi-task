import db from './db';
import { findById } from '../queries/users';

const signupValidatorSchema = {
  id: {
    exists: true,
    trim: true,
    errorMessage: 'Phone number or email is required',
    custom: {
      options: async (id) => {
        const results = (await db().execute(findById(id)))[0];
        const user = results[0];

        if (user) {
          return Promise.reject(new Error('User with this phone number or email already exists'));
        }

        return '';
      },
    },
  },
  password: {
    exists: true,
    trim: true,
    errorMessage: 'Password is required',
    isLength: {
      options: {
        min: 6,
      },
      errorMessage: 'Password should be at least 6 chars long',
    },
  },
  first_name: {
    exists: {
      errorMessage: 'First name is required',
    },
    trim: true,
  },
  last_name: {
    exists: {
      errorMessage: 'Last name is required',
    },
    trim: true,
  },
};

const signinValidationSchema = {
  id: {
    exists: true,
    trim: true,
    errorMessage: 'Phone number or email is required',
  },
  password: {
    exists: true,
    trim: true,
    errorMessage: 'Password is required',
    isLength: {
      options: {
        min: 1,
      },
      errorMessage: 'Password is required',
    },
  },
};
export {
  signupValidatorSchema,
  signinValidationSchema,
};
