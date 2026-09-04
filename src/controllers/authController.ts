import { Request, Response } from 'express';
import { AuthService } from '../services/authService';

export class AuthController {
    private authService = new AuthService();

    createUser = async (req: Request, res: Response) => {
        try {
            const result = await this.authService.createUser(req.body);

            return res.status(201).json({
                status: 'success',
                data: {
                    message: 'User account successfully created',
                    result,
                },
            });
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                data: {
                    message: (error as Error).message,
                },
            });
        }
    };

    signIn = async (req: Request, res: Response) => {
        try {
            const result = await this.authService.signIn(req.body);

            return res.status(200).json({
                status: 'success',
                data: result,
            });
        } catch (error) {
            return res.status(401).json({
                status: 'error',
                data: {
                    message: (error as Error).message,
                },
            });
        }
    };

    updateUser = async (req: Request, res: Response) => {
        try {
            const result = await this.authService.updateUser(req.body);

            return res.status(200).json({
                status: 'success',
                data: result,
            });
        } catch (error) {
            return res.status(401).json({
                status: 'error',
                data: {
                    message: (error as Error).message,
                },
            });
        }
    };
}
