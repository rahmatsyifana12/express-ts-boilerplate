import dotenv from 'dotenv';

dotenv.config();
const { env } = process;

const config = {
    db: {
        host: env.DB_HOST!,
        port: parseInt(env.DB_PORT!),
        database: env.DB_DATABASE!,
        username: env.DB_USERNAME!,
        password: env.DB_PASSWORD!
    },
    jwt: {
        accessSecret: env.JWT_ACCESS_SECRET!,
        refreshSecret: env.JWT_REFRESH_SECRET!,
        accessExpire: env.JWT_ACCESS_EXPIRE!,
        refreshExpire: env.JWT_REFRESH_EXPIRE!
    },
    hashRounds: 10,
    port: parseInt(env.PORT!)
};

export default config;