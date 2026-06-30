export const FIND_USER_BY_EMAIL = 'SELECT * FROM users WHERE email = $1';

export const FIND_USER_ID_BY_EMAIL = 'SELECT id FROM users WHERE email = $1';

export const CREATE_USER = `
INSERT INTO users
(first_name, last_name, email, password, gender, job_role, department, address)
VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
RETURNING id, email, is_admin
`;

export const UPDATE_USER_ROLE =
    'UPDATE users SET is_admin = $1 WHERE email = $2 RETURNING id';
