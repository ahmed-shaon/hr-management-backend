// Auth business logic (e.g. login). Uses model + password + JWT utils.

import type { LoginSuccessResponse } from '../type';
import { hrUserModel } from '../models/hrUser';
import { verify as verifyPassword } from '../utils/password';
import { sign as signJwt } from '../utils/jwt';

export const authService = {
  /** Validates credentials; returns { token, user } or null (same for invalid email or password). */
  async login(email: string, password: string): Promise<LoginSuccessResponse | null> {
    const row = await hrUserModel.findByEmail(email);

    if (!row) {
      return null;
    }

    const valid = await verifyPassword(password, row.password_hash);
    if (!valid) {
      return null;
    }

    const token = signJwt({ sub: String(row.id), email: row.email });

    return {
      token,
      user: {
        id: row.id,
        email: row.email,
        name: row.name,
      },
    };
  },
};
