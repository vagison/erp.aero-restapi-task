import express from 'express';
import multer from 'multer';

import { fileController } from '../controllers';
import { jwtMiddleware } from '../middlewares';

const fileRouter = express.Router();

const storage = multer({
  limits: {
    fileSize: 10 * 1024 * 1024, // Limit file size to 10MB
  },
});

fileRouter.post('/upload', jwtMiddleware, storage.single('file'), fileController.upload);
fileRouter.get('/list', jwtMiddleware, fileController.list);

export default fileRouter;
