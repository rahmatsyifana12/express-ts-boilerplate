import { AppDataSource } from '../src/database/data-source';
import { Todo } from '../src/database/entities/todo.entity';
import { User } from '../src/database/entities/user.entity';
import { authService } from '../src/services/auth.service';

async function runSeed() {
    const { hashPassword } = authService;

    const users: User[] = [
        User.create({
            email: 'rahmat@mail.com',
            password: await hashPassword('rahmat123'),
            name: 'Rahmat S.'
        }),
        User.create({
            email: 'rafi@mail.com',
            password: await hashPassword('rafi123'),
            name: 'M. Rafi'
        })
    ];
    await User.save(users);

    const todos: Todo[] = [
        Todo.create({
            userId: 1,
            title: 'Todo 1',
            content: 'Hello world from todo 1.'
        }),
        Todo.create({
            userId: 1,
            title: 'Todo 2',
            content: 'Hello world from todo 2.'
        }),
        Todo.create({
            userId: 2,
            title: 'Todo 3',
            content: 'Hello world from todo 3.'
        }),
        Todo.create({
            userId: 2,
            title: 'Todo 4',
            content: 'Hello world from todo 4.'
        })
    ];
    await Todo.save(todos);
}

AppDataSource.initialize()
    .then(async () => {
        await runSeed();

        console.log('Data seeding has finished!');
        process.exit();
    })
    .catch((err: Error) => console.log(`${err} ${err.stack}`));