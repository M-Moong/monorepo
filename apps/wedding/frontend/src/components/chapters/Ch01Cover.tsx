'use client';

import { ChapterSection } from '@/components/ui/ChapterSection';
import { useCountdown } from '@/hooks/useCountdown';
import { WEDDING } from '@/data/wedding';

export function Ch01Cover() {
  const cd = useCountdown(WEDDING.date);

  return (
    <ChapterSection chIndex={0}>
      {/* gold glow 배경 */}
      <div className="cover-glow pointer-events-none absolute inset-0" />

      <div className="relative text-center">
        <div className="text-gold animate-shimmer mb-7 text-[9px] tracking-[.5em]">
          ★ A LOVE STORY ★
        </div>

        {/* 대형 display */}
        <div className="text-fg font-serif text-[88px] font-light italic leading-[0.85] tracking-[-0.02em]">
          {cd.isPast ? (
            <>
              we
              <br />
              <span className="text-gold">did</span>
              <br />
              meet
            </>
          ) : (
            <>
              until
              <br />
              <span className="text-gold">we</span>
              <br />
              meet
            </>
          )}
        </div>

        {/* D-Day */}
        <div className="text-fg/60 mt-7 text-[11px] tabular-nums tracking-[.3em]">
          {cd.isPast ? (
            <span className="text-gold text-[15px] tracking-[.2em]">MARRIED · 17.10.2026</span>
          ) : (
            <>
              <span className="text-gold text-[18px]">{cd.d}</span> DAYS · {cd.h}H {cd.m}M{' '}
              {String(cd.s).padStart(2, '0')}S
            </>
          )}
        </div>

        {/* 이름 */}
        <div className="text-fg mt-[30px] font-serif text-2xl italic">Minjun &amp; Seoyeon</div>

        <div className="text-fg/50 mt-2 text-[10px] tracking-[.3em]">17 · 10 · 2026</div>
      </div>

      {/* 스크롤 유도 화살표 */}
      <div className="text-fg/40 animate-drift absolute bottom-8 left-1/2 text-center">
        <div className="mb-1.5 text-[9px] tracking-[.3em]">SCROLL</div>
        <div className="bg-fg/40 mx-auto h-7 w-px" />
      </div>
    </ChapterSection>
  );
}
