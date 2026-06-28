import { ReactNode } from 'react';

interface ChapterSectionProps {
  chIndex: number;
  children: ReactNode;
  label?: string;
  title?: ReactNode;
  className?: string;
}

export function ChapterSection({
  chIndex,
  children,
  label,
  title,
  className = '',
}: ChapterSectionProps) {
  return (
    <section
      data-ch={chIndex}
      className={`relative box-border flex min-h-dvh w-full snap-start flex-col justify-center px-5 py-16 ${className}`}
    >
      {label && title && (
        <header className="mb-3 flex flex-col gap-1">
          <div className="font-sans-en text-3xs tracking-[0.2rem] text-gold">{label}</div>
          <div className="font-serif-en text-[2.75rem] leading-[0.98] font-light text-fg">
            {title}
          </div>
        </header>
      )}
      {children}
    </section>
  );
}
