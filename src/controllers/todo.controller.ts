import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { todoService } from '../services/todo.service';
import { sendResponse } from '../utils/api.util';
import { validate } from '../utils/validate.util';
import {
    addTodoScehma,
    todoIdSchema,
    updateTodoScehma
} from '../validations/todo.validate';

class TodoController {

    async add(req: Request, res: Response) {
        const userPayload = req.userPayload;
        const body = validate(req, addTodoScehma, 'body');

        await todoService.add(userPayload!.userId, body);

        return sendResponse(res, {
            statusCode: StatusCodes.CREATED,
            message: 'Successfully created a todo'
        });
    }

    async getAll(req: Request, res: Response) {
        const userPayload = req.userPayload;
        const todos = await todoService.getAll(userPayload!.userId);

        return sendResponse(res, {
            message: 'Successfully retrieved all todos',
            data: { todos }
        });
    }

    async update(req: Request, res: Response) {
        const userPayload = req.userPayload;
        const body = validate(req, updateTodoScehma, 'body');
        const params = validate(req, todoIdSchema, 'params');

        await todoService.update(params.todoId, userPayload!.userId, body);

        return sendResponse(res, {
            message: 'Successfully updated a todo'
        });
    }

    async delete(req: Request, res: Response) {
        const userPayload = req.userPayload;
        const params = validate(req, todoIdSchema, 'params');

        await todoService.delete(params.todoId, userPayload!.userId);

        return sendResponse(res, {
            message: 'Successfully deleted a todo'
        });
    }

}

export const todoController = new TodoController();