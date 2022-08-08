import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { authService } from '../services/auth.service';
import { sendResponse } from '../utils/api.util';
import type { ResponseError } from '../utils/error.util';
import { validate } from '../utils/validate.util';
import { createUserSchema } from '../validations/user.validate';

async function register(req: Request, res: Response) {
    try {
        const body = validate(req, createUserSchema, 'body');
        await authService.create(body);
    } catch (error) {
        const err = error as ResponseError;

        return sendResponse(res, {
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            success: false,
            message: err.message
        });
    }

    return sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: 'Successfully registered an account'
    });
}

export { register };