import { ReactNode } from 'react';

interface ChapterSectionProps {
  chIndex: number;
  children: ReactNode;
  className?: string;
  /** slide 그룹 안에서 쓸 때 true — h-dvh + shrink-0으로 고정 */
  inSlideGroup?: boolean;
  /** true면 scroll-snap에서 제외 (콘텐츠 길이가 가변인 챕터용) */
  noSnap?: boolean;
}

export function ChapterSection({
  chIndex,
  children,
  className = '',
  inSlideGroup = false,
  noSnap = false,
}: ChapterSectionProps) {
  const sizeClass = inSlideGroup ? 'h-dvh w-full shrink-0' : 'h-dvh w-full overflow-y-auto';
  const alignClass = inSlideGroup ? 'justify-start' : 'justify-center';
  const snapClass = noSnap ? 'snap-none' : 'snap-start';

  return (
    <section
      data-ch={chIndex}
      className={`relative box-border flex flex-col px-5.5 pt-16 pb-12 ${alignClass} ${sizeClass} ${snapClass} ${className}`}
    >
      {children}
    </section>
  );
}
