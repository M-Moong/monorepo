import { ReactNode } from 'react';

interface ChapterSectionProps {
  chIndex: number;
  children: ReactNode;
  className?: string;
  minHeightAuto?: boolean;
}

export function ChapterSection({
  chIndex,
  children,
  className = '',
  minHeightAuto = false,
}: ChapterSectionProps) {
  return (
    <section
      data-ch={chIndex}
      className={`scroll-start relative box-border flex flex-col justify-center px-[22px] pb-12 pt-16 ${minHeightAuto ? '' : 'min-h-full'} ${className}`}
    >
      {children}
    </section>
  );
}
