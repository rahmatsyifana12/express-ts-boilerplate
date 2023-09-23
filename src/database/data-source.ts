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
    synchronize: config.isDev,
    logging: true,
    entities: [`${__dirname}/entities/*.{ts,js}`],
    subscribers: [],
    migrations: [`${__dirname}/migrations/*.{ts,js}`],
});