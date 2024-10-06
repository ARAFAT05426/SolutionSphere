import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

type TokenPayload = {
    email: string;
};

export const verifyToken = (token: string): TokenPayload => {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        console.error("JWT_SECRET is not defined in the environment variables.");
        throw new Error("env error: JWT_SECRET is missing");
    }
    if (!token) {
        throw new Error("Token is required for verification.");
    }

    try {
        const decoded = jwt.verify(token, secret) as TokenPayload;
        return { email: decoded?.email };
    } catch (error) {
        console.error("Error verifying token:", error);
        throw new Error("Invalid token.");
    }
};
