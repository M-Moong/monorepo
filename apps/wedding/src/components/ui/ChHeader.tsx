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
      <div className="mb-3.5 text-[0.5625rem] tracking-[0.4rem] text-gold">
        CH. {numStr} · {label}
      </div>

      <div className="mb-[1.375rem] font-serif text-[2.75rem] leading-[0.98] font-light text-fg italic">
        {title}
      </div>
    </>
  );
}
