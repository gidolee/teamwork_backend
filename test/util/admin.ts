// const adminUser = {
//     first_name: 'Lucas',
//     last_name: 'Daniel',
//     email: 'lucasdaniel@gmail.com',
//     password: 'Admin@123',
// };

// const createAdmin = async () => {
//     const res = await request(app)
//         .post('/api/v1/auth/register')
//         .set('Accept', 'application/json')
//         .send(adminUser);

// export default adminUser;

import request from 'supertest';
import bcrypt from 'bcrypt';
import pool from '../../src/config/db';
import app from '../../src/app';
import { REFUSED } from 'node:dns';

function makeid(length: number) {
    var result = '';
    var characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
}

console.log(makeid(5));

const adminUser = {
    first_name: 'Lucas',
    last_name: 'Daniel',
    email: 'lucasdaniel1@gmail.com',
    password: 'Admin@123',
    job_role: 'admin',
    is_admin: true,
};

const seedAdmin = async () => {
    const hashed = await bcrypt.hash(adminUser.password, 10);
    const user = await pool.query(
        `INSERT INTO users (first_name, last_name, email, password, job_role, is_admin)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT (email) DO NOTHING`,
        [
            adminUser.first_name,
            adminUser.last_name,
            adminUser.email,
            hashed,
            adminUser.job_role,
            true,
        ]
    );
    // console.log('Admin user seeded:', user.rows[0]);
};

const createAdmin = async () => {
    await seedAdmin();

    const res = await request(app)
        .post('/api/v1/auth/login')
        .set('Accept', 'application/json')
        .send({ email: adminUser.email, password: adminUser.password })
        .then((res) => {
            // console.log(res.body, 'res.body');
            if (res.status !== 200) {
                throw new Error(
                    `Failed to sign in a admin. Status: ${res.status}, Body: ${JSON.stringify(
                        res.body
                    )}`
                );
            }
            return res;
        })
        .catch((err) => {
            console.error('Error during admin sign-in:', err);
            throw err;
        });
    // console.log(res.body);
    return res.body.data.token;
};

export { adminUser, createAdmin };
