import React from 'react'

type TextAreaProps = {
    placeholder?: string;
    name: string;
    id?: string;
    defaultValue?: string;
    className?: string;
    required?: boolean;
    rows?: number;
    cols?: number;
};

export default function TextAreaInput({
    placeholder = 'Enter text',
    name,
    id,
    defaultValue,
    className = '',
    required = true,
    rows = 4,
    cols = 50
}: TextAreaProps) {
    return (
        <textarea
            className={`w-full pl-5 py-2 border rounded-sm outline-none ${className}`}
            defaultValue={defaultValue}
            placeholder={placeholder}
            required={required}
            name={name}
            id={id}
            rows={rows}
            cols={cols}
        />
    );
}
