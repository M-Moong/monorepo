'use client';

import { Counter } from '@repo/ui/reactbits/counter';
import { ChapterSection } from '@/components/ui/ChapterSection';
import { useCountdown } from '@/hooks/useCountdown';
import { WEDDING } from '@/data/wedding';
import { cn } from '@repo/ui/lib/utils';

export function Ch01Cover() {
  const cd = useCountdown(WEDDING.date);
  const dayMs = 86_400_000;
  const dDayLabel = cd.isPast
    ? `D+${Math.max(1, Math.ceil(Math.abs(cd.total) / dayMs))}`
    : cd.d === 0
      ? 'D-Day'
      : `D-${cd.d}`;

  return (
    <ChapterSection chIndex={0} className="items-center">
      {/* gold glow 배경 */}
      <div className="cover-glow pointer-events-none absolute inset-0" />

      <div className="mb-3 animate-shimmer font-sans-en text-3xs tracking-[0.5rem] text-gold motion-reduce:animate-none">
        ★ LOVE STORY ★
      </div>

      {/* 대형 display */}
      <h1 className="flex flex-col items-center font-serif-en text-8xl leading-[0.85] font-light text-fg italic">
        <span>until</span>
        <span className="text-gold">we</span>
        <span>meet</span>
      </h1>

      {/* D-Day */}
      <div className="mt-2 text-base tracking-[0.3rem] text-fg/50">{WEDDING.dateShort}</div>
      <div className="mt-2 flex flex-col items-center text-xl tabular-nums">
        <div className="text-lg tracking-[0.5rem] text-gold">{dDayLabel}</div>
        <div
          className={cn(
            'mt-1 flex gap-4 text-xs tracking-[0.3rem] text-fg/60',
            '*:flex *:items-center *:tracking-[0.1rem]'
          )}
        >
          <span>
            <Counter
              value={cd.h}
              places={[10, 1]}
              fontSize={14}
              padding={10}
              gap={1}
              horizontalPadding={1}
              gradientHeight={0}
              digitStyle={{ width: '1.15ch' }}
            />
            <span>h</span>
          </span>

          <span>
            <Counter
              value={cd.m}
              places={[10, 1]}
              fontSize={14}
              padding={10}
              gap={1}
              horizontalPadding={1}
              gradientHeight={0}
              digitStyle={{ width: '1.15ch' }}
            />
            <span>m</span>
          </span>

          <span>
            <Counter
              value={cd.s}
              places={[10, 1]}
              fontSize={14}
              padding={10}
              gap={1}
              horizontalPadding={1}
              gradientHeight={0}
              digitStyle={{ width: '1.15ch' }}
            />
            <span>s</span>
          </span>
        </div>
      </div>

      {/* 이름 */}
      <div className="mt-3 flex flex-col items-center font-serif-en text-2xl text-fg">
        <span>{WEDDING.groom.en}</span>
        <span className="mt-1 text-gold">♥</span>
        <span>{WEDDING.bride.en}</span>
      </div>

      {/* 스크롤 유도 화살표 */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 animate-bounce flex-col items-center text-fg/40 motion-reduce:animate-none">
        <div className="mt-1">↓</div>
      </div>
    </ChapterSection>
  );
}
