import type { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/apiResponse';
import { reportService } from '../services/report';
import type { AttendanceReportQuery } from '../type';

/** GET /reports/attendance: monthly attendance summary. Requires JWT (HR). */
export const getAttendanceReport = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const query = req.query as unknown as AttendanceReportQuery;
  const data = await reportService.getAttendanceReport(query);
  const response = new ApiResponse(200, data, 'Success');
  res.status(response.statusCode).json(response);
});
