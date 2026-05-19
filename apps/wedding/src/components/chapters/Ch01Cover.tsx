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
        <div className="mb-7 animate-shimmer text-[0.5625rem] tracking-[0.5rem] text-gold">
          ★ A LOVE STORY ★
        </div>

        {/* 대형 display */}
        <div className="font-serif text-[5.5rem] leading-[0.85] font-light tracking-[-0.02rem] text-fg italic">
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
        <div className="mt-7 text-[0.6875rem] tracking-[0.3rem] text-fg/60 tabular-nums">
          {cd.isPast ? (
            <span className="text-[0.9375rem] tracking-[0.2rem] text-gold">
              MARRIED · {WEDDING.dateShort}
            </span>
          ) : (
            <>
              <span className="text-lg text-gold">{cd.d}</span> DAYS · {cd.h}H {cd.m}M{' '}
              {String(cd.s).padStart(2, '0')}S
            </>
          )}
        </div>

        {/* 이름 */}
        <div className="mt-[1.875rem] font-serif text-2xl text-fg italic">
          {WEDDING.groom.en} &amp; {WEDDING.bride.en}
        </div>

        <div className="mt-2 text-[0.625rem] tracking-[0.3rem] text-fg/50">{WEDDING.dateShort}</div>
      </div>

      {/* 스크롤 유도 화살표 */}
      <div className="absolute bottom-8 left-1/2 animate-drift text-center text-fg/40">
        <div className="mb-1.5 text-[0.5625rem] tracking-[0.3rem]">SCROLL</div>
        <div className="mx-auto h-7 w-px bg-fg/40" />
      </div>
    </ChapterSection>
  );
}
