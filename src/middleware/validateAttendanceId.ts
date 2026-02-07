// Validates :id param for GET/PUT/DELETE /attendance/:id. On failure passes ApiError(400).

import type { Request, Response, NextFunction } from 'express';
import { param, validationResult, type ValidationError } from 'express-validator';
import type { ApiErrorDetail } from '../type';
import { ApiError } from '../utils/apiError';

export const attendanceIdValidationRules = [
  param('id').isInt({ min: 1 }).toInt().withMessage('Invalid attendance id'),
];

export const validateAttendanceId = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    next();
    return;
  }

  const errors: ApiErrorDetail[] = result.array().map((err: ValidationError) => ({
    ...('path' in err && { field: err.path }),
    message: err.msg,
  }));

  next(new ApiError(400, 'Validation failed', errors));
};
