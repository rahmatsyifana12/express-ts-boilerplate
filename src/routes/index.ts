import Router from 'express';
import { authController } from '../controllers/auth.controller';
import authenticate from '../middlewares/authenticate.middleware';

const router = Router();

router.post('/v1/auth/register', authController.register);
router.post('/v1/auth/login', authController.login);
router.post('/auth/refresh', authenticate('ACCESS'), authController.refresh);

export default router;