// src/middleware/errorHandler.ts

import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

const businessErrors: Record<
    string,
    {
        status: number;
        message: string;
    }
> = {
    EMAIL_EXISTS: {
        status: 409,
        message: 'An account with that email already exists.',
    },
    INVALID_CREDENTIALS: {
        status: 401,
        message: 'Invalid email or password.',
    },
};

export const errorHandler = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Validation errors
    if (error instanceof ZodError) {
        return res.status(400).json({
            status: 'error',
            errors: error.issues.map((issue) => ({
                field: issue.path.join('.'),
                message: issue.message,
            })),
        });
    }

    // Business errors
    const businessError = businessErrors[error.message];

    if (businessError) {
        return res.status(businessError.status).json({
            status: 'error',
            error: businessError.message,
        });
    }

    // Unexpected errors
    console.error(error);

    return res.status(500).json({
        status: 'error',
        error: 'Internal server error',
    });
};
