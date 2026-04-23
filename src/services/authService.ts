import pool from '../config/db';
import jwt from 'jsonwebtoken';
import { hashPassword, comparePassword } from '../helpers/hashPassword';
import { CreateUserBody, SignInBody } from '../types';

export const createUserService = async (data: CreateUserBody) => {
    const {
        firstName,
        lastName,
        email,
        password,
        gender,
        jobRole,
        department,
        address,
    } = data;

    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [
        email,
    ]);

    if (existing.rows.length > 0) {
        throw new Error('An account with that email already exists.');
    }

    const hashedPassword = await hashPassword(password);

    const result = await pool.query(
        `INSERT INTO users
        (first_name, last_name, email, password, gender, job_role, department, address)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
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

    const user = result.rows[0];

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            is_admin: user.is_admin,
        },
        process.env.JWT_SECRET as string,
        { expiresIn: '24h' }
    );

    return {
        userId: user.id,
        token,
    };
};

export const signInService = async (data: SignInBody) => {
    const { email, password } = data;

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [
        email,
    ]);

    if (result.rows.length === 0) {
        throw new Error('Invalid email or password.');
    }

    const user = result.rows[0];

    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) {
        throw new Error('Invalid email or password.');
    }

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            is_admin: user.is_admin,
        },
        process.env.JWT_SECRET as string,
        { expiresIn: '24h' }
    );

    return {
        userId: user.id,
        token,
    };
};

export class AuthService {
    async createUser(data: any) {}
    async signIn(data: any) {}
}
