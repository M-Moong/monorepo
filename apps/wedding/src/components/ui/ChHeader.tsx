import { ReactNode } from 'react';

interface ChHeaderProps {
  num?: number;
  label: string;
  title: ReactNode;
}

export function ChHeader({ label, title }: ChHeaderProps) {
  return (
    <>
      <div className="mb-3.5 text-[0.5625rem] tracking-[0.4rem] text-gold">
        {label}
      </div>

      <div className="mb-[1.375rem] font-serif text-[2.75rem] leading-[0.98] font-light text-fg italic">
        {title}
      </div>
    </>
  );
}
