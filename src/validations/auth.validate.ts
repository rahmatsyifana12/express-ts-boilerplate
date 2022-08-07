import joi from 'joi';

const createUserSchema = joi.object({
    name: joi.string()
        .max(64)
        .required()
});

export { createUserSchema };