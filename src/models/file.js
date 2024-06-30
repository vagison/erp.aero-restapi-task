import db from '../utils/db';
import {
  countUserFiles, createFile, findFileById, findUserFiles,
} from '../queries/file';

async function get(id) {
  const [response] = await db().execute(findFileById(id));
  const user = response[0];

  return user;
}

async function create(fileData) {
  await db().execute(createFile(fileData));

  return fileData;
}

async function list(data) {
  const response = await db().execute(findUserFiles(data));
  const list = response[0];

  return list;
}

async function userFilesCount(userId) {
  const [response] = await db().execute(countUserFiles(userId));

  return response[0].count;
}

export {
  get, create, list, userFilesCount,
};
