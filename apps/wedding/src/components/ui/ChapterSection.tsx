import { ReactNode } from 'react';

interface ChapterSectionProps {
  chIndex: number;
  children: ReactNode;
  className?: string;
  /** 콘텐츠가 뷰포트보다 길어질 수 있는 챕터 — min-h-dvh로 늘어남 */
  autoHeight?: boolean;
  /** 콘텐츠가 화면을 넘을 수 있는 챕터 — autoHeight와 동일하게 min-h-dvh로 처리 */
  scrollable?: boolean;
}

export function ChapterSection({
  chIndex,
  children,
  className = '',
  autoHeight = false,
  scrollable = false,
}: ChapterSectionProps) {
  const sizeClass = autoHeight || scrollable ? 'min-h-dvh w-full' : 'h-dvh w-full';

  return (
    <section
      data-ch={chIndex}
      className={`relative box-border flex snap-start flex-col justify-center px-5 py-16 ${sizeClass} ${className}`}
    >
      {children}
    </section>
  );
}
