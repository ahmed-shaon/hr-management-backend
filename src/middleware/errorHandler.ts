// Global error handler. ApiError -> statusCode + JSON; other errors -> 500.

import type { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/apiError';
import { ApiResponse } from '../utils/apiResponse';

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err instanceof ApiError) {
    const response = new ApiResponse(
      err.statusCode,
      { errors: err.errors },
      err.message
    );
    res.status(response.statusCode).json(response);
    return;
  }

  // Unknown error: treat as 500
  const message =
    err instanceof Error ? err.message : 'Something went wrong';
  // eslint-disable-next-line no-console -- log unexpected errors
  console.error('Unhandled error:', err);

  const response = new ApiResponse(500, null, message);
  res.status(response.statusCode).json(response);
};
