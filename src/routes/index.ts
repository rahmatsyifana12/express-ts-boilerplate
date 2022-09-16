import Router from 'express';
import { authController } from '../controllers/auth.controller';
import { todoController } from '../controllers/todo.controller';
import authenticate from '../middlewares/authenticate.middleware';

const router = Router();

// auths
router.post('/v1/auth/register', authController.register);
router.post('/v1/auth/login', authController.login);
router.put('/v1/auth/logout', authenticate('REFRESH'), authController.logout);
router.post('/v1/auth/refresh', authenticate('REFRESH'),
    authController.refresh);

// todos
router.post('/v1/todos', authenticate('ACCESS'), todoController.add);
router.get('/v1/todos', authenticate('ACCESS'), todoController.getAll);
router.put('/v1/todos/:todoId', authenticate('ACCESS'), todoController.update);
router.delete('/v1/todos/:todoId',
    authenticate('ACCESS'), todoController.delete);

export default router;