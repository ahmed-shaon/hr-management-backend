import type { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/apiError';
import { ApiResponse } from '../utils/apiResponse';
import { attendanceService } from '../services/attendance';
import type { AttendanceListQuery, CreateAttendanceBody } from '../type';

/** GET /attendance: list with optional employee_id, from, to and pagination. Requires JWT (HR). */
export const list = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const query = req.query as unknown as AttendanceListQuery;
  const data = await attendanceService.listAttendance(query);
  const response = new ApiResponse(200, data, 'Success');
  res.status(response.statusCode).json(response);
});

/** GET /attendance/:id: get single attendance by id. Requires JWT (HR). Returns 404 if not found. */
export const getById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  const attendance = await attendanceService.getAttendanceById(id);
  if (attendance === null) {
    throw new ApiError(404, 'Attendance not found');
  }
  const response = new ApiResponse(200, attendance, 'Success');
  res.status(response.statusCode).json(response);
});

/** POST /attendance: create or upsert attendance (by employee_id, date). Requires JWT (HR). */
export const create = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const body = req.body as CreateAttendanceBody;
  const attendance = await attendanceService.createOrUpdateAttendance(body);
  const response = new ApiResponse(201, attendance, 'Created');
  res.status(response.statusCode).json(response);
});

/** DELETE /attendance/:id: delete attendance entry. Requires JWT (HR). Returns 404 if not found. */
export const remove = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  const deleted = await attendanceService.deleteAttendance(id);
  if (!deleted) {
    throw new ApiError(404, 'Attendance not found');
  }
  res.status(204).send();
});
