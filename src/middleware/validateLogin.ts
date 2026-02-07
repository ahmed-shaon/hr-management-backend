// Login request validation (email, password). On failure passes ApiError(400) to error handler.

import type { Request, Response, NextFunction } from 'express';
import { body, validationResult, type ValidationError } from 'express-validator';
import type { ApiErrorDetail } from '../type';
import { ApiError } from '../utils/apiError';

export const loginValidationRules = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 1 })
    .withMessage('Password is required'),
];

export const validateLogin = (
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
