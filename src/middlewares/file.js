import createHttpError from 'http-errors';
import { FileModel } from '../models';
import { errorMessagesConstants } from '../constants';

async function checkFileExistence(req, res, next) {
  try {
    const info = await FileModel.info({
      id: req.params.id,
      userId: req.user.id,
    });

    if (!info) {
      throw createHttpError.NotFound(errorMessagesConstants.File.FileNotFound);
    }

    // Forward file info to the next middleware/controller
    req.fileInfo = info;

    return next();
  } catch (error) {
    next(error);
  }
}

function addUploadFlag(req, res, next) {
  try {
    req.isUpload = true;
    next();
  } catch (error) {
    next(error);
  }
}

export { checkFileExistence, addUploadFlag };
