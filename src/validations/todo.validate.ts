import joi from 'joi';

export interface AddTodoType {
    title: string;
    content: string;
}

export interface TodoIdType {
    todoId: number;
}

export const addTodoScehma = joi.object<AddTodoType>({
    title: joi.string()
        .max(64)
        .required(),

    content: joi.string()
        .max(64)
        .required()
});

export const todoIdSchema = joi.object<TodoIdType>({
    todoId: joi.number()
        .required()
});