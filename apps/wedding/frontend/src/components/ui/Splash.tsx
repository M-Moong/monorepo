'use client';

import { useEffect, useState } from 'react';
import { WEDDING } from '@/data/wedding';

type Phase = 'enter' | 'hold' | 'opening' | 'done';

interface Props {
  onDone: () => void;
}

export function Splash({ onDone }: Props) {
  const [phase, setPhase] = useState<Phase>('enter');

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // fade in → hold → open → done
    const t1 = setTimeout(() => setPhase('hold'), 300);
    const t2 = setTimeout(() => setPhase('opening'), 1800);
    const t3 = setTimeout(() => {
      setPhase('done');
      document.body.style.overflow = '';
      onDone();
    }, 3000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      document.body.style.overflow = '';
    };
  }, [onDone]);

  if (phase === 'done') return null;

  const isOpening = phase === 'opening';
  const isVisible = phase !== 'enter';

  return (
    <div
      className="fixed inset-0 z-[100] flex overflow-hidden"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 300ms ease',
      }}
    >
      {/* 왼쪽 문 */}
      <div
        className="bg-bg border-gold relative flex h-full w-1/2 flex-col items-end justify-center border-r pr-6"
        style={{
          transform: isOpening ? 'translateX(-100%)' : 'translateX(0)',
          transition: isOpening ? 'transform 1100ms cubic-bezier(0.76, 0, 0.24, 1)' : 'none',
        }}
      >
        <div className="text-gold font-serif text-[72px] italic leading-none">M</div>
        <div className="text-fg/60 mt-2 text-right text-[11px] tracking-[.25em]">
          {WEDDING.groom.name}
        </div>
      </div>

      {/* 오른쪽 문 */}
      <div
        className="bg-bg border-gold relative flex h-full w-1/2 flex-col items-start justify-center border-l pl-6"
        style={{
          transform: isOpening ? 'translateX(100%)' : 'translateX(0)',
          transition: isOpening ? 'transform 1100ms cubic-bezier(0.76, 0, 0.24, 1)' : 'none',
        }}
      >
        <div className="text-gold font-serif text-[72px] italic leading-none">S</div>
        <div className="text-fg/60 mt-2 text-[11px] tracking-[.25em]">{WEDDING.bride.name}</div>
      </div>

      {/* 가운데 날짜 (문 닫혔을 때만 표시) */}
      <div
        className="pointer-events-none absolute bottom-16 left-0 right-0 flex flex-col items-center gap-1"
        style={{
          opacity: isOpening ? 0 : 1,
          transition: 'opacity 300ms ease',
        }}
      >
        <div className="text-fg/40 text-[9px] tracking-[.5em]">· 17 · 10 · 2026 ·</div>
        <div className="text-gold text-[9px] tracking-[.3em]">{WEDDING.venue.short}</div>
      </div>
    </div>
  );
}
