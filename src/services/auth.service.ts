import { User } from '../database/entities/User';
import type { CreateUserType } from '../validations/user.validate';

class AuthService {

    async create(rawUser: CreateUserType) {
        const user = User.create({ ...rawUser });

        await User.save(user);
    }

}

export const authService = new AuthService();