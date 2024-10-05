import PasswordInput from '../inputFields/PasswordInput';
import ActionButton from '../buttons/ActionButton';
import TextInput from '../inputFields/TextInput';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useAuth } from '@/app/contexts/AuthProvider';

type LoginFormProps = {
  handleToggle: () => void;
  closeModal: () => void;
};

export default function LoginForm({ handleToggle, closeModal }: LoginFormProps) {
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
    const password = (e.currentTarget.elements.namedItem('password') as HTMLInputElement).value;

    try {
      await login({ email, password });
      closeModal();
      router.push("/dashboard");
    } catch (error) {
      console.error('Login Error:', error);
      alert('Login failed. Please check your email and password.');
    }
  };

  return (
    <div className='flex flex-col'>
      <form className='space-y-2.5 mb-2.5' onSubmit={handleLogin}>
        <TextInput name='email' placeholder='Email *' required />
        <PasswordInput name='password' placeholder='Password *' required />
        <ActionButton type="submit" className='w-full'>
          Login
        </ActionButton>
      </form>
      <span className='text-center mt-2.5 text-xs'>
        Not a Member? <button className='underline' onClick={handleToggle}>Register Now.</button>
      </span>
    </div>
  );
}
