import { Request } from 'express';

export interface JwtPayload {
    id: number;
    email: string;
    is_admin: boolean;
}

export interface AuthRequest extends Request {
    user?: JwtPayload;
}
