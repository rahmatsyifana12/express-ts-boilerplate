import type { Request, Response } from 'express';
import { userService } from '../services/user.service';
import { sendResponse } from '../utils/api.util';
import { validate } from '../utils/validate.util';
import { updateUserSchema } from '../validations/user.validate';

class UserController {

    async getProfile(req: Request, res: Response) {
        const userPayload = req.userPayload;
        const user = await userService.getProfile(userPayload!.userId);

        return sendResponse(res, {
            message: 'Successfully retrieved user profile',
            data: { user }
        });
    }

    async update(req: Request, res: Response) {
        const userPayload = req.userPayload;
        const body = validate(req, updateUserSchema, 'body');

        await userService.update(userPayload!.userId, body);

        return sendResponse(res, {
            message: 'Successfully updated user data'
        });
    }

}

export const userController = new UserController();