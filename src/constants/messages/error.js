const constants = {
  Auth: {
    NoPhoneNumberOrEmail: 'Please enter a correct phone number (in international format) or an email',
    PhoneNumberOrEmailRequired: 'Phone number or email is required',
    PasswordRequired: 'Password is required',
    InvalidPasswordLength: 'Password should be at least 6 chars long',
    ExistingUser: 'User with this phone number or email already exists',
    InvalidPassword: 'Invalid password provided',
    InvalidRefreshToken: 'Invalid Refresh token provided',
    InvalidBearerToken: 'Invalid Bearer token provided',
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
