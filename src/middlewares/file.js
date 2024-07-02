import createHttpError from 'http-errors';

import { errorMessagesConstants } from '../constants';
import { FileModel } from '../models';

async function checkFileExistence(req, res, next) {
  try {
    const info = await FileModel.info({
      id: req.params.id,
      userId: req.user.id,
    });

    if (!info) {
      throw createHttpError.NotFound(errorMessagesConstants.File.NotFound);
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

export {
  checkFileExistence,
  addUploadFlag,
};
