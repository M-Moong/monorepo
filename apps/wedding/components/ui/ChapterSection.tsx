import { ReactNode } from 'react';

interface ChapterSectionProps {
  chIndex: number;
  children: ReactNode;
  className?: string;
  minHeightAuto?: boolean;
}

export function ChapterSection({ chIndex, children, className = '', minHeightAuto = false }: ChapterSectionProps) {
  return (
    <section
      data-ch={chIndex}
      className={`scroll-start relative flex flex-col justify-center px-[22px] pt-16 pb-12 box-border ${minHeightAuto ? '' : 'min-h-full'} ${className}`}
    >
      {children}
    </section>
  );
}
