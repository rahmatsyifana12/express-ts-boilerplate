import { Todo } from '../database/entities/todo.entity';
import { Errors } from '../utils/error.util';
import type { TodoType } from '../validations/todo.validate';

class TodoService {

    async add(userId: number, rawTodo: TodoType) {
        const todo = Todo.create({ userId, ...rawTodo });

        todo.createdAt = new Date();
        todo.updatedAt = new Date();

        await Todo.save(todo);
    }

    async getAll(userId: number) {
        const todos = await Todo.findBy({ userId });

        return todos;
    }

    async update(todoId: number, userId: number, rawTodo: TodoType) {
        const { title, content } = rawTodo;
        const todo = await Todo.findOneBy({ id: todoId });

        if (!todo) {
            throw Errors.TODO_NOT_FOUND;
        }

        if (todo.userId !== userId) {
            throw Errors.NO_PERMISSION;
        }

        todo.title = title ?? todo.title;
        todo.content = content ?? todo.content;

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