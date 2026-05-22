import { ButtonHTMLAttributes, ReactNode } from 'react';

interface GoldButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'ghost';
  children: ReactNode;
  fullWidth?: boolean;
}

export function GoldButton({
  variant = 'solid',
  children,
  fullWidth = false,
  className = '',
  ...props
}: GoldButtonProps) {
  const base = 'p-3.5 text-2xs tracking-[0.25rem] cursor-pointer outline-none border-0';
  const solid = 'bg-gold text-bg font-bold';
  const ghost = 'bg-transparent text-gold border border-gold';
  const width = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${base} ${variant === 'solid' ? solid : ghost} ${width} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
