import Router from 'express';
import { authController } from '../controllers/auth.controller';

const router = Router();

router.post('/v1/auth/register', authController.register);
router.post('/v1/auth/login', authController.login);

export default router;