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

// --- Employee (employees table) ---
export interface Employee {
  id: number;
  name: string;
  age: number;
  designation: string;
  hiring_date: Date;
  date_of_birth: Date;
  salary: string;
  photo_path: string | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export interface EmployeeListQuery {
  search?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

// --- Express Request with HR user (set by authJwt middleware) ---
declare global {
  namespace Express {
    interface Request {
      hrUser?: { id: number; email: string };
    }
  }
}
