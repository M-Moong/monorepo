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

    const onScroll = () => {
      const sections = el.querySelectorAll<HTMLElement>('[data-ch]');
      const top = el.scrollTop + 120;
      let cur = 0;
      sections.forEach((s) => {
        if (s.offsetTop <= top) cur = Number(s.dataset.ch);
      });
      const pct = el.scrollTop / Math.max(1, el.scrollHeight - el.clientHeight);
      setState({ chapter: cur, progressPct: Math.min(1, Math.max(0, pct)) });
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener('scroll', onScroll);
  }, [containerRef]);

  return state;
}
