'use client';

/**
 * SlideGroup
 *
 * 세로 스크롤을 가로 슬라이드 전환으로 변환하는 컴포넌트.
 *
 * 동작 원리:
 * - 외부 래퍼(outer)는 높이 = count × 100dvh 로 세로 스크롤 공간을 확보
 * - 내부 트랙(track)은 sticky top-0 으로 화면에 고정
 * - 스크롤 진행률(0→1)을 읽어 translateX(0 → -(count-1) × 100%)로 변환
 * - 결과: 사용자는 세로로 스크롤하지만 화면은 PPT처럼 가로로 전환됨
 */

import { useRef, useEffect, useState, ReactNode } from 'react';

interface SlideGroupProps {
  /** 포함된 슬라이드 수 */
  count: number;
  children: ReactNode;
}

export function SlideGroup({ count, children }: SlideGroupProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [offsetX, setOffsetX] = useState(0);

  useEffect(() => {
    // 스크롤 컨테이너: SlideGroup을 담고 있는 overflow-y-scroll 조상
    const container = outerRef.current?.closest<HTMLElement>('[data-scroll-container]');
    if (!container) return;

    const onScroll = () => {
      const outer = outerRef.current;
      if (!outer) return;

      // outer 상단이 컨테이너 뷰포트 기준으로 얼마나 올라왔는지
      const outerTop = outer.offsetTop;
      const scrollTop = container.scrollTop;
      const vh = container.clientHeight;

      // 슬라이더 구간 진입 전후를 0~1로 정규화
      const scrollable = (count - 1) * vh;
      const raw = scrollTop - outerTop;
      const progress = Math.min(1, Math.max(0, raw / scrollable));

      setOffsetX(progress * (count - 1) * 100);
    };

    container.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => container.removeEventListener('scroll', onScroll);
  }, [count]);

  return (
    // outer: 세로 스크롤 공간 확보 (count 슬라이드 × 1dvh씩)
    <div ref={outerRef} style={{ height: `calc(${count} * 100dvh)` }}>
      {/* track: 화면에 sticky 고정, 가로로 translateX 이동 */}
      <div className="sticky top-0 h-dvh overflow-hidden">
        <div
          className="flex h-full"
          style={{
            width: `calc(${count} * 100%)`,
            transform: `translateX(-${offsetX}%)`,
            // 스크롤 기반이라 transition 없음 — 스크롤 속도가 곧 애니메이션 속도
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
