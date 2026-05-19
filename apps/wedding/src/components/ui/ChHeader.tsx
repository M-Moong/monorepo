import { ReactNode } from "react";

interface ChHeaderProps {
  num: number;
  label: string;
  title: ReactNode;
}

export function ChHeader({ num, label, title }: ChHeaderProps) {
  const numStr = String(num).padStart(2, "0");
  return (
    <>
      <div className="mb-[14px] text-[9px] tracking-[.4em] text-gold">
        CH. {numStr} · {label}
      </div>

      <div className="mb-[22px] font-serif text-[44px] leading-[0.98] font-light text-fg italic">
        {title}
      </div>
    </>
  );
}
