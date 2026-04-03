import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import pool from '../config/db';
import { hashPassword, comparePassword } from '../helpers/hashPassword';
import { CreateUserBody, SignInBody } from '../types';

export const createUser = async (
    req: Request<object, object, CreateUserBody>,
    res: Response
): Promise<void> => {
    const {
        firstName,
        lastName,
        email,
        password,
        gender,
        jobRole,
        department,
        address,
    } = req.body;

    if (!firstName || !lastName || !email || !password) {
        res.status(400).json({
            status: 'error',
            error: 'firstName, lastName, email and password are required.',
        });
        return;
    }

    try {
        const existing = await pool.query(
            'SELECT id FROM users WHERE email = $1',
            [email]
        );
        if (existing.rows.length > 0) {
            res.status(409).json({
                status: 'error',
                error: 'An account with that email already exists.',
            });
            return;
        }

        const hashedPassword = await hashPassword(password);

        const result = await pool.query(
            `INSERT INTO users
         (first_name, last_name, email, password, gender, job_role, department, address)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id, email, is_admin`,
            [
                firstName,
                lastName,
                email,
                hashedPassword,
                gender,
                jobRole,
                department,
                address,
            ]
        );

        const newUser = result.rows[0];

        const token = jwt.sign(
            {
                id: newUser.id,
                email: newUser.email,
                is_admin: newUser.is_admin,
            },
            process.env.JWT_SECRET as string,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            status: 'success',
            data: {
                message: 'User account successfully created',
                token,
                userId: newUser.id,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            error: (error as Error).message,
        });
    }
};

export const signIn = async (
    req: Request<object, object, SignInBody>,
    res: Response
): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({
            status: 'error',
            error: 'Email and password are required.',
        });
        return;
    }

    try {
        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        if (result.rows.length === 0) {
            res.status(401).json({
                status: 'error',
                error: 'Invalid email or password.',
            });
            return;
        }

        const user = result.rows[0];
        const passwordMatch = await comparePassword(password, user.password);

        if (!passwordMatch) {
            res.status(401).json({
                status: 'error',
                error: 'Invalid email or password.',
            });
            return;
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, is_admin: user.is_admin },
            process.env.JWT_SECRET as string,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            status: 'success',
            data: { token, userId: user.id },
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            error: (error as Error).message,
        });
    }
};
