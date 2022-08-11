import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { todoService } from '../services/todo.service';
import { sendResponse } from '../utils/api.util';
import { validate } from '../utils/validate.util';
import { addTodoScehma } from '../validations/todo.validate';

class TodoController {

    async add(req: Request, res: Response) {
        const body = validate(req, addTodoScehma, 'body');
        await todoService.add(body, 1); // userId still dummy

        return sendResponse(res, {
            statusCode: StatusCodes.CREATED,
            success: true,
            message: 'Successfully created a todo'
        });
    }

}

export const todoController = new TodoController();