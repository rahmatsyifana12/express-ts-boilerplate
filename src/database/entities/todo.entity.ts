import {
    BaseEntity,
    Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { User } from './user.entity';

@Entity('todos')
export class Todo extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'user_id' })
    userId!: number;

    @Column({ length: 64 })
    title!: string;

    @Column({ length: 64 })
    content!: string;

    @ManyToOne(() => User, (user) => user.todos)
    @JoinColumn({ name: 'user_id' })
    user!: User;

}