import type { Request } from 'express';
import type { ObjectSchema } from 'joi';

type ValidationType = 'body' | 'params';

export function validate<T>(
    req: Request,
    schema: ObjectSchema<T>, type:
    ValidationType) {

    const content = req[type];
    const { value, error } = schema.validate(content);

    if (error) {
        // throw error
    }

    return value;
}