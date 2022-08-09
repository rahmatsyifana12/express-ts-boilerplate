import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import { User } from '../database/entities/user.entity';
import { ResponseError } from '../utils/error.util';
import type { RegisterType, LoginType } from '../validations/user.validate';
import config from '../configs/config';

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

    }

    async hashPassword(password: string) {
        return bcrypt.hash(password, config.hashRounds);
    }

}

export const authService = new AuthService();