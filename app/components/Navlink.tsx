"use client";
import navLinkProp from '../types/navlinkProp';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navlink({ title, path }: navLinkProp) {
    const pathname = usePathname();

    return (
        <Link
            href={path}
            className={`relative text-lg overflow-hidden group transition-colors duration-300 
                ${pathname === path ? 'text-primary/75 font-bold' : 'text-gray-600'} `} // Use your primary color class here
        >
            {title}
            <span
                className={`absolute bottom-1 left-0 h-[1.7px] w-full rounded-xl 
                    bg-black origin-bottom-right 
                    ${pathname === path ? "scale-x-100 bg-primary/75" : "scale-x-0"} 
                    transition-transform duration-300 ease-in-out 
                    group-hover:scale-x-100 group-hover:origin-bottom-left`}
            />
        </Link>
    );
}