import type { Request, Response, NextFunction } from 'express';

export type RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => void | Promise<void>;

// Wraps async route handlers so promise rejections are passed to next(err).
const asyncHandler = (requestHandler: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler };