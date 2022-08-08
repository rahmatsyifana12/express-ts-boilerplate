import type { NextFunction, Request, Response } from 'express';
import { sendResponse } from '../utils/api.util';
import { Errors, ResponseError } from '../utils/error.util';

async function errorHandling(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    error: Error, req: Request, res: Response, _: NextFunction) {

    let err;
    if (error.name === ResponseError.name) {
        err = error as ResponseError;
    } else {
        err = Errors.SERVER;
        err.stack = error.stack;
    }

    return sendResponse(res, ResponseError.toResponseBody(err));
}

export default errorHandling;