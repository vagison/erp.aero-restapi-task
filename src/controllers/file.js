import fs from 'fs/promises';
import path from 'path';
import createHttpError from 'http-errors';
import { v4 as uuid } from 'uuid';
import { fromBuffer } from 'file-type';
import moment from 'moment';

import { errorMessagesConstants } from '../constants';
import { FileModel } from '../models';
import { paginate, generatePaginatedRes } from '../utils/pagination';

async function createFolderForUser(folderName) {
  const uploadsPath = path.join(__dirname, '../../', 'uploads');
  const newFolderPath = path.join(uploadsPath, folderName);

  try {
    // Check if the uploads directory exists, if not create it
    try {
      await fs.access(uploadsPath);
    } catch {
      await fs.mkdir(uploadsPath);
    }

    // Check if the user folder already exists
    try {
      await fs.access(newFolderPath);
      console.log(`User folder "${folderName}" already exists.`);
    } catch {
      await fs.mkdir(newFolderPath);
      console.log(`User folder "${folderName}" created successfully.`);
    }

    // Return the path of the user folder
    return newFolderPath;
  } catch (error) {
    console.error(`Error creating folder: ${error.message}`);
    throw error;
  }
}

const upload = async (req, res, next) => {
  try {
    const { file, user } = req;

    if (!file) {
      throw createHttpError.BadRequest(errorMessagesConstants.File.NoFile);
    }

    // Actual file info
    const fileInfo = await fromBuffer(file.buffer);

    // Create info object for the file
    const fileData = {
      id: uuid(),
      userId: user.id,
      name: file.originalname,
      extension: fileInfo.ext,
      mimeType: fileInfo.mime,
      size: file.size,
      dateUploaded: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
    };

    // Get the path for the user's folder
    const userFolderPath = await createFolderForUser(fileData.userId);

    // Construct the destination path for the file
    const destinationPath = path.join(userFolderPath, fileData.id);

    // Place the file in storage
    await fs.writeFile(destinationPath, file.buffer);

    // Create a record for the file in DB
    const dbRecord = await FileModel.create(fileData);

    return res.json({ message: 'File uploaded successfully', file: dbRecord });
  } catch (error) {
    next(error);
  }
};

const list = async (req, res, next) => {
  const pagination = paginate({
    query: {
      page: +req.query.page,
      limit: +req.query.list_size,
    },
  });

  const fileList = await FileModel.list({
    userId: req.user.id,
    pagination,
  });

  const total = await FileModel.userFilesCount(req.user.id);

  const result = generatePaginatedRes(fileList, {
    total,
    page: pagination.page,
    limit: pagination.limit,
  });

  return res.status(200).json(result);
};

export {
  upload,
  list,
};
