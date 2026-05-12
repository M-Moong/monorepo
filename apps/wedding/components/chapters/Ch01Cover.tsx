'use client';

import { ChapterSection } from '@/components/ui/ChapterSection';
import { useCountdown } from '@/hooks/useCountdown';
import { WEDDING } from '@/data/wedding';

export function Ch01Cover() {
  const cd = useCountdown(WEDDING.date);

  return (
    <ChapterSection chIndex={0}>
      {/* gold glow 배경 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 65%, rgba(232,200,124,.20) 0%, transparent 55%)' }}
      />

      <div className="text-center relative">
        <div className="text-[9px] tracking-[.5em] text-gold mb-7 animate-shimmer">
          ★ A LOVE STORY ★
        </div>

        {/* 대형 display */}
        <div className="font-serif text-[88px] leading-[0.85] italic font-light tracking-[-0.02em] text-fg">
          until<br />
          <span className="text-gold">we</span><br />
          meet
        </div>

        {/* D-Day */}
        <div className="text-[11px] tracking-[.3em] text-fg/60 mt-7 tabular-nums">
          <span className="text-gold text-[18px]">{cd.d}</span>
          {' '}DAYS · {cd.h}H {cd.m}M{' '}
          {String(cd.s).padStart(2, '0')}S
        </div>

        {/* 이름 */}
        <div className="font-serif mt-[30px] text-2xl italic text-fg">
          Minjun &amp; Seoyeon
        </div>

        <div className="text-[10px] tracking-[.3em] text-fg/50 mt-2">
          17 · 10 · 2026
        </div>
      </div>

      {/* 스크롤 유도 화살표 */}
      <div className="absolute bottom-8 left-1/2 text-fg/40 text-center animate-drift">
        <div className="text-[9px] tracking-[.3em] mb-1.5">SCROLL</div>
        <div className="w-px h-7 bg-fg/40 mx-auto" />
      </div>
    </ChapterSection>
  );
}
