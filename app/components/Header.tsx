"use client";
import Navbar from './Navbar';
import { usePathname } from 'next/navigation';

export default function Header() {
    const pathname = usePathname();

    if (pathname.includes('dashboard') || pathname.includes('auth')) {
        return null;
    }

    return (
        <>
            <header>
                <Navbar />
            </header>
        </>
    );
}
