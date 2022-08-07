import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Colum({ length: 64 })
    email!: string;

    @Column({ length: 64 })
    name!: string;

}