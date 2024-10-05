"use client"
import React, { useState } from 'react';
import BaseModal from './BaseModal';
import LoginForm from '../forms/LoginForm';
import RegisterForm from '../forms/RegisterForm';
import { useAuth } from '@/app/contexts/AuthProvider';


export default function AuthModal() {

    const { isAuthModalOpen, handleAuthModal } = useAuth()
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const handleToggle = () => {
        setIsLogin(!isLogin);
    };
    return (
        <BaseModal isOpen={isAuthModalOpen} onClose={() => handleAuthModal(false)}>
            <div className='w-fit mx-auto flex items-center gap-1.5 mb-2.5'>
                <button
                    className={`uppercase ${isLogin ? 'font-extrabold text-2xl' : ''}`}
                    onClick={() => setIsLogin(true)}
                >
                    Login
                </button>
                |
                <button
                    className={`uppercase ${!isLogin ? 'font-extrabold text-2xl' : ''}`}
                    onClick={() => setIsLogin(false)}
                >
                    Register
                </button>
            </div>
            {isLogin ? <LoginForm handleToggle={handleToggle} closeModal={() => handleAuthModal(false)} /> :
                <RegisterForm handleToggle={handleToggle} closeModal={() => handleAuthModal(false)} />}
        </BaseModal>
    );
}
