// POST /attendance body validation. On failure passes ApiError(400).

import type { Request, Response, NextFunction } from 'express';
import { body, validationResult, type ValidationError } from 'express-validator';
import type { ApiErrorDetail } from '../type';
import { ApiError } from '../utils/apiError';

export const createAttendanceValidationRules = [
  body('employee_id')
    .isInt({ min: 1 })
    .toInt()
    .withMessage('employee_id must be a positive integer'),
  body('date')
    .trim()
    .notEmpty()
    .withMessage('date is required')
    .isISO8601()
    .withMessage('Invalid date'),
  body('check_in_time')
    .trim()
    .notEmpty()
    .withMessage('check_in_time is required')
    .isISO8601()
    .withMessage('Invalid check_in_time'),
];

export const validateCreateAttendance = (
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
