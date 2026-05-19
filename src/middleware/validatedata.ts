import express, { RequestHandler, Response, NextFunction } from 'express';
import { z } from 'zod';

interface TypedRequest<T> extends express.Request {
    body: T;
}

export const validateSchema = <T extends z.ZodTypeAny>(
    schema: T
): RequestHandler => {
    return (
        req: TypedRequest<z.infer<T>>,
        res: Response,
        next: NextFunction
    ): void => {
        const validationResult = schema.safeParse(req.body);

        if (!validationResult.success) {
            res.status(400).json({
                message: 'Validation failed',
                errors: validationResult.error.issues,
            });
            return;
        }

        // Overwrite the req.body with validated data
        req.body = validationResult.data;

        next();
    };
};
