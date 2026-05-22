interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

export function TabButton({ active, onClick, children, className = '' }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer border text-2xs tracking-[0.2rem] transition-all duration-200 ${
        active ? 'border-gold bg-gold text-bg' : 'border-fg/15 bg-transparent text-fg'
      } ${className}`}
    >
      {children}
    </button>
  );
}
