import Router from 'express';
import { register } from '../controllers/auth.controller';
import 'express-async-errors';

const router = Router();

router.post('/v1/auth/register', register);

export default router;