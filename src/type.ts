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

export interface CreateEmployeeBody {
  name: string;
  age: number;
  designation: string;
  hiring_date: string;
  date_of_birth: string;
  salary: string;
}

export interface UpdateEmployeeBody {
  name: string;
  age: number;
  designation: string;
  hiring_date: string;
  date_of_birth: string;
  salary: string;
}

export interface EmployeeListQuery {
  search?: string;
  page?: number;
  limit?: number;
}

// --- Attendance (attendance table) ---
export interface Attendance {
  id: number;
  employee_id: number;
  date: Date;
  check_in_time: Date;
  created_at: Date;
}

export interface CreateAttendanceBody {
  employee_id: number;
  date: string;
  check_in_time: string;
}

export interface AttendanceListQuery {
  employee_id?: number;
  from?: string;
  to?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

// --- Upload file (set by Multer middleware) ---
export interface MulterUploadFile {
  fieldname: string;
  originalname: string;
  filename: string;
  path: string;
  size: number;
  mimetype: string;
}

// --- Express Request with HR user and optional file ---
declare global {
  namespace Express {
    interface Request {
      hrUser?: { id: number; email: string };
      file?: MulterUploadFile;
    }
  }
}
