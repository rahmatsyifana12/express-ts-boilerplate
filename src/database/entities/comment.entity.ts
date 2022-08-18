import {
    BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { Todo } from './todo.entity';

@Entity('comments')
export class Comment extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'todo_id' })
    todoId!: number;

    @Column({ length: 64 })
    content!: string;

    @ManyToOne(() => Todo, (todo) => todo.comments)
    @JoinColumn({ name: 'todo_id' })
    todo!: Todo;

}