import { User } from '../database/entities/user.entity';
import { Errors } from '../utils/error.util';
import type { UserType } from '../validations/user.validate';
import { authService } from './auth.service';

class UserService {

    async getProfile(userId: number) {
        const user = User.findOne({
            where: { id: userId },
            select: {
                email: true,
                name: true
            }
        });

        if (!user) {
            throw Errors.USER_NOT_FOUND;
        }

        return user;
    }

    async update(userId: number, rawUser: UserType) {
        const { name, password } = rawUser;

        const user = await User.findOneBy({ id: userId });
        if (!user) {
            throw Errors.USER_NOT_FOUND;
        }

        user.name = name ?? user.name;
        user.password = await authService.hashPassword(password) ?? password;

        await User.save(user);
    }

}

export const userService = new UserService();