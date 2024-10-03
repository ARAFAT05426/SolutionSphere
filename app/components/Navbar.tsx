"use client";
import { useState } from 'react';
import Image from 'next/image';
import Navlink from './Navlink';
import navlinks from '../static/navlinks';
import FunctionalBtn from './buttons/FunctionalBtn';
import Navtoggler from './buttons/Navtoggler';

export default function Navbar() {
    const [isAct, setIsAct] = useState(false);

    return (
        <nav className='w-full h-16 px-5 py-2.5 bg-white shadow-md'>
            <div className='container flex items-center justify-between'>
                <Image src={'/logo-light.png'} alt='logo' width={200} height={100} loading='lazy' />

                {/* Large-device links */}
                <div className={`hidden xl:flex items-center flex-row gap-2.5`}>
                    {navlinks.map((navlink, i) => (
                        <Navlink key={i} path={navlink.path} title={navlink.title} />
                    ))}
                </div>

                {/* Mobile Menu Toggle */}
                <Navtoggler isAct={isAct} setAct={setIsAct} classname='flex xl:hidden z-50' />

                {/* Small-device Links */}
                <div className={`fixed inset-0 w-full h-full flex items-center justify-center xl:hidden transition-all duration-300 ease-in-out transform ${isAct ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                    <div className={`max-w-xs w-full min-h-96 flex flex-col items-center justify-center gap-2.5 rounded-lg bg-white/25 backdrop-blur-xl transition-all duration-300 ease-in-out transform ${isAct ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                        {navlinks.map((navlink, i) => (
                            <Navlink key={i} path={navlink.path} title={navlink.title} />
                        ))}
                    </div>
                </div>

                <FunctionalBtn classname='hidden xl:inline'>
                    Join Us
                </FunctionalBtn>
            </div>
        </nav>
    );
}
