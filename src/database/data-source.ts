import { DataSource } from 'typeorm';
import 'reflect-metadata';
import config from '../configs/config';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: config.db.host,
    port: config.db.port,
    username: config.db.username,
    password: config.db.password,
    database: config.db.database,
    synchronize: true,
    logging: true,
    entities: ['./src/database/entities/*.ts'],
    subscribers: [],
    migrations: ['./src/database/migrations/*.ts'],
});