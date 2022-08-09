import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import { User } from '../database/entities/user.entity';
import { ResponseError } from '../utils/error.util';
import type { CreateUserType } from '../validations/user.validate';
import config from '../configs/config';

class AuthService {

    async create(rawUser: CreateUserType) {
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

    async hashPassword(password: string) {
        return bcrypt.hash(password, config.hashRounds);
    }

}

export const authService = new AuthService();