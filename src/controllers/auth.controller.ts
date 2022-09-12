import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ms from 'ms';
import config from '../configs/config';
import { authService } from '../services/auth.service';
import { REFRESH_TOKEN_COOKIE, sendResponse } from '../utils/api.util';
import { validate } from '../utils/validate.util';
import { registerSchema, loginSchema } from '../validations/user.validate';

class AuthController {

    async register(req: Request, res: Response) {
        const body = validate(req, registerSchema, 'body');
        await authService.register(body);

        return sendResponse(res, {
            statusCode: StatusCodes.CREATED,
            success: true,
            message: 'Successfully registered an account'
        });
    }

    async login(req: Request, res: Response) {
        const body = validate(req, loginSchema, 'body');
        const { accessToken, refreshToken } = await authService.login(body);

        res.cookie(REFRESH_TOKEN_COOKIE, refreshToken, {
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

    async logout(req: Request, res: Response) {
        const refreshToken = await authService.getToken(req, 'REFRESH');
        console.log('BUGGG');
        await authService.logout(refreshToken!);

        res.clearCookie(REFRESH_TOKEN_COOKIE);

        return sendResponse(res, {
            statusCode: StatusCodes.ACCEPTED,
            success: true,
            message: 'Successfully logged out'
        });
    }

    async refresh(req: Request, res: Response) {
        const userPayload = await authService.getTokenPayload(req, 'REFRESH');
        const accessToken = await authService.refresh(userPayload!);

        return sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: 'Successfully generated a new access token',
            data: { accessToken }
        });
    }

}

export const authController = new AuthController();