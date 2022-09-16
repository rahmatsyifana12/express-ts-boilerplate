import type { Request, Response } from 'express';
import { authService } from '../services/auth.service';
import { userService } from '../services/user.service';
import { sendResponse } from '../utils/api.util';

class UserController {

    async getProfile(req: Request, res: Response) {
        const userPayload = await authService.getTokenPayload(req, 'ACCESS');
        const user = await userService.getProfile(userPayload!.userId);

        return sendResponse(res, {
            message: 'Successfully retrieved user profile'
        });
    }

}

export const userController = new UserController();