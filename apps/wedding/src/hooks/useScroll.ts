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

    const calc = () => {
      const scrollTop = el.scrollTop;
      const vh = el.clientHeight;
      const totalScroll = el.scrollHeight - vh;
      const pct = scrollTop / Math.max(1, totalScroll);

      let currentCh = 0;

      // SlideGroup 구간 처리
      const sg = el.querySelector<HTMLElement>('[data-slide-group]');
      if (sg) {
        const sgTop = sg.offsetTop;
        const count = Number(sg.dataset.slideGroup);
        const sgEnd = sgTop + count * vh;
        const firstCh = Number(sg.querySelector<HTMLElement>('[data-ch]')?.dataset.ch ?? 0);

        if (scrollTop >= sgTop - 2 && scrollTop < sgEnd) {
          const slideIndex = Math.min(count - 1, Math.floor((scrollTop - sgTop) / vh));
          setState({ chapter: firstCh + slideIndex, progressPct: Math.min(1, Math.max(0, pct)) });
          return;
        }
      }

      // 일반 스크롤 구간: SlideGroup 바깥 섹션 중 화면 상단에서 가장 가까운 챕터
      const sections = el.querySelectorAll<HTMLElement>('[data-ch]');
      sections.forEach((s) => {
        if (s.closest('[data-slide-group]')) return;
        if (s.offsetTop <= scrollTop + vh / 2) {
          currentCh = Number(s.dataset.ch);
        }
      });

      setState({ chapter: currentCh, progressPct: Math.min(1, Math.max(0, pct)) });
    };

    el.addEventListener('scroll', calc, { passive: true });
    // 초기 계산
    calc();

    return () => {
      el.removeEventListener('scroll', calc);
    };
  }, [containerRef]);

  return state;
}
