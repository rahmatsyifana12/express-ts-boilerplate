import joi from 'joi';

export interface TodoType {
    title: string;
    content: string;
}

export interface TodoIdType {
    todoId: number;
}

export const addTodoScehma = joi.object<TodoType>({
    title: joi.string()
        .max(64)
        .required(),

    content: joi.string()
        .max(64)
        .required()
});

export const updateTodoScehma = joi.object<TodoType>({
    title: joi.string()
        .max(64),

    content: joi.string()
        .max(64)
});

export const todoIdSchema = joi.object<TodoIdType>({
    todoId: joi.number()
        .required()
});