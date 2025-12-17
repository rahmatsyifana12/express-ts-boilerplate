import type { NextFunction, Request, Response } from 'express';
import { sendResponse } from '../utils/api.util';
import { Errors, ResponseError } from '../utils/error.util';
import { StatusCodes } from 'http-status-codes';
import logger from '../utils/logger.util';
import { isTimeoutError } from '../utils/timeout.util';

async function errorHandling(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    error: Error, req: Request, res: Response, _: NextFunction) {

    let err;
    if (error.name === ResponseError.name) {
        err = error as ResponseError;
    } else if (isTimeoutError(error)) {
        err = Errors.TIMEOUT;
        err.stack = error.stack;
    } else {
        err = Errors.SERVER;
        err.stack = error.stack;
    }

    if (err.statusCode === StatusCodes.INTERNAL_SERVER_ERROR) {
        logger.error(`${err}\n${err.stack}`);
    }

    console.log(err.stack);
    return sendResponse(res, ResponseError.toResponseBody(err));
}

export default errorHandling;