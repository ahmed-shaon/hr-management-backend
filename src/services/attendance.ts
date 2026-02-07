// Attendance business logic. List with filters and pagination.

import type {
  Attendance,
  AttendanceListQuery,
  CreateAttendanceBody,
  PaginatedResponse,
} from '../type';
import { attendanceModel } from '../models/attendance';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 100;

export const attendanceService = {
  /** List attendance with optional employee_id, from, to and pagination. */
  async listAttendance(query: AttendanceListQuery): Promise<PaginatedResponse<Attendance>> {
    const page = Math.max(1, query.page ?? DEFAULT_PAGE);
    const limit = Math.min(MAX_LIMIT, Math.max(1, query.limit ?? DEFAULT_LIMIT));
    const employee_id = query.employee_id;
    const from = query.from?.trim() || undefined;
    const to = query.to?.trim() || undefined;

    const { rows, total } = await attendanceModel.list({
      employee_id,
      from,
      to,
      page,
      limit,
    });

    return {
      items: rows,
      total,
      page,
      limit,
    };
  },
  /** Get one attendance by id. Returns null if not found. */
  async getAttendanceById(id: number): Promise<Attendance | null> {
    const row = await attendanceModel.findById(id);
    return row ?? null;
  },
  /** Create or upsert attendance. If (employee_id, date) exists, updates check_in_time. */
  async createOrUpdateAttendance(body: CreateAttendanceBody): Promise<Attendance> {
    return attendanceModel.upsert(body);
  },
  /** Delete attendance by id. Returns true if deleted, false if not found. */
  async deleteAttendance(id: number): Promise<boolean> {
    return attendanceModel.deleteById(id);
  },
};
