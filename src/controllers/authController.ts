// import { Request, Response } from 'express';
// import { ZodError } from 'zod';
// import { AuthService } from '../services/authService';

// export class AuthController {
//     private authService = new AuthService();

//     createUser = async (req: Request, res: Response) => {
//         try {
//             const result = await this.authService.createUser(req.body);

//             return res.status(201).json({
//                 status: 'success',
//                 data: {
//                     message: 'User account successfully created',
//                     result,
//                 },
//             });
//         } catch (error: any) {
//             this.handleError(res, error, 'Create User Error', {
//                 EMAIL_EXISTS: {
//                     status: 409,
//                     message: 'An account with that email already exists.',
//                 },
//             });
//         }
//     };

//     signIn = async (req: Request, res: Response) => {
//         try {
//             const result = await this.authService.signIn(req.body);

//             return res.status(200).json({
//                 status: 'success',
//                 data: result,
//             });
//         } catch (error: any) {
//             this.handleError(res, error, 'Sign In Error', {
//                 INVALID_CREDENTIALS: {
//                     status: 401,
//                     message: 'Invalid email or password.',
//                 },
//             });
//         }
//     };

//     private handleError(
//         res: Response,
//         error: any,
//         logLabel: string,
//         businessErrors: Record<string, { status: number; message: string }>
//     ) {
//         if (error instanceof ZodError) {
//             return res.status(400).json({
//                 status: 'error',
//                 error: error.issues.map((e) => ({
//                     field: e.path.join('.'),
//                     message: e.message,
//                 })),
//             });
//         }

//         const businessError = businessErrors[error.message];
//         if (businessError) {
//             return res.status(businessError.status).json({
//                 status: 'error',
//                 error: businessError.message,
//             });
//         }

//         console.error(`${logLabel}:`, error);
//         res.status(500).json({
//             status: 'error',
//             error: 'Internal server error',
//         });
//     }
// }

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
