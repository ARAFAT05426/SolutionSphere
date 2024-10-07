import Link from 'next/link';
import React from 'react';

interface DashboardHeaderProps {
    title: string;
    className?: string;
    children?: React.ReactNode
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title = '', className = '', children }) => {
    return (
        <div className={`w-full flex items-center justify-between pl-1.5 ${className}`}>
            <div className='flex flex-col gap-0.5'>
                <h1 className="text-2xl font-bold">{title}</h1>
                <h3 className="text-gray-600"><Link href={"/"} className='text-primary'>Dashboard</Link> {" > " + title}</h3>
            </div>
            {children}
        </div>
    );
};

export default DashboardHeader;
