import { z } from 'zod';

export const createUserSchema = z.object({
    body: z.object({
        firstName: z
            .string()
            .min(3, { message: 'First name must be at least 3 characters' })
            .regex(/^\S+$/, { message: 'First name cannot contain spaces' }),
        lastName: z
            .string()
            .min(3, { message: 'Last name must be at least 3 characters' })
            .regex(/^\S+$/, { message: 'Last name cannot contain spaces' }),
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

export const updateUserSchema = z.object({
    body: z.object({
        email: z.string().email('Invalid email'),
        isAdmin: z.boolean().optional(),
    }),
});

// These types will automatically match your validation rules
export type CreateUserType = z.infer<typeof createUserSchema>;
export type SignInType = z.infer<typeof signInSchema>;
export type UpdateUserType = z.infer<typeof updateUserSchema>;
