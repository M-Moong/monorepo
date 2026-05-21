import { ReactNode } from 'react';

interface ChapterSectionProps {
  chIndex: number;
  children: ReactNode;
  className?: string;
  /** slide 그룹 안에서 쓸 때 true — h-dvh + shrink-0으로 고정 */
  inSlideGroup?: boolean;
}

export function ChapterSection({
  chIndex,
  children,
  className = '',
  inSlideGroup = false,
}: ChapterSectionProps) {
  const sizeClass = inSlideGroup
    ? 'h-dvh w-full shrink-0'
    : 'min-h-dvh w-full';

  // slide 그룹 안에서는 justify-start — 콘텐츠가 h-dvh를 넘으면 내부에서 처리
  const alignClass = inSlideGroup ? 'justify-start' : 'justify-center';

  return (
    <section
      data-ch={chIndex}
      className={`relative box-border flex flex-col px-5.5 pt-16 pb-12 ${alignClass} ${sizeClass} ${className}`}
    >
      {children}
    </section>
  );
}
