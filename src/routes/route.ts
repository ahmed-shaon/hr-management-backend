import { Router } from 'express';
import * as hrController from '../controller/hr.controller';
import { validateLogin, loginValidationRules } from '../middleware/validateLogin';

const router = Router();

// hr routes
router.post(
  '/auth/login',
  loginValidationRules,
  validateLogin,
  hrController.hrLogin
);

//employee routes

//attendance routes


//report routes

export default router;
