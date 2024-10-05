import { NextRequest, NextResponse } from "next/server";
import User from '../../models/user.model';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import connectDB from "@/utilities/connectDB";
import { generateToken } from "@/utilities/generateToken";

dotenv.config();

export async function POST(req: NextRequest) {
    await connectDB();

    try {
        const body = await req.json();
        const { email, password } = body;

        // Validate input
        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: 'User does not exist' }, { status: 404 });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
        }

        // Generate token
        const token = generateToken({ email: user.email });

        // Create response with token
        const response = NextResponse.json({ message: 'Login successful', user: { email: user.email } }, { status: 200 });
        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60, // 1 week
            path: '/',
        });

        return response;

    } catch (error) {
        console.error('Error processing login request:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
