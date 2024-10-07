import connectDB from '@/utilities/connectDB';
import User from '../../models/user.model';
import { verifyToken } from './../../../../utilities/verifyToken';
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
    const cookie = req.cookies.get("token");
    await connectDB()

    if (!cookie || !cookie.value) {
        return NextResponse.json({ error: "Unauthorized access. Please log in." }, { status: 401 });
    }

    try {
        const token = cookie.value;

        // Verify the token
        const verifiedToken = await verifyToken(token);

        // Query the database for the user
        const user = await User.findOne({ email: verifiedToken.email });

        if (!user) {
            return NextResponse.json({ error: "User not found." }, { status: 404 });
        }

        // Construct response data
        const responseData = {
            success: true,
            message: "This is a response from the GET request",
            userData: user,
        };

        return NextResponse.json(responseData, { status: 200 });

    } catch (error) {
        console.error("Error processing request:", error);

        // Check for token-specific errors
        if (error instanceof Error && error.message === "Invalid token.") {
            return NextResponse.json({ error: "The provided token is invalid." }, { status: 403 });
        }

        // Generic error response
        return NextResponse.json({ error: "An internal server error occurred. Please try again later." }, { status: 500 });
    }
}
