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


//report routes

export default router;
