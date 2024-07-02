import fs from 'fs/promises';
import path from 'path';
import createHttpError from 'http-errors';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import { fromBuffer } from 'file-type';
import consola from 'consola';

import { errorMessagesConstants, responseMessagesConstants } from '../constants';
import { FileModel } from '../models';
import { paginate, generatePaginatedRes } from '../utils/pagination';

// Helpers
const createUserFolder = async (folderName) => {
  const uploadsPath = path.join(__dirname, '../../../', 'uploads');
  const newFolderPath = path.join(uploadsPath, folderName);

  // Check if the uploads directory exists, if not create it
  try {
    await fs.access(uploadsPath);
  } catch {
    await fs.mkdir(uploadsPath);
  }

  // Check if the user folder already exists
  try {
    await fs.access(newFolderPath);
    consola.info({ message: `User folder "${folderName}" already exists.`, badge: true });
  } catch {
    await fs.mkdir(newFolderPath);
    consola.info({ message: `User folder "${folderName}" created successfully.`, badge: true });
  }

  return newFolderPath;
};

const getFilePath = async (info) => {
  const filePath = path.join(__dirname, '../../../', `uploads/${info.userId}/${info.id}`);

  if (fs.access(filePath)) {
    return filePath;
  }

  // If no file exists in the storage - throw an error
  throw createHttpError.NotFound(errorMessagesConstants.File.NotFound);
};

const placeFile = async (req, replacement = false) => {
  const { user, file } = req;

  if (!file) {
    throw createHttpError.BadRequest(errorMessagesConstants.File.NoFile);
  }

  // Actual file metadata
  const fileMetadata = await fromBuffer(file.buffer);

  // Get the path for the user's folder
  const userFolderPath = await createUserFolder(req.user.id);

  // Create data for db record
  const fileData = {
    userId: user.id,
    name: file.originalname,
    extension: fileMetadata.ext,
    mimeType: fileMetadata.mime,
    size: file.size,
    dateUploaded: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
  };

  // Update existing file
  if (replacement) {
    // Extract existing file info from req
    const { fileInfo } = req;

    // Construct temp destination path for the file and place it there
    const tmpPath = `temp_${Date.now()}_${fileInfo.id}`;
    const tmpDestinationPath = path.join(userFolderPath, tmpPath);
    await fs.writeFile(tmpDestinationPath, file.buffer);

    // Update db record for the file
    fileData.id = fileInfo.id;
    await FileModel.update(fileData);

    // Remove old file and rename new one
    const destinationPath = path.join(userFolderPath, fileData.id);
    await fs.unlink(destinationPath);
    await fs.rename(tmpDestinationPath, destinationPath);
  }

  // Place new file
  if (!replacement) {
    // Create a new id for the file
    fileData.id = uuid();

    // Construct the destination path for the file and place it there
    const destinationPath = path.join(userFolderPath, fileData.id);

    // Write the file in the storage
    await fs.writeFile(destinationPath, file.buffer);

    // Create a record for the file in DB
    await FileModel.create(fileData);
  }

  // Return newely uploaded file data
  return fileData;
};

// Controllers
const upload = async (req, res, next) => {
  try {
    // Check whether the operation is upload or update
    const replacement = !req.isUpload;

    // Place the file and construct the response status and body
    const fileInfo = await placeFile(req, replacement);
    const status = replacement ? 200 : 201;
    const response = {
      info: fileInfo,
      message: replacement ? responseMessagesConstants.File.UpdatedSuccessfully : responseMessagesConstants.File.UploadedSuccessfully,
    };

    return res.status(status).json(response);
  } catch (error) {
    next(error);
  }
};

const list = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

const fileInfo = async (req, res, next) => {
  try {
    // Extract file info from req
    const { fileInfo } = req;

    return res.status(200).json({ info: fileInfo });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  // Extract file info from req
  const { fileInfo } = req;

  try {
    // Remove file record from DB
    await FileModel.remove({
      id: fileInfo.id,
      userId: fileInfo.userId,
    });

    // Remove file from the storage
    const filePath = await getFilePath(fileInfo);
    await fs.unlink(filePath);

    return res.status(200).json({ message: responseMessagesConstants.File.DeletedSuccessfully });
  } catch (error) {
    next(error);
  }
};

const download = async (req, res, next) => {
  try {
    // Extract file info from req
    const { fileInfo } = req;

    // Get file path and send the file
    const filePath = await getFilePath(fileInfo);

    if (filePath) {
      res.setHeader('Content-Disposition', `attachment; filename="${fileInfo.name}"`);
      return res.sendFile(filePath);
    }

    // If file doesn't exist in the storage - throw an error
    throw createHttpError.NotFound(errorMessagesConstants.File.NotFound);
  } catch (error) {
    next(error);
  }
};

export {
  upload,
  list,
  fileInfo,
  remove,
  download,
};
