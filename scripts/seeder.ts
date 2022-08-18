import { AppDataSource } from '../src/database/data-source';
import { Comment } from '../src/database/entities/comment.entity';
import { Todo } from '../src/database/entities/todo.entity';
import { User } from '../src/database/entities/user.entity';
import { authService } from '../src/services/auth.service';

async function runSeed() {
    const { hashPassword } = authService;

    const users: User[] = [
        User.create({
            email: 'rahmat@mail.com',
            password: await hashPassword('rahmat'),
            name: 'Rahmat'
        })
    ];
    await User.save(users);

    const todos: Todo[] = [
        Todo.create({
            userId: 1,
            title: 'Todo 1',
            content: 'Hello world from todo 1.'
        })
    ];
    await Todo.save(todos);

    const comments: Comment[] = [
        Comment.create({
            todoId: 1,
            content: 'Soo good'
        }),
        Comment.create({
            todoId: 1,
            content: 'Soo fun haha'
        })
    ];
    await Comment.save(comments);
}

AppDataSource.initialize()
    .then(async () => {
        await runSeed();

        console.log('Data seeding has finished!');
        process.exit();
    })
    .catch((err: Error) => console.log(`${err} ${err.stack}`));