// Shared employee body validation (create & update). Run after Multer. On failure passes ApiError(400).

import type { Request, Response, NextFunction } from 'express';
import { body, validationResult, type ValidationError } from 'express-validator';
import type { ApiErrorDetail } from '../type';
import { ApiError } from '../utils/apiError';

export const employeeBodyValidationRules = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('age')
    .isInt({ min: 18, max: 120 })
    .toInt()
    .withMessage('Age must be between 18 and 120'),
  body('designation').trim().notEmpty().withMessage('Designation is required'),
  body('hiring_date')
    .trim()
    .notEmpty()
    .withMessage('Hiring date is required')
    .isISO8601()
    .withMessage('Invalid hiring date'),
  body('date_of_birth')
    .trim()
    .notEmpty()
    .withMessage('Date of birth is required')
    .isISO8601()
    .withMessage('Invalid date of birth'),
  body('salary')
    .trim()
    .notEmpty()
    .withMessage('Salary is required')
    .isFloat({ min: 0 })
    .withMessage('Salary must be a positive number')
    .toFloat(),
];

export const validateEmployeeBody = (
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
