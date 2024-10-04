import React from 'react';

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>

            <div className="flex flex-col flex-1 w-full">
                <h1>Sidebar</h1>
                {/* Page Content */}
                <div className="">
                    {children}
                </div>
            </div>
        </>
    );
}
