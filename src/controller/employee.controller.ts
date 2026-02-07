import type { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/apiError';
import { ApiResponse } from '../utils/apiResponse';
import { employeeService } from '../services/employee';
import type { EmployeeListQuery } from '../type';

/** GET /employees: list with optional search and pagination. Requires JWT (HR). */
export const list = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const query = req.query as unknown as EmployeeListQuery;
  const data = await employeeService.listEmployees(query);
  const response = new ApiResponse(200, data, 'Success');
  res.status(response.statusCode).json(response);
});

/** GET /employees/:id: get single employee by id. Requires JWT (HR). Returns 404 if not found. */
export const getById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  const employee = await employeeService.getEmployeeById(id);
  if (employee === null) {
    throw new ApiError(404, 'Employee not found');
  }
  const response = new ApiResponse(200, employee, 'Success');
  res.status(response.statusCode).json(response);
});
