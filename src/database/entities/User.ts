import {
    BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';
import { Todo } from './Todo';

@Entity('users')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @OneToMany(() => Todo, (todo) => todo.user)
    todos!: Todo[];

    @Column({ length: 64 })
    email!: string;

    @Column({ length: 64 })
    password!: string;

    @Column({ length: 64 })
    name!: string;

}