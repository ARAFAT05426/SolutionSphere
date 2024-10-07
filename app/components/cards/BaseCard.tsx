import React from 'react';

interface baseCardProps {
    children: React.ReactNode;
    className?: string;
}

function BaseCard({ children, className = '' }: baseCardProps) {
    return (
        <div className={`relative group transition-all duration-500 ${className}`}>
            {children}
        </div>
    );
}

export default BaseCard;
