import { User } from '../database/entities/user.entity';
import { Errors } from '../utils/error.util';

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

}

export const userService = new UserService();