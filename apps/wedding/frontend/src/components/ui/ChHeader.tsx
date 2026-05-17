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
      <div className="text-gold mb-[14px] text-[9px] tracking-[.4em]">
        CH. {numStr} · {label}
      </div>

      <div className="text-fg mb-[22px] font-serif text-[44px] font-light italic leading-[0.98]">
        {title}
      </div>
    </>
  );
}
