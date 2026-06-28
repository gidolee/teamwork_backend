import { z } from 'zod';

export const createUserSchema = z.object({
    body: z.object({
        firstName: z
            .string()
            .min(2, { message: 'First name must be at least 2 characters' }),
        lastName: z
            .string()
            .min(2, { message: 'Last name must be at least 2 characters' }),
        email: z.string().email({ message: 'Invalid email address' }),
        password: z
            .string()
            .min(6, { message: 'Password must be at least 6 characters' }),
        gender: z.string().optional(),
        jobRole: z.string().optional(),
        department: z.string().optional(),
        address: z.string().optional(),
    }),
});

export const signInSchema = z.object({
    body: z.object({
        email: z.string().email('Invalid email'),
        password: z.string().min(1, 'Password is required'),
    }),
});

// These types will automatically match your validation rules
export type CreateUserType = z.infer<typeof createUserSchema>;
export type SignInType = z.infer<typeof signInSchema>;
