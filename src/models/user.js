import bcryptjs from 'bcryptjs';

import db from '../utils/db';
import { errorMessagesConstants } from '../constants';
import { createUser, findById as findByIdQuery } from '../queries/users';

async function findById(id) {
  const [response] = await db().execute(findByIdQuery(id));
  const user = response[0];

  return user;
}

async function create(data) {
  const existingUser = await findById(data.id);

  if (existingUser) {
    throw errorMessagesConstants.Auth.ExistingUser;
  }

  const hashedPassword = await bcryptjs.hash(data.password, 10);
  const userData = {
    ...data,
    password: hashedPassword,
  };

  // Create the user
  await db().execute(createUser(userData));

  // Get the user from DB
  const user = await findById(data.id);

  return user;
}

async function isValidPassword(password, storedPassword) {
  return bcryptjs.compare(password, storedPassword);
}

export {
  findById,
  create,
  isValidPassword,
};
