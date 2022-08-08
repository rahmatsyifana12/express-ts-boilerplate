import type { Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { ObjectSchema } from 'joi';
import { ResponseError } from './error.util';

type ValidationType = 'body' | 'params';

export function validate<T>(
    req: Request,
    schema: ObjectSchema<T>, type:
    ValidationType) {

    const content = req[type];
    const { value, error } = schema.validate(content);

    if (error) {
        throw new ResponseError(error.message, StatusCodes.BAD_REQUEST);
    }

    return value;
}