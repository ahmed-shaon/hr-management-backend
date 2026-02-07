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
router.get(
  '/employees/:id',
  authJwt,
  employeeIdValidationRules,
  validateEmployeeId,
  employeeController.getById
);

// attendance routes


//report routes

export default router;
