import Router from 'express';
import { authController } from '../controllers/auth.controller';
import { todoController } from '../controllers/todo.controller';
import authenticate from '../middlewares/authenticate.middleware';

const router = Router();

router.post('/v1/auth/register', authController.register);
router.post('/v1/auth/login', authController.login);
router.post('/v1/auth/refresh', authenticate('REFRESH'),
    authController.refresh);
router.put('/v1/auth/logout', authenticate('REFRESH'), authController.logout);

router.post('/v1/todos', authenticate('ACCESS'), todoController.add);

export default router;