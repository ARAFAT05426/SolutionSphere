import Link from "next/link";

type linkBtnProps = {
    children: React.ReactNode;
    path: string,
    classname?: string
};

export default function PrimaryLinkButton({ children, path = "", classname ="" }: linkBtnProps) {
    return (
        <Link href={path} className={`relative px-8 py-3.5 rounded-[1.25px] overflow-hidden bg-primary ${classname} font-bold group`}>
            <span className="absolute bottom-0 left-0 h-full w-full bg-black origin-bottom-right transition-transform duration-300 ease-in-out transform scale-x-0 group-hover:scale-x-100 group-hover:origin-bottom-left" />
            <strong className="relative z-10 text-white group-hover:scale-105 transition-all duration-300">{children}</strong>
        </Link>
    );
};
