import React from 'react';

type navTogglerProps = { isAct: boolean, setAct: (value: boolean) => void, classname?: string }

export default function Navtoggler({ isAct, setAct, classname }: navTogglerProps) {
    return (
        <button
            onClick={() => setAct(!isAct)}
            className={`${classname} relative flex-col items-center justify-between h-6 w-8 group focus:outline-none overflow-hidden`}>
            {/* Top line */}
            <span
                className={`h-0.5 w-full rounded-2xl bg-black transition-all duration-500 ease-in-out transform origin-bottom-right 
                ${isAct ? 'rotate-[-43.5deg] bg-primary' : ''}`}
            />
            {/* Middle line (fades out when toggled) */}
            <span
                className={`h-0.5 w-full rounded-2xl bg-black transition-opacity duration-300 ease-in-out 
                ${isAct ? 'opacity-0' : 'opacity-100 '}`}
            />
            {/* Bottom line */}
            <span
                className={`h-0.5 w-full rounded-2xl bg-black transition-all duration-500 ease-in-out transform origin-top-right 
                ${isAct ? 'rotate-[43.5deg] bg-primary' : ''}`}
            />
        </button>
    );
}
