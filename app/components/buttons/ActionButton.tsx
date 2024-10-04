type functionalBtnPropsProps = {
    children: React.ReactNode,
    onclick?: () => void,
    classname?: string
}

export default function ActionButton({ children, onclick, classname = "" }: functionalBtnPropsProps) {
    return (
        <button
            onClick={onclick}
            className={`${classname} relative group bg-primary text-white text-lg px-8 py-2.5 rounded-sm overflow-hidden transition-all duration-300 ease-in-out`}>
            <strong className='relative z-10'>{children}</strong>
            <span className='absolute bottom-0 left-0 h-full w-full bg-black scale-y-100 origin-bottom group-hover:scale-y-0 transition-transform duration-300 ease-in-out' />
        </button>
    );
}
