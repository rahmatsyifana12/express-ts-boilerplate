import type { Request, Response } from 'express';
import { authService } from '../services/auth.service';
import type { ResponseError } from '../utils/error.util';
import { validate } from '../utils/validate.util';
import { createUserSchema } from '../validations/user.validate';

async function register(req: Request, res: Response) {
    try {
        const body = validate(req, createUserSchema, 'body');
        await authService.create(body);
    } catch (error) {
        const err = error as ResponseError;
        return res.status(err.statusCode).json({
            status: 'fail',
            message: err.message
        });
    }

    return res.status(200).json({
        status: 'success',
        message: 'Successfully registered an account'
    });
}

export { register };