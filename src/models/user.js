import bcryptjs from 'bcryptjs';

import db from '../utils/db';
import { createUser, findById } from '../queries/users';

async function find(id) {
  const [response] = await db().execute(findById(id));
  const user = response[0];

  return user;
}

async function create(data) {
  const hashedPassword = await bcryptjs.hash(data.password, 10);
  const userData = {
    ...data,
    password: hashedPassword,
  };

  // Create the user
  await db().execute(createUser(userData));

  // Get the user from DB
  const user = await find(data.id);

  return user;
}

async function isValidPassword(password, storedPassword) {
  return bcryptjs.compare(password, storedPassword);
}

export { find, create, isValidPassword };
