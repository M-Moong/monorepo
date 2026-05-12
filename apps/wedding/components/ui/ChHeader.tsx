import { ReactNode } from 'react';

interface ChHeaderProps {
  num: number;
  label: string;
  title: ReactNode;
}

export function ChHeader({ num, label, title }: ChHeaderProps) {
  const numStr = String(num).padStart(2, '0');
  return (
    <>
      <div className="text-[9px] tracking-[.4em] text-gold mb-[14px]">
        CH. {numStr} · {label}
      </div>
      <div className="font-serif text-[44px] italic leading-[0.98] mb-[22px] font-light text-fg">
        {title}
      </div>
    </>
  );
}
