// Report business logic. Monthly attendance summary.

import type { AttendanceReportQuery, AttendanceReportRow } from '../type';
import { reportModel } from '../models/report';
import { employeeModel } from '../models/employee';
import { ApiError } from '../utils/apiError';

export const reportService = {
  /**
   * Get monthly attendance report. If employee_id is provided and that employee
   * has no attendance in the month, returns one row with days_present: 0, times_late: 0.
   * Throws 404 if employee_id is provided and employee not found.
   */
  async getAttendanceReport(query: AttendanceReportQuery): Promise<AttendanceReportRow[]> {
    const rows = await reportModel.getMonthlyAttendanceSummary(query.month, query.employee_id);

    if (query.employee_id != null && rows.length === 0) {
      const employee = await employeeModel.findById(query.employee_id);
      if (employee == null) {
        throw new ApiError(404, 'Employee not found');
      }
      return [
        {
          employee_id: query.employee_id,
          name: employee.name,
          days_present: 0,
          times_late: 0,
        },
      ];
    }

    return rows;
  },
};
