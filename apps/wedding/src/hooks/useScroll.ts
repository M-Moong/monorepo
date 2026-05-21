'use client';

import { useState, useEffect, RefObject } from 'react';

interface ScrollState {
  chapter: number;
  progressPct: number;
}

export function useScroll(containerRef: RefObject<HTMLElement | null>): ScrollState {
  const [state, setState] = useState<ScrollState>({ chapter: 0, progressPct: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // IntersectionObserver: 뷰포트 50% 이상 보이면 현재 챕터로 인식
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const ch = Number((entry.target as HTMLElement).dataset.ch);
            setState((prev) => ({ ...prev, chapter: ch }));
          }
        });
      },
      { root: el, threshold: 0.5 }
    );

    const sections = el.querySelectorAll<HTMLElement>('[data-ch]');
    sections.forEach((s) => observer.observe(s));

    // 진행률: 기존 scroll 이벤트 유지
    const onScroll = () => {
      const pct = el.scrollTop / Math.max(1, el.scrollHeight - el.clientHeight);
      setState((prev) => ({ ...prev, progressPct: Math.min(1, Math.max(0, pct)) }));
    };
    el.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      el.removeEventListener('scroll', onScroll);
    };
  }, [containerRef]);

  return state;
}
