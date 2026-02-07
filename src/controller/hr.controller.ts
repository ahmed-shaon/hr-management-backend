import type { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/apiError';
import { ApiResponse } from '../utils/apiResponse';
import { authService } from '../services/auth';

/** POST /auth/login: body validated by middleware; returns token + user or 401. */
export const hrLogin = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body as { email: string; password: string };

  const result = await authService.login(email, password);

  if (result === null) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const response = new ApiResponse(200, result, 'Login successful');
  res.status(response.statusCode).json(response);
});
