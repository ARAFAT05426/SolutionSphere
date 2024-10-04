import React from 'react';

type TextInputProps = {
    placeholder?: string;
    type?: string;
    name: string;
    id?: string;
    defaultValue?: string;
    className?: string;
    required?: boolean
};

function TextInput({
    placeholder = 'Enter text',
    type = 'text',
    name,
    id,
    defaultValue,
    className = '',
    required = true
}: TextInputProps) {
    return (
        <input
            className={`w-full pl-5 py-2 border rounded-sm outline-none ${className}`}
            defaultValue={defaultValue}
            placeholder={placeholder}
            required={required}
            type={type}
            name={name}
            id={id}
        />
    );
}

export default TextInput;
