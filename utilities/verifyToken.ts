import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

type TokenPayload = {
    email: string;
};

export function verifyToken(token: string): Promise<TokenPayload> {
    return new Promise((resolve, reject) => {
        const secret = process.env.JWT_SECRET;

        if (!secret) {
            console.error("JWT_SECRET is not defined in the environment variables.");
            return reject(new Error("env error: JWT_SECRET is missing"));
        }

        if (!token) {
            return reject(new Error("Token is required for verification."));
        }

        try {
            const decoded = jwt.verify(token, secret) as TokenPayload;
            resolve({ email: decoded?.email });
        } catch (error) {
            console.error("Error verifying token:", error);
            reject(new Error("Invalid token."));
        }
    });
}
