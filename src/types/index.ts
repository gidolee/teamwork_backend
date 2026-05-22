import { Request } from 'express';

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    gender?: string;
    jobRole?: string;
    department?: string;
    address?: string;
    isAdmin: boolean;
    createdOn: Date;
}

export interface JwtPayload {
    id: number;
    email: string;
    isAdmin: boolean;
}

export interface AuthRequest extends Request {
    user?: JwtPayload;
}

export interface SignInBody {
    email: string;
    password: string;
}
