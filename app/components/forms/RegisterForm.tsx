import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import TextInput from '../inputFields/TextInput';
import axiosCommon from '@/utilities/axiosCommon';
import ActionButton from '../buttons/ActionButton';
import PasswordInput from '../inputFields/PasswordInput';

interface RegisterFormProps {
  handleToggle: () => void;
  closeModal: () => void | undefined;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ handleToggle, closeModal }) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const name = (e.currentTarget.elements.namedItem('name') as HTMLInputElement).value;
    const username = (e.currentTarget.elements.namedItem('username') as HTMLInputElement).value;
    const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
    const password = (e.currentTarget.elements.namedItem('password') as HTMLInputElement).value;

    try {
      const response = await axiosCommon.post('/register', {
        name: name,
        username: username,
        email: email,
        password: password,
      });


      if (e.currentTarget) {
        e.currentTarget.reset();
      }

      console.log('Registration Response:', response.data);
      closeModal();
      setError(null);
      router.push("/dashboard")
    } catch (error) {
      console.error('Registration Error:', error);
      setError('Registration failed. Please check your input and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col'>
      {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
      <form className='space-y-2.5 mb-2.5' onSubmit={handleRegister}>
        <TextInput name='name' placeholder='Your Name *' required />
        <TextInput name='username' placeholder='Username *' required />
        <TextInput name='email' placeholder='Email address *' type='email' required />
        <PasswordInput name='password' placeholder='Password *' required />
        <ActionButton type="submit" className='w-full' disabled={loading}>
          {loading ? 'Registering...' : 'Register'} {/* Show loading text while submitting */}
        </ActionButton>
      </form>
      <span className='text-center mt-2.5 text-xs'>
        Already a Member? <button className='underline' onClick={handleToggle}>Login Here.</button>
      </span>
    </div>
  );
}

export default RegisterForm;
