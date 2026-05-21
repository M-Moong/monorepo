'use client';

/**
 * SlideGroup
 *
 * 세로 스크롤 → PPT 가로 슬라이드 전환.
 *
 * 구조:
 *   outer  — 세로 스크롤 공간 확보 (count × 100dvh), overflow-hidden으로 클리핑
 *   track  — sticky top-0, 화면에 고정
 *   inner  — flex row, translateX(px)로 가로 이동
 *
 * translateX를 %가 아닌 px로 계산해 inner 너비 기준 오차 방지.
 */

import { useRef, useEffect, useState, ReactNode, Children } from 'react';

interface SlideGroupProps {
  count: number;
  children: ReactNode;
}

export function SlideGroup({ count, children }: SlideGroupProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [translatePx, setTranslatePx] = useState(0);

  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;

    const container = outer.closest<HTMLElement>('[data-scroll-container]');
    if (!container) return;

    const calc = () => {
      const outerTop = outer.offsetTop;
      const scrollTop = container.scrollTop;
      const slideW = container.clientWidth;
      const vh = container.clientHeight;
      const scrollable = (count - 1) * vh;
      const raw = scrollTop - outerTop;
      const progress = Math.min(1, Math.max(0, raw / scrollable));
      setTranslatePx(progress * (count - 1) * slideW);
    };

    container.addEventListener('scroll', calc, { passive: true });
    const rafId = requestAnimationFrame(calc);

    return () => {
      container.removeEventListener('scroll', calc);
      cancelAnimationFrame(rafId);
    };
  }, [count]);

  return (
    // outer: 세로 스크롤 공간 확보
    <div ref={outerRef} data-slide-group={count} className="relative" style={{ height: `calc(${count} * 100dvh)` }}>
      {/* 슬라이드마다 100dvh 간격으로 스냅 포인트 배치 */}
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="snap-start"
          style={{ position: 'absolute', top: `calc(${i} * 100dvh)`, height: '1px', width: '100%' }}
        />
      ))}
      {/* track: 화면 상단에 sticky 고정. overflow-hidden으로 옆 슬라이드 클리핑 */}
      <div className="sticky top-0 h-dvh overflow-hidden">
        {/* inner: 가로로 translateX 이동 */}
        <div
          className="flex h-full will-change-transform"
          style={{
            width: `calc(${count} * 100%)`,
            transform: `translateX(-${translatePx}px)`,
          }}
        >
          {/* 각 슬라이드를 1/count 너비로 강제 — children의 w-full이 inner 기준이 되는 걸 방지 */}
          {Children.map(children, (child) => (
            <div className="h-full" style={{ width: `${100 / count}%` }}>
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
