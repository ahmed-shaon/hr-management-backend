import { Router } from 'express';
import * as hrController from '../controller/hr.controller';

const router = Router();

//hr routes
router.post('/auth/login', hrController.hrLogin);

//employee routes

//attendance routes


//report routes

export default router;
