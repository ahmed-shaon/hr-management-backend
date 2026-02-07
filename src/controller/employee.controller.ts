import type { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/apiError';
import { ApiResponse } from '../utils/apiResponse';
import { employeeService } from '../services/employee';
import type { CreateEmployeeBody, EmployeeListQuery, UpdateEmployeeBody } from '../type';

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

/** POST /employees: create employee (optional photo). Requires JWT (HR). */
export const create = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const body = req.body as CreateEmployeeBody & { age?: number; salary?: number };
  const employee = await employeeService.createEmployee(
    {
      name: body.name,
      age: Number(body.age),
      designation: body.designation,
      hiring_date: body.hiring_date,
      date_of_birth: body.date_of_birth,
      salary: Number(body.salary),
    },
    req.file
  );
  const response = new ApiResponse(201, employee, 'Created');
  res.status(response.statusCode).json(response);
});

/** PUT /employees/:id: update employee (optional photo replace). Requires JWT (HR). Returns 404 if not found. */
export const update = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  const body = req.body as UpdateEmployeeBody & { age?: number; salary?: number };
  const employee = await employeeService.updateEmployee(id, body, req.file);
  if (employee === null) {
    throw new ApiError(404, 'Employee not found');
  }
  const response = new ApiResponse(200, employee, 'Success');
  res.status(response.statusCode).json(response);
});

/** DELETE /employees/:id: soft-delete employee. Requires JWT (HR). Returns 404 if not found. */
export const remove = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  const deleted = await employeeService.deleteEmployee(id);
  if (!deleted) {
    throw new ApiError(404, 'Employee not found');
  }
  res.status(204).send();
});
