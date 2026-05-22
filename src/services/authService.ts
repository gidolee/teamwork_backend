import pool from '../config/db';
import jwt from 'jsonwebtoken';
import { hashPassword, comparePassword } from '../helpers/hashPassword';
import {
    FIND_USER_BY_EMAIL,
    FIND_USER_ID_BY_EMAIL,
    CREATE_USER,
} from '../queries/authQueries';
import { SignInBody } from '../types';
import { CreateUserBody } from '../types/user';

export class AuthService {
    async createUser(data: CreateUserBody) {
        const {
            firstName,
            lastName,
            password,
            gender,
            jobRole,
            department,
            address,
        } = data;

        const email = data.email.toLowerCase();

        const existing = await pool.query(FIND_USER_ID_BY_EMAIL, [email]);

        if (existing.rows.length > 0) {
            throw new Error('An account with that email already exists.');
        }

        const hashedPassword = await hashPassword(password);

        const result = await pool.query(CREATE_USER, [
            firstName,
            lastName,
            email,
            hashedPassword,
            gender,
            jobRole,
            department,
            address,
        ]);

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
    }

    async signIn(data: SignInBody) {
        const password = data.password;
        const email = data.email.toLowerCase();

        const result = await pool.query(FIND_USER_BY_EMAIL, [email]);

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
    }

    async finduser(email: string) {
        const result = await pool.query(FIND_USER_BY_EMAIL, [email]);
        return result.rows[0];
    }
}
