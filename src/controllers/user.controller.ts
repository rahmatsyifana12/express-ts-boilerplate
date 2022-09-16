import type { Request, Response } from 'express';
import { userService } from '../services/user.service';
import { sendResponse } from '../utils/api.util';

class UserController {

    async getProfile(req: Request, res: Response) {
        const userPayload = req.userPayload;
        const user = await userService.getProfile(userPayload!.userId);

        return sendResponse(res, {
            message: 'Successfully retrieved user profile',
            data: { user }
        });
    }

}

export const userController = new UserController();