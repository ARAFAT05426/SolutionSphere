import Image from 'next/image';
import { useState, useEffect } from 'react';
import NavToggle from './buttons/NavToggle';
import navigationLinks from '../static/navlinks';
import ActionButton from './buttons/ActionButton';
import Link from 'next/link';
import NavigationLink from './NavigationLink';

export default function Navbar({ onJoinUsClick }: { onJoinUsClick: () => void }) {
    const [isActive, setIsActive] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false); // State to manage scroll effect

    const toggleMobileMenu = () => setIsActive((prev) => !prev);

    const closeMobileMenu = () => setIsActive(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup event listener on component unmount
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <nav className={`fixed inset-x-0 top-0 z-50 w-full px-5 py-3.5 transition-all duration-300 ${isScrolled ? 'bg-white/25 backdrop-blur-lg shadow' : 'bg-transparent'}`}>
                <div className="container flex items-center justify-between my-auto">
                    {/* Logo */}
                    <Link href={'/'}>
                        <Image
                            src={'/logo-light.png'}
                            alt="Company Logo"
                            width={200}
                            height={100}
                            loading="lazy"
                        />
                    </Link>

                    {/* Navigation Links for Larger Screens */}
                    <div className="hidden xl:flex items-center gap-2.5">
                        {navigationLinks.map((navLink, index) => (
                            <NavigationLink key={index} path={navLink.path} title={navLink.title} />
                        ))}
                    </div>

                    {/* Mobile Menu Toggle Button */}
                    <NavToggle
                        isActive={isActive}
                        toggleActive={toggleMobileMenu}
                        classname="flex xl:hidden z-50"
                    />

                    {/* Call-to-Action Button */}
                    <ActionButton
                        classname="hidden xl:inline"
                        onclick={onJoinUsClick}
                    >
                        Join Us
                    </ActionButton>
                </div>
            </nav>

            {/* Navigation Links for Smaller Screens */}
            <div className={`fixed inset-0 z-40 flex items-center justify-center xl:hidden transition-all duration-300 ease-in-out ${isActive ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={closeMobileMenu}>
                <div className={`max-w-xs w-full min-h-96 flex flex-col items-center justify-center gap-2.5 rounded-lg bg-white/25 backdrop-blur-lg transition-all duration-300 ease-in-out transform ${isActive ? 'scale-100 opacity-100' : 'scale-50 opacity-0 invisible'}`} onClick={(e) => e.stopPropagation()}>
                    {navigationLinks.map((navLink, index) => (
                        <NavigationLink key={index} path={navLink.path} title={navLink.title} />
                    ))}
                </div>
            </div>
        </>
    );
}
