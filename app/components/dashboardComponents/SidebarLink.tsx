import dashboardLinkProps from "@/app/types/dashboardLinkProps";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function SidebarLink({ title, path, Icon }: dashboardLinkProps) {
    const pathname = usePathname()
    return (
        <Link href={path} className={`w-full flex items-center gap-2.5 px-10 py-3.5 border-r-[5px] 
        ${pathname === path ? "border-r-primary text-primary font-extrabold" : "font-semibold border-r-transparent"} rounded-sm transition-all duration-300 hover:text-primary `}>
            <Icon size={25} />
            {title}
        </Link>
    );
}
