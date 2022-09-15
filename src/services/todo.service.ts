import { Todo } from '../database/entities/todo.entity';
import { Errors } from '../utils/error.util';
import type { TodoType } from '../validations/todo.validate';

class TodoService {

    async add(rawTodo: TodoType, userId: number) {
        const todo = Todo.create({ userId, ...rawTodo });

        todo.createdAt = new Date();
        todo.updatedAt = new Date();

        await Todo.save(todo);
    }

    async delete(todoId: number, userId: number) {
        const todo = await Todo.findOneBy({ id: todoId });

        if (!todo) {
            throw Errors.TODO_NOT_FOUND;
        }

        if (todo.userId !== userId) {
            throw Errors.NO_PERMISSION;
        }

        await Todo.remove(todo);
    }

}

export const todoService = new TodoService();