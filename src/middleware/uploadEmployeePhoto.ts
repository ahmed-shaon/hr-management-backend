// Multer middleware for optional employee photo upload (single file, local disk).

import path from 'path';
import fs from 'fs';
import multer from 'multer';
import type { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/apiError';

const UPLOAD_DIR = path.join(process.cwd(), 'uploads', 'employees');
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname) || '.jpg';
    const name = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}${ext}`;
    cb(null, name);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
}).single('photo');

/** Middleware: parse multipart form-data, optional single file field "photo". */
export const uploadEmployeePhoto = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  upload(req, res, (err: unknown) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        next(new ApiError(400, 'File too large'));
        return;
      }
      next(new ApiError(400, err.message));
      return;
    }
    if (err) {
      next(new ApiError(400, 'File upload failed'));
      return;
    }
    next();
  });
};
