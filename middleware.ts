import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Retrieve the token from cookies
    const token = request.cookies.get('token')?.value;

    // Check if the user has a token (authentication check)
    if (!token) {
        return NextResponse.redirect(new URL('/auth', request.url))
    }

    // If token exists, proceed to the requested page (dashboard)
    return NextResponse.next();
}

// Configuration to apply middleware to specific routes
export const config = {
    matcher: '/dashboard', // Apply this middleware only to the dashboard route
};
