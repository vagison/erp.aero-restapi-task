import express from 'express';
import multer from 'multer';

import { jwtMiddleware } from '../middlewares';
import { isBearerValid } from '../middlewares/auth/bearer';
import { addUploadFlag, checkFileExistence } from '../middlewares/file';
import { fileController } from '../controllers';

const fileRouter = express.Router();

const storage = multer({
  limits: {
    fileSize: 10 * 1024 * 1024, // Limit file size to 10MB
  },
});

fileRouter.post('/upload', jwtMiddleware, isBearerValid, addUploadFlag, storage.single('file'), fileController.upload);
fileRouter.get('/list', jwtMiddleware, isBearerValid, fileController.list);
fileRouter.get('/:id', jwtMiddleware, isBearerValid, checkFileExistence, fileController.fileInfo);
fileRouter.delete('/:id', jwtMiddleware, isBearerValid, checkFileExistence, fileController.remove);
fileRouter.get('/download/:id', jwtMiddleware, isBearerValid, checkFileExistence, fileController.download);
fileRouter.put('/update/:id', jwtMiddleware, isBearerValid, checkFileExistence, storage.single('file'), fileController.upload);

export default fileRouter;
