import { ReactNode } from 'react';

interface ChapterSectionProps {
  chIndex: number;
  children: ReactNode;
  className?: string;
  /** slide 그룹 안에서 쓸 때 true — h-dvh + shrink-0으로 고정 */
  inSlideGroup?: boolean;
  /** 콘텐츠가 뷰포트보다 길어질 수 있는 챕터 — min-h-dvh로 늘어남 */
  autoHeight?: boolean;
  /** 콘텐츠가 넘칠 수 있는 챕터 — 섹션 자체가 overflow-y-auto로 스크롤됨 */
  scrollable?: boolean;
}

export function ChapterSection({
  chIndex,
  children,
  className = '',
  inSlideGroup = false,
  autoHeight = false,
  scrollable = false,
}: ChapterSectionProps) {
  const sizeClass = inSlideGroup
    ? 'h-dvh w-full shrink-0'
    : autoHeight
      ? 'min-h-dvh w-full'
      : 'h-dvh w-full';
  const alignClass = 'justify-center';
  const snapClass = 'snap-start';
  const overflowClass = scrollable ? 'overflow-y-auto' : '';

  return (
    <section
      data-ch={chIndex}
      className={`relative box-border flex flex-col px-5.5 pt-16 pb-12 ${alignClass} ${overflowClass} ${sizeClass} ${snapClass} ${className}`}
    >
      {children}
    </section>
  );
}
