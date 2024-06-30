import db from '../utils/db';
import {
  countUserFiles, createFile, findFileById, findUserFiles,
} from '../queries/file';

async function create(fileData) {
  await db().execute(createFile(fileData));

  return fileData;
}

async function list(data) {
  const response = await db().execute(findUserFiles(data));
  const list = response[0];

  return list;
}

async function info(data) {
  const [response] = await db().execute(findFileById(data));
  const file = response[0];

  return file;
}

async function userFilesCount(userId) {
  const [response] = await db().execute(countUserFiles(userId));

  return response[0].count;
}

export {
  info, create, list, userFilesCount,
};
