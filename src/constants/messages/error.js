const constants = {
  Auth: {
    ExistingUser: 'User with this phone number or email already exists',
    NoPhoneNumberOrEmail: 'Please enter a correct phone number or email',
    InvalidPassword: 'Invalid password provided',
    InvalidRefreshToken: 'Invalid Refresh token provided',
    InvalidBearerToken: 'Invalid Bearer token provided',
    PhoneNumberOrEmailRequired: 'Phone number or email is required',
    PasswordRequired: 'Password is required',
    InvalidPasswordLength: 'Password should be at least 6 chars long',
  },
  User: {
    AccessDenied: 'You are not allowed to access this data or perform this action',
    NotFound: 'User not found',
  },
  File: {
    NoFile: 'No file provided',
    FileNotFound: 'File Not Found',
  },
};

export default constants;
