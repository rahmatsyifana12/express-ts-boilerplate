import type { Request, Response } from 'express';

async function register(req: Request, res: Response) {
    return res.status(200).json({
        status: 'success',
        message: 'Successfully registered an account'
    });
}

export { register };