import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ms from 'ms';
import config from '../configs/config';
import { authService } from '../services/auth.service';
import { sendResponse, TOKEN_NAME_COOKIE } from '../utils/api.util';
import { validate } from '../utils/validate.util';
import { registerSchema, loginSchema } from '../validations/user.validate';

class AuthController {

    async register(req: Request, res: Response) {
        const body = validate(req, registerSchema, 'body');
        await authService.login(body);

        return sendResponse(res, {
            statusCode: StatusCodes.CREATED,
            success: true,
            message: 'Successfully registered an account'
        });
    }

    async login(req: Request, res: Response) {
        const body = validate(req, loginSchema, 'body');
        const { accessToken, refreshToken } = await authService.login(body);

        res.cookie(TOKEN_NAME_COOKIE, refreshToken, {
            httpOnly: true,
            maxAge: ms(config.jwt.refreshExpire)
        });

        return sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: 'Successfully logged in',
            data: { accessToken }
        });
    }

}

export const authController = new AuthController();