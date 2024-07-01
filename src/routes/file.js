import express from 'express';
import multer from 'multer';

import { fileController } from '../controllers';
import { jwtMiddleware } from '../middlewares';
import { fileExistance } from '../middlewares/file';

const fileRouter = express.Router();

const storage = multer({
  limits: {
    fileSize: 10 * 1024 * 1024, // Limit file size to 10MB
  },
});

fileRouter.post('/upload', jwtMiddleware, fileExistance, storage.single('file'), fileController.upload);
fileRouter.get('/list', jwtMiddleware, fileController.list);
fileRouter.get('/:id', jwtMiddleware, fileExistance, fileController.fileInfo);
fileRouter.delete('/:id', jwtMiddleware, fileExistance, fileController.remove);
fileRouter.get('/download/:id', jwtMiddleware, fileExistance, fileController.download);
fileRouter.put('/update/:id', jwtMiddleware, fileExistance, storage.single('file'), fileController.upload);

export default fileRouter;
