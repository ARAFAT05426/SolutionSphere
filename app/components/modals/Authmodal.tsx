import React, { useState } from 'react';
import ActionButton from '../buttons/ActionButton';
import PasswordInput from '../inputFields/PasswordInput';
import TextInput from '../inputFields/TextInput';
import BaseModal from './BaseModal';

type authModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function AuthModal({ isOpen, onClose }: authModalProps) {
    const [isLogin, setIsLogin] = useState(true); // State to toggle between login and register forms

    const handleToggle = () => {
        setIsLogin(!isLogin);
    };

    const loginForm = (
        <div className='flex flex-col'>
            <form className='space-y-2.5 mb-2.5'>
                <TextInput name='username' placeholder='Username *' />
                <PasswordInput name='password' placeholder='Password *' />
            </form>
            <ActionButton>
                Login
            </ActionButton>
            <span className='text-center mt-2.5 text-xs'>Not a Member? <button className='underline' onClick={handleToggle}>Register Now.</button></span>
        </div>
    );

    const registerForm = (
        <div className='flex flex-col'>
            <form className='space-y-2.5 mb-2.5'>
                <TextInput name='username' placeholder='Username *' />
                <TextInput name='email' placeholder='Email address *' type='email' />
                <PasswordInput name='password' placeholder='Password *' />
            </form>
            <ActionButton>
                Register
            </ActionButton>
            <span className='text-center mt-2.5 text-xs'>Already a Member? <button className='underline' onClick={handleToggle}>Login Here.</button></span>
        </div>
    );

    return (
        <BaseModal isOpen={isOpen} onClose={onClose}>
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
            {isLogin ? loginForm : registerForm}
        </BaseModal>
    );
}
