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

    // SlideGroup outer 요소 탐색 (data-slide-group 속성 사용)
    const getSlideGroupInfo = () => {
      const sg = el.querySelector<HTMLElement>('[data-slide-group]');
      if (!sg) return null;
      return {
        offsetTop: sg.offsetTop,
        count: Number(sg.dataset.slideGroup),
        // 첫 번째 슬라이드의 data-ch 값
        firstCh: Number(sg.querySelector<HTMLElement>('[data-ch]')?.dataset.ch ?? 0),
      };
    };

    const calc = () => {
      const scrollTop = el.scrollTop;
      const vh = el.clientHeight;
      const totalScroll = el.scrollHeight - vh;
      const pct = scrollTop / Math.max(1, totalScroll);

      // 현재 어느 섹션이 화면 중앙에 있는지 scrollTop 기준으로 계산
      const sections = el.querySelectorAll<HTMLElement>('[data-ch]');
      const sg = getSlideGroupInfo();

      let currentCh = 0;

      if (sg) {
        const { offsetTop, count, firstCh } = sg;
        const slideGroupEnd = offsetTop + count * vh;

        if (scrollTop >= offsetTop - 2 && scrollTop < slideGroupEnd) {
          // 슬라이드 구간: scrollTop 진행률로 현재 슬라이드 인덱스 계산
          const raw = Math.max(0, scrollTop - offsetTop);
          const slideIndex = Math.min(count - 1, Math.floor(raw / vh));
          currentCh = firstCh + slideIndex;
        } else {
          // 일반 스크롤 구간: 화면 중앙에 가장 가까운 섹션 찾기
          const midY = scrollTop + vh / 2;
          let best: { ch: number; dist: number } | null = null;

          sections.forEach((s) => {
            // 슬라이드 그룹 내 섹션은 제외
            if (s.closest('[data-slide-group]')) return;
            const top = s.offsetTop;
            const height = s.offsetHeight;
            const dist = Math.abs(top + height / 2 - midY);
            if (!best || dist < best.dist) {
              best = { ch: Number(s.dataset.ch), dist };
            }
          });

          if (best) currentCh = (best as { ch: number }).ch;
        }
      } else {
        // SlideGroup 없는 경우 fallback
        const midY = scrollTop + vh / 2;
        let best: { ch: number; dist: number } | null = null;
        sections.forEach((s) => {
          const top = s.offsetTop;
          const height = s.offsetHeight;
          const dist = Math.abs(top + height / 2 - midY);
          if (!best || dist < best.dist) {
            best = { ch: Number(s.dataset.ch), dist };
          }
        });
        if (best) currentCh = (best as { ch: number }).ch;
      }

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
