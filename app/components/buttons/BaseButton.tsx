import React from 'react'

type baseButton = {
    children: React.ReactNode,
    onclick?: () => void,
    classname?: string
}

export default function BaseButton({ classname = "", children, onclick }: baseButton) {
    return (
        <button className={classname} onClick={onclick}>
            {children}
        </button>
    )
}
