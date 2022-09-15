import type { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const REFRESH_TOKEN_COOKIE = 'refreshToken';

export interface APIResponse {
    statusCode?: StatusCodes;
    success?: boolean;
    message: string;
    data?: unknown;
}

export function sendResponse(res: Response, params: APIResponse) {
    const { statusCode, success, ...otherParams } = params;

    const isSuccess = success ?? true;
    const status = isSuccess ? 'success' : 'fail';
    const code = statusCode ?? StatusCodes.OK;

    return res.status(code).json({ status, ...otherParams });
}