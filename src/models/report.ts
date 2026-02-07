// Report data access. Monthly attendance summary.

import db from '../config/database';
import type { AttendanceReportRow } from '../type';

/**
 * Get first and last day of month for YYYY-MM.
 */
function monthBounds(month: string): { monthStart: string; monthEnd: string } {
  const [y, m] = month.split('-').map(Number);
  const monthStart = `${y}-${String(m).padStart(2, '0')}-01`;
  const lastDay = new Date(y, m, 0).getDate();
  const monthEnd = `${y}-${String(m).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;
  return { monthStart, monthEnd };
}

export const reportModel = {
  /**
   * Monthly attendance summary per employee: days_present, times_late.
   * Late = check_in_time (time-of-day) > 09:45:00.
   * Only includes non–soft-deleted employees who have attendance in the month.
   */
  async getMonthlyAttendanceSummary(
    month: string,
    employee_id?: number
  ): Promise<AttendanceReportRow[]> {
    const { monthStart, monthEnd } = monthBounds(month);

    const query = db('attendance')
      .select(
        'attendance.employee_id',
        'employees.name as name',
        db.raw('COUNT(DISTINCT attendance.date)::int as days_present'),
        db.raw(
          "COUNT(*) FILTER (WHERE (attendance.check_in_time::time > '09:45:00'))::int as times_late"
        )
      )
      .join('employees', function () {
        this.on('attendance.employee_id', '=', 'employees.id').andOnNull('employees.deleted_at');
      })
      .whereBetween('attendance.date', [monthStart, monthEnd]);

    if (employee_id != null) {
      query.andWhere('attendance.employee_id', employee_id);
    }

    const rows = await query.groupBy('attendance.employee_id', 'employees.name');
    return rows as AttendanceReportRow[];
  },
};
