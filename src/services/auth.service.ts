import bcrypt from 'bcrypt';
import type { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { User } from '../database/entities/user.entity';
import { ResponseError } from '../utils/error.util';
import type { RegisterType, LoginType } from '../validations/user.validate';
import config from '../configs/config';
import type { TokenType, UserPayload } from '../typings/auth';
import type { Request } from 'express';
import { REFRESH_TOKEN_COOKIE } from '../utils/api.util';

class AuthService {

    async register(rawUser: RegisterType) {
        const user = User.create({ ...rawUser });

        const foundUser = await User.findOneBy({ email: user.email });
        if (foundUser) {
            throw new ResponseError(
                'This email is already registered',
                StatusCodes.BAD_REQUEST);
        }

        user.password = await this.hashPassword(user.password);

        user.createdAt = new Date();
        user.updatedAt = new Date();

        await User.save(user);
    }

    async login({ email, password }: LoginType) {
        const user = await User.findOneBy({ email });
        if (!user) {
            throw new ResponseError(
                "Account doesn't exists!", StatusCodes.BAD_REQUEST);
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw new ResponseError(
                'Password is incorrect!', StatusCodes.BAD_REQUEST);
        }

        const accessToken = await this.generateToken(user, 'ACCESS');
        const refreshToken = await this.generateToken(user, 'REFRESH');

        return { accessToken, refreshToken };
    }

    async logout(refreshToken: string) {
        const user = await User.findOneBy({ refreshToken });
        if (!user) {
            throw new ResponseError(
                'User doesn\'t exists!', StatusCodes.BAD_REQUEST);
        }

        user.refreshToken = null;

        await User.save(user);
    }

    async refresh(userPayload: UserPayload) {
        const user = await User.findOneBy({ id: userPayload.userId });

        return this.generateToken(user!, 'ACCESS');
    }

    async hashPassword(password: string) {
        return bcrypt.hash(password, config.hashRounds);
    }

    async generateToken(user: User, tokenType: TokenType) {
        const payload = { userId: user.id };
        const options: jwt.SignOptions = {};

        let tokenSecret;

        if (tokenType === 'ACCESS') {
            options.expiresIn = config.jwt.accessExpire;
            tokenSecret = config.jwt.accessSecret;
        } else {
            options.expiresIn = config.jwt.refreshExpire;
            tokenSecret = config.jwt.refreshSecret;
        }

        const token = jwt.sign(payload, tokenSecret, options);

        if (tokenType === 'REFRESH') {
            user.refreshToken = token;
            await User.save(user);
        }

        return token;
    }

    async getToken(req: Request, tokenType: TokenType) {
        let token: string;
        console.log(req.cookies);

        if (tokenType === 'ACCESS') {
            const rawToken = req.header('authorization');
            if (!rawToken || !rawToken.startsWith('Bearer ')) {
                return;
            }

            token = rawToken.split(' ')[1];
        } else {
            token = req.cookies[REFRESH_TOKEN_COOKIE];
        }

        return token;
    }

    async getTokenPayload(req: Request, tokenType: TokenType) {
        const token = await this.getToken(req, tokenType);
        if (!token) {
            return;
        }

        let secret: string;
        if (tokenType === 'ACCESS') {
            secret = config.jwt.accessSecret;
        } else {
            secret = config.jwt.refreshSecret;
        }

        const user = await User.findOneBy({ refreshToken: token });
        if (tokenType === 'REFRESH' && !user) {
            return;
        }

        const payload = jwt.verify(token, secret) as JwtPayload;

        return { userId: payload.userId } as UserPayload;
    }

}

export const authService = new AuthService();