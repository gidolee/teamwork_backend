import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest, JwtPayload } from '../types';
import { AuthService } from '../services/authService';

const authenticate = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const token = req.headers.authorization?.split(' ')[1] as
        | string
        | undefined;

    if (!token) {
        res.status(401).json({
            status: 'error',
            error: 'Access denied. No token provided.',
        });
        return;
    }

    try {
        const secret = process.env.JWT_SECRET as string;
        const decoded = jwt.verify(token, secret) as JwtPayload;
        const authService = new AuthService();
        const user = await authService.finduser(String(decoded.email));
        // console.log('this is the sign in user', user);
        if (!user) {
            res.status(401).json({
                status: 'error',
                error: 'Invalid token.',
            });
            return;
        }
        req.user = decoded;
        next();
    } catch {
        res.status(401).json({
            status: 'error',
            error: 'Invalid or expired token.',
        });
    }
};

export default authenticate;
