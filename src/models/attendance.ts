// Attendance table access. List with filters and pagination.

import db from '../config/database';
import type { Attendance } from '../type';

export interface AttendanceListFilters {
  employee_id?: number;
  from?: string;
  to?: string;
  page: number;
  limit: number;
}

export const attendanceModel = {
  /** List attendance with optional employee_id, date range (from, to) and pagination. */
  async list(filters: AttendanceListFilters): Promise<{ rows: Attendance[]; total: number }> {
    const { employee_id, from, to, page, limit } = filters;
    const baseQuery = db('attendance');

    if (employee_id != null) {
      baseQuery.andWhere('employee_id', employee_id);
    }
    if (from) {
      baseQuery.andWhere('date', '>=', from);
    }
    if (to) {
      baseQuery.andWhere('date', '<=', to);
    }

    const [rows, countResult] = await Promise.all([
      baseQuery
        .clone()
        .orderBy('date', 'desc')
        .orderBy('id', 'desc')
        .limit(limit)
        .offset((page - 1) * limit)
        .select('*')
        .then((r) => r as Attendance[]),
      baseQuery.clone().count('* as total').first().then((r) => Number((r as { total: string }).total)),
    ]);

    return { rows, total: countResult };
  },
  /** Get one attendance by id. */
  async findById(id: number): Promise<Attendance | undefined> {
    const row = await db('attendance').where({ id }).first();
    return row as Attendance | undefined;
  },
};
