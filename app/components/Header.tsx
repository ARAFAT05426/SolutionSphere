"use client"
import AuthModal from './modals/Authmodal';
import Navbar from './Navbar';
import { useState } from 'react';

export default function Header() {
    const [isAct, setIsAct] = useState(false);

    // Function to open the AuthModal
    const openAuthModal = () => {
        setIsAct(true);
    };

    return (
        <>
            <Navbar onJoinUsClick={openAuthModal} />
            <AuthModal isOpen={isAct} onClose={() => setIsAct(!isAct)} />
        </>
    );
}
