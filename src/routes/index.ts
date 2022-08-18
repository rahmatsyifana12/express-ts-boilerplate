import Router from 'express';
import { authController } from '../controllers/auth.controller';
import { todoController } from '../controllers/todo.controller';
import authenticate from '../middlewares/authenticate.middleware';

const router = Router();

router.post('/v1/auth/register', authController.register);
router.post('/v1/auth/login', authController.login);
router.post('v1/auth/refresh', authenticate('REFRESH'), authController.refresh);

router.post('/v1/todos', authenticate('ACCESS'), todoController.add);
router.get('/v1/todos/:todoId', todoController.getTodosAndComments);

export default router;