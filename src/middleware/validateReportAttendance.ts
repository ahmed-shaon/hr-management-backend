// GET /reports/attendance query validation (month required, employee_id optional). On failure passes ApiError(400).

import type { Request, Response, NextFunction } from 'express';
import { query, validationResult, type ValidationError } from 'express-validator';
import type { ApiErrorDetail } from '../type';
import { ApiError } from '../utils/apiError';

export const reportAttendanceValidationRules = [
  query('month')
    .trim()
    .notEmpty()
    .withMessage('month is required')
    .matches(/^\d{4}-\d{2}$/)
    .withMessage('Invalid month. Valid format: YYYY-MM (e.g. 2025-08)')
    .custom((value) => {
      const [, m] = value.split('-').map(Number);
      if (m < 1 || m > 12) {
        throw new Error('month must be between 01 and 12. Valid format: YYYY-MM (e.g. 2025-08)');
      }
      return true;
    }),
  query('employee_id').optional().isInt({ min: 1 }).toInt().withMessage('Invalid employee_id'),
];

export const validateReportAttendance = (
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
