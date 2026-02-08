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
      baseQuery
        .clone()
        .count('* as total')
        .first()
        .then((r) => Number((r as { total: string }).total)),
    ]);

    return { rows, total: countResult };
  },
  /** Get one employee by id. Excludes soft-deleted. */
  async findById(id: number): Promise<Employee | undefined> {
    const row = await db('employees').where({ id }).whereNull('deleted_at').first();
    return row as Employee | undefined;
  },
  /** Create employee. Returns created row. */
  async create(data: {
    name: string;
    age: number;
    designation: string;
    hiring_date: string;
    date_of_birth: string;
    salary: number | string;
    photo_path: string | null;
  }): Promise<Employee> {
    const [row] = await db('employees').insert(data).returning('*');
    return row as Employee;
  },
  /** Update employee by id. Returns updated row or undefined if not found. */
  async update(
    id: number,
    data: {
      name: string;
      age: number;
      designation: string;
      hiring_date: string;
      date_of_birth: string;
      salary: number | string;
      photo_path?: string | null;
    }
  ): Promise<Employee | undefined> {
    const [row] = await db('employees')
      .where({ id })
      .whereNull('deleted_at')
      .update(data)
      .returning('*');
    return row as Employee | undefined;
  },
  /** Soft-delete employee by id. Returns true if a row was updated. */
  async softDelete(id: number): Promise<boolean> {
    const updated = await db('employees')
      .where({ id })
      .whereNull('deleted_at')
      .update({ deleted_at: db.fn.now() });
    return Number(updated) > 0;
  },
};
