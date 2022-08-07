import { User } from '../database/entities/User';
import { ResponseError } from '../utils/error.util';
import type { CreateUserType } from '../validations/user.validate';

class AuthService {

    async create(rawUser: CreateUserType) {
        const user = User.create({ ...rawUser });

        throw new ResponseError('Testing', 500);

        await User.save(user);
    }

}

export const authService = new AuthService();