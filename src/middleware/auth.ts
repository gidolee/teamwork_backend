import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest, JwtPayload } from '../types';

const authenticate = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): void => {
    const token = req.headers.token as string | undefined;

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
