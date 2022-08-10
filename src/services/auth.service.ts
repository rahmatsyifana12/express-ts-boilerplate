import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { User } from '../database/entities/user.entity';
import { ResponseError } from '../utils/error.util';
import type { RegisterType, LoginType } from '../validations/user.validate';
import config from '../configs/config';
import type { TokenType } from '../typings/auth';

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

        await User.save(user);
    }

    async login({ email, password }: LoginType) {
        const user = await User.findOneBy({ email });
        if (!user) {
            throw new ResponseError(
                'Account does not exists!', StatusCodes.BAD_REQUEST);
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

    async hashPassword(password: string) {
        return bcrypt.hash(password, config.hashRounds);
    }

    async generateToken(user: User, tokenType: TokenType) {
        const payload = { id: user.id };
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
            await user.save();
        }

        return token;
    }

}

export const authService = new AuthService();