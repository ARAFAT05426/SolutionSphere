import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi'; // Importing eye icons from react-icons

type PasswordInputProps = {
    placeholder?: string;
    name: string;
    id?: string;
    defaultValue?: string;
    className?: string;
    required?: boolean
};

function PasswordInput({
    placeholder = 'Enter password',
    name,
    id,
    defaultValue,
    className = '',
    required
}: PasswordInputProps) {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div className={`relative w-full`}>
            <input
                className={`w-full pl-5 pr-10 py-2 border rounded-sm outline-none ${className}`}
                placeholder={placeholder}
                type={isVisible ? 'text' : 'password'}
                defaultValue={defaultValue}
                required={required}
                name={name}
                id={id}
            />
            <button
                type="button"
                onClick={toggleVisibility}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                aria-label={isVisible ? 'Hide password' : 'Show password'}
            >
                {isVisible ? <FiEyeOff className={`h-4 w-5`} /> : <FiEye className={`h-4 w-5`} />}
            </button>
        </div>
    );
}

export default PasswordInput;
