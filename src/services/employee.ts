// Employee business logic. List with search and pagination.

import type { Employee, EmployeeListQuery, PaginatedResponse } from '../type';
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
};
