// HR user table access (hr_users).

import db from '../config/database';
import type { HrUser } from '../type';

export const hrUserModel = {
  /** Finds HR user by email. */
  async findByEmail(email: string): Promise<HrUser | undefined> {
    const row = await db('hr_users').where({ email }).first();
    return row as HrUser | undefined;
  },
  /** Finds HR user by id. */
  async findById(id: number): Promise<HrUser | undefined> {
    const row = await db('hr_users').where({ id }).first();
    return row as HrUser | undefined;
  },
};
