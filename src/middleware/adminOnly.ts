import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';

const adminOnly = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): void => {
    if (!req.user?.is_admin) {
        res.status(403).json({
            status: 'error',
            error: 'Access denied. Admins only.',
        });
        return;
    }
    next();
};

export default adminOnly;
