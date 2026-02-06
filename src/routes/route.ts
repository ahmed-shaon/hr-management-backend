import type { Request, Response } from 'express';
import { Router } from 'express';

const router = Router();

router.get('/', (_req: Request, res: Response): void => {
  res.json({ message: 'HR Management API', status: 'ok' });
});

router.get('/health', (_req: Request, res: Response): void => {
  res.json({ status: 'ok' });
});

export default router;
