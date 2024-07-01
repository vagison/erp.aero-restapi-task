import db from '../utils/db';
import {
  countUserFiles, createFile, findFileById, findUserFiles, removeFile,
  updateFile,
} from '../queries/file';

function processFileInfo(info) {
  if (!info) {
    return;
  }

  const processedInfo = { ...info };

  processedInfo.userId = info.user_id;
  processedInfo.mimeType = info.mime_type;
  processedInfo.dateUploaded = info.date_uploaded;

  delete processedInfo.user_id;
  delete processedInfo.mime_type;
  delete processedInfo.date_uploaded;

  return processedInfo;
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

async function info(data) {
  const [response] = await db().execute(findFileById(data));
  const info = response[0];

  return processFileInfo(info);
}

async function userFilesCount(userId) {
  const [response] = await db().execute(countUserFiles(userId));

  return response[0].count;
}

async function remove(data) {
  const [response] = await db().execute(removeFile(data));

  return response;
}

async function update(fileData) {
  await db().execute(updateFile(fileData));

  return fileData;
}

export {
  info, create, list, userFilesCount, remove, update,
};
