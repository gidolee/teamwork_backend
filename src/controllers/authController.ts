import { Request, Response } from 'express';
import { AuthService } from '../services/authService';

export class AuthController {
    private authService = new AuthService();

    createUser = async (req: Request, res: Response) => {
        const result = await this.authService.createUser(req.body);

        return res.status(201).json({
            status: 'success',
            data: {
                message: 'User account successfully created',
                result,
            },
        });
    };

    signIn = async (req: Request, res: Response) => {
        const result = await this.authService.signIn(req.body);

        return res.status(200).json({
            status: 'success',
            data: result,
        });
    };
}
