import jwt, { JwtPayload } from 'jsonwebtoken';

interface TokenPayload extends JwtPayload {
    Id: string;
    userEmail: string;
}

const secretKey = process.env.teamwork_scretkey;

if (!secretKey) {
    throw new Error('teamwork_scretkey is not defined');
}

const Helper = {
    generateToken(id: string, email: string): string {
        return jwt.sign(
            {
                Id: id,
                userEmail: email,
            },
            secretKey,
            { expiresIn: '1d' }
        );
    },

    verifyToken(token: string): TokenPayload {
        const decoded = jwt.verify(token, secretKey);

        if (typeof decoded === 'string') {
            throw new Error('Invalid token payload');
        }

        return decoded as TokenPayload;
    },
};

export default Helper;
