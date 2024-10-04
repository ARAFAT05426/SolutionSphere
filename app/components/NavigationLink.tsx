import Link from 'next/link';
import { usePathname } from 'next/navigation';
import navLinkProps from '../types/navLinkProps';


export default function NavigationLink({ title, path }: navLinkProps) {
    const currentPath = usePathname();

    return (
        <Link
            href={path}
            className={`relative text-lg overflow-hidden group transition-colors duration-300 
                ${currentPath === path ? 'text-primary font-bold' : 'text-gray-600'}`}
        >
            {/* Link title */}
            {title}

            {/* Underline animation */}
            <span
                className={`absolute bottom-1 left-0 h-[1.7px] w-full rounded-xl 
                    bg-black origin-bottom-right 
                    ${currentPath === path ? 'scale-x-100 bg-primary' : 'scale-x-0'} 
                    transition-transform duration-300 ease-in-out 
                    group-hover:scale-x-100 group-hover:origin-bottom-left`}
            />
        </Link>
    );
}
