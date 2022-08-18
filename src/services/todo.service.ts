import { StatusCodes } from 'http-status-codes';
import { Comment } from '../database/entities/comment.entity';
import { Todo } from '../database/entities/todo.entity';
import { ResponseError } from '../utils/error.util';
import type { AddTodoType, TodoIdType } from '../validations/todo.validate';

class TodoService {

    async add(rawTodo: AddTodoType, userId: number) {
        const todo = Todo.create({ userId, ...rawTodo });

        await Todo.save(todo);
    }

    async getTodoAndComments({ todoId }: TodoIdType) {
        const todos = await Todo.find();
        if (!todos) {
            throw new ResponseError('Todo not found', StatusCodes.NOT_FOUND);
        }

        for (const todo of todos) {
            const comments = await Comment.createQueryBuilder('comment')
                .leftJoinAndSelect('comment.todo', 'todo')
                .andWhere('todo.id = :todoId', { todoId })
                .select(['comment.id', 'comment.content'])
                .getMany();

            todo.comments = comments;
        }

        return todos;
    }

}

export const todoService = new TodoService();