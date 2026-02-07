// Employee table access (employees). List with search and pagination.

import db from '../config/database';
import type { Employee } from '../type';

export interface EmployeeListFilters {
  search?: string;
  page: number;
  limit: number;
}

export const employeeModel = {
  /** List employees with optional name search (ILIKE) and pagination. Excludes soft-deleted. */
  async list(filters: EmployeeListFilters): Promise<{ rows: Employee[]; total: number }> {
    const { search, page, limit } = filters;
    const baseQuery = db('employees').whereNull('deleted_at');

    if (search && search.trim()) {
      const term = `%${search.trim()}%`;
      baseQuery.andWhere('name', 'ilike', term);
    }

    const [rows, countResult] = await Promise.all([
      baseQuery
        .clone()
        .orderBy('id', 'asc')
        .limit(limit)
        .offset((page - 1) * limit)
        .select('*')
        .then((r) => r as Employee[]),
      baseQuery.clone().count('* as total').first().then((r) => Number((r as { total: string }).total)),
    ]);

    return { rows, total: countResult };
  },
  /** Get one employee by id. Excludes soft-deleted. */
  async findById(id: number): Promise<Employee | undefined> {
    const row = await db('employees')
      .where({ id })
      .whereNull('deleted_at')
      .first();
    return row as Employee | undefined;
  },
};
