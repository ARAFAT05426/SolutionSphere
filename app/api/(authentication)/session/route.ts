import { verifyToken } from './../../../../utilities/verifyToken';
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest): Promise<NextResponse> {
    const cookie = req.cookies.get("token");


    if (!cookie || !cookie.value) {
        return NextResponse.json({ error: "Unauthorized access. Please log in." }, { status: 401 });
    }

    try {
        const token = cookie.value;

        const verifiedToken = verifyToken(token);

        const responseData = {
            success: true,
            message: "This is a response from the GET request",
            userData: verifiedToken,
        };
        return NextResponse.json(responseData, { status: 200 });

    } catch (error) {
        console.log(error);
        if (error instanceof Error && error.message === "Invalid token.") {
            return NextResponse.json({ error: "The provided token is invalid." }, { status: 403 });
        }
        console.error("Error processing request:", error);
        return NextResponse.json({ error: "An internal server error occurred. Please try again later." }, { status: 500 });
    }
}
