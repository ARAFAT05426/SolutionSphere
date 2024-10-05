import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secret = process.env.JWT_SECRET;

if (!secret) {
    console.error("JWT_SECRET is not defined in the environment variables.");
    throw new Error("env error: JWT_SECRET is missing");
}
interface UserInfo {
    email: string;
}

export const generateToken = (
    userInfo: UserInfo,
): string => {
    if (!userInfo || typeof userInfo !== 'object') {
        throw new Error("Invalid user information provided.");
    }

    try {
        const token = jwt.sign({ ...userInfo }, secret, {
            expiresIn: '7d',
        });
        return token;
    } catch (error) {
        console.error("Error generating token:", error);
        throw new Error("Failed to generate token.");
    }
};
