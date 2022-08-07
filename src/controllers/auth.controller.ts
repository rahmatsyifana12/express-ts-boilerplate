import type { Request, Response } from 'express';
import { validate } from '../utils/validate.util';
import { createUserSchema } from '../validations/user.validate';

async function register(req: Request, res: Response) {
    const body = validate(req, createUserSchema, 'body');

    return res.status(200).json({
        status: 'success',
        message: 'Successfully registered an account'
    });
}

export { register };