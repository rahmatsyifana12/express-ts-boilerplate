import type { NextFunction, Request, Response } from 'express';
import { sendResponse } from '../utils/api.util';
import type { ResponseError } from '../utils/error.util';

async function errorHandling(
    error: Error, _: Request, res: Response, next:NextFunction) {

    const err = error as ResponseError;
}

export default errorHandling;