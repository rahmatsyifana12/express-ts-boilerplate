import {
    BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';
import { Todo } from './todo.entity';

@Entity('users')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 64 })
    email!: string;

    @Column({ length: 64 })
    password!: string;

    @Column({ length: 64 })
    name!: string;

    @Column({ name: 'refresh_token', nullable: true, type: String })
    refreshToken!: string | null;

    @OneToMany(() => Todo, (todo) => todo.user)
    todos!: Todo[];

}