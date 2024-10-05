import React from 'react';
import Sidebar from '../components/dashboardComponents/Sidebar';

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>

            <div className="flex flex-col flex-1 w-full">
                <Sidebar />
                {/* Page Content */}
                <div className="">
                    {children}
                </div>
            </div>
        </>
    );
}
