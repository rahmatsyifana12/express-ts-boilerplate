import joi from 'joi';

export interface RegisterType {
    email: string;
    name: string;
    password: string;
}

export interface LoginType {
    email: string;
    password: string;
}

export type UserType = RegisterType;

export const registerSchema = joi.object<RegisterType>({
    email: joi.string()
        .email()
        .max(64)
        .required(),

    name: joi.string()
        .min(3)
        .max(64)
        .required(),

    password: joi.string()
        .min(3)
        .max(64)
        .required()
});

export const loginSchema = joi.object<LoginType>({
    email: joi.string()
        .email()
        .required(),

    password: joi.string()
        .required(),
});

export const updateUserSchema = joi.object<UserType>({
    name: joi.string()
        .max(64),

    password: joi.string()
        .min(3)
        .max(64)
});