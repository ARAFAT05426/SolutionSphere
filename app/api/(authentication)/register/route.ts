import { NextRequest, NextResponse } from "next/server";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import connectDB from "@/utilities/connectDB";
import User from "../../models/user.model";
import { generateToken } from "@/utilities/generateToken";

dotenv.config();

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const body = await req.json();
    const { name, username, email, password } = body;

    // Validate input
    if (!name || !email || !username || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
    });

    // Save the new user
    try {
      await newUser.save();
    } catch (saveError) {
      console.error('Error saving user to database:', saveError);
      return NextResponse.json({ error: 'Failed to create user in the database' }, { status: 500 });
    }

    // Generate a token
    const token = generateToken({ email });

    // Create the response
    const response = NextResponse.json({ message: 'User created successfully' }, { status: 201 });
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60, // 1 week
      path: '/',
    });

    return response;

  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
