import React from 'react';

type ActionButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean
};

export default function ActionButton({
  children,
  onClick,
  className = '',
  type = 'button',
  disabled = false
}: ActionButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${className} relative group bg-primary text-white text-lg px-8 py-2.5 rounded-sm overflow-hidden transition-all duration-300 ease-in-out`}
    >
      <strong className='relative z-10'>{children}</strong>
      <span className='absolute bottom-0 left-0 h-full w-full bg-black scale-y-100 origin-bottom group-hover:scale-y-0 transition-transform duration-300 ease-in-out' />
    </button>
  );
}
