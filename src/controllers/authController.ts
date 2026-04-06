import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { createUserService, signInService } from '../services/authService';
import { createUserSchema, signInSchema } from '../validators/authValidator';

export const createUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        // 1. Validate the body using the schema
        const validatedData = createUserSchema.parse(req.body);

        // 2. Call the service
        const result = await createUserService(validatedData as any);

        // 3. Send response
        res.status(201).json({
            status: 'success',
            data: {
                message: 'User account successfully created',
                ...result,
            },
        });
    } catch (error: any) {
        // Handle Zod Validation Errors
        if (error instanceof ZodError) {
            res.status(400).json({
                status: 'error',
                error: error.issues.map((e) => ({
                    field: e.path.join('.'),
                    message: e.message,
                })),
            });
            return;
        }

        // Handle Business Logic Errors (thrown by Service)
        if (error.message === 'EMAIL_EXISTS') {
            res.status(409).json({
                status: 'error',
                error: 'An account with that email already exists.',
            });
            return;
        }

        // Default Internal Server Error
        console.error('Create User Error:', error);
        res.status(500).json({
            status: 'error',
            error: 'Internal server error',
        });
    }
};

export const signIn = async (req: Request, res: Response): Promise<void> => {
    try {
        // 1. Validate the body
        const validatedData = signInSchema.parse(req.body);

        // 2. Call the service
        const result = await signInService(validatedData);

        // 3. Send response
        res.status(200).json({
            status: 'success',
            data: result,
        });
    } catch (error: any) {
        // Handle Zod Validation Errors
        if (error instanceof ZodError) {
            res.status(400).json({
                status: 'error',
                error: error.issues.map((e) => ({
                    field: e.path.join('.'),
                    message: e.message,
                })),
            });
            return;
        }

        // Handle Business Logic Errors (thrown by Service)
        if (error.message === 'INVALID_CREDENTIALS') {
            res.status(401).json({
                status: 'error',
                error: 'Invalid email or password.',
            });
            return;
        }

        // Default Internal Server Error
        console.error('Sign In Error:', error);
        res.status(500).json({
            status: 'error',
            error: 'Internal server error',
        });
    }
};
