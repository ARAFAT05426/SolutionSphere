import React from 'react';

type navToggleProps = {
    isActive: boolean;
    toggleActive: (value: boolean) => void;
    classname?: string;
};

export default function NavToggle({ isActive, toggleActive, classname }: navToggleProps) {
    return (
        <button
            onClick={() => toggleActive(!isActive)}
            className={`${classname} relative flex flex-col items-center justify-between h-6 w-8 group focus:outline-none overflow-hidden`}
            aria-label="Toggle navigation menu"
            role="button"
        >
            {/* Top line */}
            <span
                className={`h-0.5 w-full rounded-2xl bg-black transition-all duration-500 ease-in-out transform origin-bottom-right 
                ${isActive ? 'rotate-[-43.5deg] bg-primary' : ''}`}
            />
            {/* Middle line (fades out when toggled) */}
            <span
                className={`h-0.5 w-full rounded-2xl bg-black transition-opacity duration-300 ease-in-out 
                ${isActive ? 'opacity-0' : 'opacity-100 '}`}
            />
            {/* Bottom line */}
            <span
                className={`h-0.5 w-full rounded-2xl bg-black transition-all duration-500 ease-in-out transform origin-top-right 
                ${isActive ? 'rotate-[43.5deg] bg-primary' : ''}`}
            />
        </button>
    );
}
