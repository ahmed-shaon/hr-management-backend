import { Router } from 'express';
import * as hrController from '../controller/hr.controller';
import * as employeeController from '../controller/employee.controller';
import { validateLogin, loginValidationRules } from '../middleware/validateLogin';
import { authJwt } from '../middleware/authJwt';
import {
  validateListEmployees,
  listEmployeesValidationRules,
} from '../middleware/validateListEmployees';
import {
  validateEmployeeId,
  employeeIdValidationRules,
} from '../middleware/validateEmployeeId';
import { uploadEmployeePhoto } from '../middleware/uploadEmployeePhoto';
import {
  validateCreateEmployee,
  createEmployeeValidationRules,
} from '../middleware/validateCreateEmployee';
import {
  validateUpdateEmployee,
  updateEmployeeValidationRules,
} from '../middleware/validateUpdateEmployee';
import * as attendanceController from '../controller/attendence.controller';
import {
  validateListAttendance,
  listAttendanceValidationRules,
} from '../middleware/validateListAttendance';
import {
  validateAttendanceId,
  attendanceIdValidationRules,
} from '../middleware/validateAttendanceId';
import {
  validateCreateAttendance,
  createAttendanceValidationRules,
} from '../middleware/validateCreateAttendance';

const router = Router();

// hr routes
router.post(
  '/auth/login',
  loginValidationRules,
  validateLogin,
  hrController.hrLogin
);

// employee routes (JWT required, HR must exist in DB)
router.get(
  '/employees',
  authJwt,
  listEmployeesValidationRules,
  validateListEmployees,
  employeeController.list
);
router.post(
  '/employees',
  authJwt,
  uploadEmployeePhoto,
  createEmployeeValidationRules,
  validateCreateEmployee,
  employeeController.create
);
router.get(
  '/employees/:id',
  authJwt,
  employeeIdValidationRules,
  validateEmployeeId,
  employeeController.getById
);
router.put(
  '/employees/:id',
  authJwt,
  employeeIdValidationRules,
  validateEmployeeId,
  uploadEmployeePhoto,
  updateEmployeeValidationRules,
  validateUpdateEmployee,
  employeeController.update
);
router.delete(
  '/employees/:id',
  authJwt,
  employeeIdValidationRules,
  validateEmployeeId,
  employeeController.remove
);

// attendance routes
router.get(
  '/attendance',
  authJwt,
  listAttendanceValidationRules,
  validateListAttendance,
  attendanceController.list
);
router.post(
  '/attendance',
  authJwt,
  createAttendanceValidationRules,
  validateCreateAttendance,
  attendanceController.create
);
router.get(
  '/attendance/:id',
  authJwt,
  attendanceIdValidationRules,
  validateAttendanceId,
  attendanceController.getById
);
router.delete(
  '/attendance/:id',
  authJwt,
  attendanceIdValidationRules,
  validateAttendanceId,
  attendanceController.remove
);

//report routes

export default router;
