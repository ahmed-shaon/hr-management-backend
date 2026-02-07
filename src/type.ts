// Shared type declarations for the API.

// --- API error ---
export type ApiErrorDetail = string | Record<string, unknown>;

// --- HR user (hr_users table) ---
export interface HrUser {
  id: number;
  email: string;
  password_hash: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

// --- Auth / login ---
export interface LoginSuccessResponse {
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
  };
}

export interface JwtPayload {
  sub: string;
  email: string;
}
