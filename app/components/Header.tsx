"use client"
import { usePathname } from 'next/navigation';
import AuthModal from './modals/Authmodal';
import Navbar from './Navbar';
import { useState } from 'react';

export default function Header() {
    const [isAct, setIsAct] = useState(false);
    const pathname = usePathname()
    // Function to open the AuthModal
    const openAuthModal = () => {
        setIsAct(true);
    };

    if (pathname.includes('dashboard')) {
        return null
    }

    return (
        <>
            <Navbar onJoinUsClick={openAuthModal} />
            <AuthModal isOpen={isAct} onClose={() => setIsAct(!isAct)} />
        </>
    );
}
