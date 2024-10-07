import React from 'react';
import Sidebar from '../components/dashboardComponents/Sidebar';

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <>
        {/* Sidebar */}
        <Sidebar />

        {/* Page Content */}
        <div className="ml-60 px-10 py-5">
          {children}
        </div>
      </>
    </>
  );
}
