"use client";

type BaseModalProps = {
    isOpen: boolean;
    children: React.ReactNode;
    onClose: () => void;
    classname?: string
};

export default function BaseModal({ isOpen, children, onClose, classname }: BaseModalProps) {

    const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };
    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-md transition-all duration-300
                ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
            onClick={handleClickOutside}
        >
            <div
                className={`relative bg-primary-bg w-full ${classname ? classname : "max-w-xs md:max-w-screen-sm xl:max-w-md"} px-5 py-2.5 md:px-8 md:py-5 xl:px-10 xl:py-8 rounded 
                transition-all duration-300 ease-in-out ${isOpen ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}
            >
                {children}
            </div>
        </div>
    );
}
