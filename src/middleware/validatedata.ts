import express, { RequestHandler, Response, NextFunction } from 'express';
import { z } from 'zod';

interface TypedRequest<T> extends express.Request {
    body: T;
    validatedData?: z.infer<T>;
}

export const validateSchema = <T extends z.ZodTypeAny>(
    schema: T
): RequestHandler => {
    return (
        req: TypedRequest<z.infer<T>>,
        res: Response,
        next: NextFunction
    ): void => {
        const validationResult = schema.safeParse({
            body: req.body,
            query: req.query,
            params: req.params,
        });

        if (!validationResult.success) {
            res.status(400).json({
                message: 'Validation failed',
                errors: validationResult.error.issues,
            });
            return;
        }

        // validationResult.data may be typed generically; assert any to access body
        const parsed: any = validationResult.data;
        req.validatedData = parsed.body;

        next();
    };
};
