// Employee business logic. List with search and pagination.

import type {
  Employee,
  EmployeeListQuery,
  MulterUploadFile,
  PaginatedResponse,
  UpdateEmployeeBody,
} from '../type';
import { employeeModel } from '../models/employee';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 100;

export const employeeService = {
  /** List employees with optional search (name ILIKE) and pagination. */
  async listEmployees(query: EmployeeListQuery): Promise<PaginatedResponse<Employee>> {
    const page = Math.max(1, query.page ?? DEFAULT_PAGE);
    const limit = Math.min(MAX_LIMIT, Math.max(1, query.limit ?? DEFAULT_LIMIT));
    const search = query.search?.trim() || undefined;

    const { rows, total } = await employeeModel.list({ search, page, limit });

    return {
      items: rows,
      total,
      page,
      limit,
    };
  },
  /** Get one employee by id. Returns null if not found or soft-deleted. */
  async getEmployeeById(id: number): Promise<Employee | null> {
    const row = await employeeModel.findById(id);
    return row ?? null;
  },
  /** Create employee. Photo from multipart file only; no URL. */
  async createEmployee(
    body: { name: string; age: number; designation: string; hiring_date: string; date_of_birth: string; salary: number },
    file?: MulterUploadFile
  ): Promise<Employee> {
    const photo_path = file ? `uploads/employees/${file.filename}` : null;
    return employeeModel.create({
      name: body.name,
      age: body.age,
      designation: body.designation,
      hiring_date: body.hiring_date,
      date_of_birth: body.date_of_birth,
      salary: body.salary,
      photo_path,
    });
  },
  /** Update employee by id. Optional photo replaces existing. Returns null if not found. */
  async updateEmployee(
    id: number,
    body: UpdateEmployeeBody & { age?: number; salary?: number },
    file?: MulterUploadFile
  ): Promise<Employee | null> {
    const data: Parameters<typeof employeeModel.update>[1] = {
      name: body.name,
      age: Number(body.age),
      designation: body.designation,
      hiring_date: body.hiring_date,
      date_of_birth: body.date_of_birth,
      salary: Number(body.salary),
    };
    if (file) {
      data.photo_path = `uploads/employees/${file.filename}`;
    }
    const row = await employeeModel.update(id, data);
    return row ?? null;
  },
  /** Soft-delete employee by id. Returns true if deleted, false if not found. */
  async deleteEmployee(id: number): Promise<boolean> {
    return employeeModel.softDelete(id);
  },
};
