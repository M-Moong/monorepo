interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: 'filled' | 'outline';
}

export function TabButton({
  active,
  onClick,
  children,
  className = '',
  variant = 'filled',
}: TabButtonProps) {
  const activeClass =
    variant === 'outline' ? 'border-gold bg-transparent text-gold' : 'border-gold bg-gold text-bg';

  return (
    <button
      onClick={onClick}
      className={`cursor-pointer border text-2xs tracking-[0.2rem] transition-all duration-200 ${
        active ? activeClass : 'border-fg/15 bg-transparent text-fg'
      } ${className}`}
    >
      {children}
    </button>
  );
}
