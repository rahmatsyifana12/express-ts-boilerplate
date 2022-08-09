import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('todos')
export class Todo extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 64 })
    title!: string;

    @Column({ length: 64 })
    content!: string;

}