import db from '../utils/db';
import { createFile, findFileById } from '../queries/file';

async function get(id) {
  const [response] = await db().execute(findFileById(id));
  const user = response[0];

  return user;
}

async function create(fileData) {
  await db().execute(createFile(fileData));
  return fileData;
}

export { get, create };
