import { ReactNode } from 'react';

interface ChapterSectionProps {
  chIndex: number;
  children: ReactNode;
  className?: string;
  /** 콘텐츠가 뷰포트보다 길어질 수 있는 챕터 — min-h-dvh로 늘어남 */
  autoHeight?: boolean;
  /** 콘텐츠가 넘칠 수 있는 챕터 — 섹션 자체가 overflow-y-auto로 스크롤됨 */
  scrollable?: boolean;
}

export function ChapterSection({
  chIndex,
  children,
  className = '',
  autoHeight = false,
  scrollable = false,
}: ChapterSectionProps) {
  const sizeClass = autoHeight ? 'min-h-dvh w-full' : 'h-dvh w-full';
  const overflowClass = scrollable ? 'overflow-y-auto' : '';

  return (
    <section
      data-ch={chIndex}
      className={`relative box-border flex snap-start flex-col justify-center px-5 py-16 ${overflowClass} ${sizeClass} ${className}`}
    >
      {children}
    </section>
  );
}
