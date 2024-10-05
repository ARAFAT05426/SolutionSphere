"use client";
import AuthModal from './modals/Authmodal';
import Navbar from './Navbar';
import { usePathname } from 'next/navigation';

export default function Header() {
    const pathname = usePathname();

    // Check if the pathname includes 'dashboard' or 'auth'
    if (pathname.includes('dashboard') || pathname.includes('auth')) {
        return null; // Don't render the header or AuthModal for these routes
    }

    return (
        <>
            <header>
                <Navbar />
            </header>
            <AuthModal />
        </>
    );
}
