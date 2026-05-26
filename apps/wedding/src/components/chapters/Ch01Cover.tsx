'use client';

import { ChapterSection } from '@/components/ui/ChapterSection';
import { useCountdown } from '@/hooks/useCountdown';
import { WEDDING } from '@/data/wedding';

export function Ch01Cover() {
  const cd = useCountdown(WEDDING.date);

  return (
    <ChapterSection chIndex={0} className="items-center">
      {/* gold glow 배경 */}
      <div className="cover-glow pointer-events-none absolute inset-0" />

      <div className="mb-7 animate-shimmer text-3xs tracking-[0.5rem] text-gold">
        ★ A LOVE STORY ★
      </div>

      {/* 대형 display */}
      <div className="flex flex-col items-center font-serif text-[5.5rem] leading-[0.85] font-light text-fg italic">
        <span>until</span>
        <span className="text-gold">we</span>
        <span>meet</span>
      </div>

      {/* D-Day */}
      <div className="text-md mt-2 tracking-[0.3rem] text-fg/50">{WEDDING.dateShort}</div>
      <div className="mt-7 flex flex-col items-center text-xl tabular-nums">
        <div className="text-lg tracking-[0.5rem] text-gold">D-{cd.d}</div>
        <div className="mt-1 flex gap-2 text-2xs tracking-[0.3rem] text-fg/60">
          <span>{cd.h}h</span>
          <span>{cd.m}m</span>
          <span>{String(cd.s).padStart(2, '0')}s</span>
        </div>
      </div>

      {/* 이름 */}
      <div className="mt-7 flex flex-col items-center font-serif text-2xl text-fg italic">
        <span>{WEDDING.groom.en}</span>
        <span className="my-1">♥</span>
        <span>{WEDDING.bride.en}</span>
      </div>

      {/* 스크롤 유도 화살표 */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 animate-bounce flex-col items-center text-fg/40">
        <div className="text-2xs tracking-[0.3rem]">SCROLL</div>
        <div className="mt-1">↓</div>
      </div>
    </ChapterSection>
  );
}
