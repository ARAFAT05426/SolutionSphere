"use client";
import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import SidebarLink from './SidebarLink';
import NavToggle from '../buttons/NavToggle';
import { MdOutlineLogout } from 'react-icons/md';
import dashboardLinks from '@/app/static/dashboardLinks';
import { useAuth } from '@/app/contexts/AuthProvider';
import PrimaryLinkButton from '../buttons/PrimaryLinkButton ';
export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const { logout } = useAuth();

  return (
    <>
      {/* NavToggle Button for Mobile */}
      <div className='fixed inset-x-0 top-0 bg-black/25 backdrop-blur-md flex xl:hidden items-center justify-between p-2.5 z-40'>
        <Link href={'/'}>
          <Image src={`/logo-icon.png`} alt='logo icon' width={50} height={25} />
        </Link>
        <NavToggle
          classname='block xl:hidden'
          isActive={isSidebarOpen}
          toggleActive={setIsSidebarOpen}
          aria-label="Toggle sidebar"
        />
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-48 xs:w-52 sm:w-56 md:w-60 lg:w-64 py-10 flex flex-col justify-between bg-white/25 backdrop-blur-xl shadow-lg z-40 transition-transform duration-500 transform 
          ${isSidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-full xl:translate-x-0 opacity-0 xl:opacity-100'}`}
        style={{ transition: 'transform 500ms ease-in-out, opacity 500ms ease-in-out' }}
      >
        {/* Logo Section */}
        <Link href={'/'}>
          <Image className='mx-auto mt-2.5' src={`/logo-light.png`} alt='logo' width={150} height={75} />
        </Link>

        {/* Links Section */}
        <div className='flex flex-col items-center gap-2.5'>
          {dashboardLinks.map((dashboardLink, i) => (
            <SidebarLink
              key={i}
              title={dashboardLink.title}
              path={dashboardLink.path}
              Icon={dashboardLink.Icon}
              aria-label={dashboardLink.title}
            />
          ))}
        </div>

        {/* "Upgrade to Pro" Section */}
        <div className='space-y-1.5 flex flex-col items-center'>
          <div className='m-1.5 lg:m-2.5 bg-primary/75 flex flex-col items-center justify-center px-2 sm:px-3 lg:px-3.5 py-4 sm:py-6 lg:py-8 rounded-xl'>
            <p className='text-base sm:text-lg lg:text-xl text-white font-bold mb-1'>
              Upgrade to PRO
            </p>
            <p className='text-xs sm:text-sm lg:text-base text-center text-white/75 mb-2.5'>
              Improve your development process and start doing more with Horizon UI PRO!
            </p>
            <PrimaryLinkButton path='/' classname='rounded-md text-sm'>
              Become a PRO
            </PrimaryLinkButton>
          </div>

          {/* Logout Button */}
          <button
            onClick={logout}
            className='p-3.5 rounded-full text-black bg-gray-200 hover:bg-gray-300'
            aria-label="Logout"
          >
            <MdOutlineLogout size={20} />
          </button>
        </div>
      </aside>
    </>
  );
}
