import { Request } from 'express';

export interface JwtPayload {
    id: number;
    email: string;
    isAdmin: boolean;
}

export interface AuthRequest extends Request {
    user?: JwtPayload;
}
