// Verifies Bearer token and ensures user exists in hr_users. Sets req.hrUser or 401.

import type { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/apiError';
import { verify } from '../utils/jwt';
import { hrUserModel } from '../models/hrUser';

const BEARER_PREFIX = 'Bearer ';

export const authJwt = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith(BEARER_PREFIX)) {
    next(new ApiError(401, 'Unauthorized'));
    return;
  }

  const token = authHeader.slice(BEARER_PREFIX.length).trim();
  if (!token) {
    next(new ApiError(401, 'Unauthorized'));
    return;
  }

  try {
    const payload = verify(token);
    const id = Number(payload.sub);
    if (!Number.isInteger(id) || id < 1) {
      next(new ApiError(401, 'Unauthorized'));
      return;
    }

    const hrUser = await hrUserModel.findById(id);
    if (!hrUser) {
      next(new ApiError(401, 'Unauthorized'));
      return;
    }

    req.hrUser = { id: hrUser.id, email: hrUser.email };
    next();
  } catch {
    next(new ApiError(401, 'Unauthorized'));
  }
};
