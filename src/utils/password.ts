// Password hashing and verification (bcrypt).

import bcrypt from 'bcryptjs';

// Must match seed/migration usage (e.g. 10).
const SALT_ROUNDS = 10;

export const hash = (plainPassword: string): Promise<string> =>
  bcrypt.hash(plainPassword, SALT_ROUNDS);

export const verify = (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => bcrypt.compare(plainPassword, hashedPassword);
