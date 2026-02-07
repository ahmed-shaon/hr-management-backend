// JWT sign/verify for auth tokens. Uses JWT_SECRET env; fallback for dev only.

import jwt from 'jsonwebtoken';
import type { JwtPayload } from '../type';

const SECRET = process.env.JWT_SECRET ?? 'dev-secret-change-in-production';
const EXPIRES_IN = '24h';

export const sign = (payload: JwtPayload): string =>
  jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN });

export const verify = (token: string): JwtPayload =>
  jwt.verify(token, SECRET) as JwtPayload;
