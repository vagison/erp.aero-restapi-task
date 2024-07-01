import createHttpError from 'http-errors';
import { FileModel } from '../models';
import { errorMessagesConstants } from '../constants';

async function fileExistence(req, res, next) {
  try {
    if (req.url !== '/upload') {
      const info = await FileModel.info({
        id: req.params.id,
        userId: req.user.id,
      });

      if (!info) {
        throw createHttpError.NotFound(errorMessagesConstants.File.FileNotFound);
      }

      // Forward file info to the next middleware/controller
      req.fileInfo = info;
    } else {
      req.isUpload = true;
    }

    return next();
  } catch (error) {
    next(error);
  }
}

export { fileExistence };
