// GET /attendance query validation (employee_id, from, to, page, limit). On failure passes ApiError(400).

import type { Request, Response, NextFunction } from 'express';
import { query, validationResult, type ValidationError } from 'express-validator';
import type { ApiErrorDetail } from '../type';
import { ApiError } from '../utils/apiError';

export const listAttendanceValidationRules = [
  query('employee_id').optional().isInt({ min: 1 }).toInt().withMessage('Invalid employee_id'),
  query('from').optional().isISO8601().withMessage('Invalid from date'),
  query('to').optional().isISO8601().withMessage('Invalid to date'),
  query('page').optional().isInt({ min: 1 }).toInt(),
  query('limit').optional().isInt({ min: 1, max: 100 }).toInt(),
  query('to').optional().custom((value, { req }) => {
    const from = req.query?.from as string | undefined;
    if (from && value && value < from) {
      throw new Error('to must be on or after from');
    }
    return true;
  }),
];

export const validateListAttendance = (
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
