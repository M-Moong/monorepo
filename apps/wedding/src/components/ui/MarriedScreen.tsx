'use client';

import { memo, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Counter } from '@repo/ui/reactbits/counter';
import { useCountdown } from '@/hooks/useCountdown';
import { WEDDING } from '@/data/wedding';
import { FloatingPhotos } from '@/components/ui/FloatingPhotos';

interface Props {
  onEnter: () => void;
  target?: Date;
}

const SECOND_MS = 1_000;
const MINUTE_MS = 60_000;
const HOUR_MS = 3_600_000;
const DAY_MS = 86_400_000;
const HOURLY_LIMIT_MS = 100 * HOUR_MS; // 99시간차까지 표시, 100시간부턴 절대 경과일수(일차)로 전환
const CONFETTI_COLORS = ['#e8c87c', '#ffffff', '#f4e4c1'];

const digitProps = {
  places: [10, 1] as number[],
  fontSize: 18,
  padding: 10,
  gap: 1,
  horizontalPadding: 1,
  gradientHeight: 0,
  digitStyle: { width: '1.15ch' },
};

// memo: MarriedScreen이 카운트다운 때문에 매초 리렌더돼도 이 힌트는 영향 안 받게.
const TapHint = memo(function TapHint() {
  return (
    <motion.div
      className="relative z-10 mt-4 font-sans-en text-xs tracking-[0.3rem] text-gold/80"
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
    >
      🎉 화면을 터치하면 폭죽이 터져요 🎉
    </motion.div>
  );
});

export function MarriedScreen({ onEnter, target = WEDDING.date }: Props) {
  const cd = useCountdown(target);
  const isFuture = !cd.isPast; // target이 아직 안 지났으면(결혼 전) D-day로 보여줌
  const dDayLabel = cd.d === 0 ? 'D-Day' : `D-${cd.d}`;
  const elapsedMs = Math.abs(cd.total);
  const isSecondly = elapsedMs < MINUTE_MS;
  const isMinutely = !isSecondly && elapsedMs < HOUR_MS;
  const isHourly = !isSecondly && !isMinutely && elapsedMs < HOURLY_LIMIT_MS;
  const isDaily = !isSecondly && !isMinutely && !isHourly;
  // 분/시간은 그 단계가 "시작되는 시점"부터 다시 1로 세어야 경계에서 숫자가 안 건너뜀
  // (예: 그냥 elapsedMs/unit로만 계산하면 59분차 다음이 곧장 2시간차로 튀는 문제가 있었음).
  // 일차는 반대로 절대 경과일수 — 며칠째인지를 나타내는 값이라 리셋하면 안 됨.
  const tierStartMs = isMinutely ? MINUTE_MS : HOUR_MS;
  const tierUnitMs = isMinutely ? MINUTE_MS : HOUR_MS;
  const elapsedCount = isSecondly
    ? Math.min(59, Math.floor(elapsedMs / SECOND_MS) + 1) // 59초차에서 멈췄다가 1분차로 전환
    : isDaily
      ? Math.floor(elapsedMs / DAY_MS) + 1
      : Math.floor((elapsedMs - tierStartMs) / tierUnitMs) + 1;
  const elapsedUnit = isSecondly ? '초차' : isMinutely ? '분차' : isHourly ? '시간차' : '일차';
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 20);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!visible || isFuture) return; // 결혼 전(D-day)이면 마운트 시 confetti 안 터뜨림
    confetti({
      particleCount: 140,
      spread: 90,
      startVelocity: 45,
      origin: { y: 0.4 },
      colors: CONFETTI_COLORS,
    });
  }, [visible, isFuture]);

  // 화면 켜져있는 동안 D-day에서 결혼 경과로 실시간 전환되는 순간 — 화려하게 여러 번 터뜨림.
  // useCountdown은 SSR 불일치 방지용으로 첫 렌더에서 항상 isPast=false로 시작했다가 마운트
  // 직후 보정되므로, cd.isPast로 초기화하면 이미 결혼식이 지난 상태로 들어와도 그 보정 순간을
  // "방금 전환됨"으로 오인해 매번 큰 confetti가 터짐 — target 자체로 실제 초기 상태를 계산함.
  const wasPastRef = useRef(target.getTime() < Date.now());
  useEffect(() => {
    if (!wasPastRef.current && cd.isPast) {
      const burst = (originX: number) =>
        confetti({
          particleCount: 160,
          spread: 100,
          startVelocity: 60,
          origin: { x: originX, y: 0.5 },
          colors: CONFETTI_COLORS,
        });
      burst(0.5); // 가운데
      setTimeout(() => burst(0.15), 500); // 왼쪽
      setTimeout(() => burst(0.85), 750); // 오른쪽
    }
    wasPastRef.current = cd.isPast;
  }, [cd.isPast]);

  const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
    navigator.vibrate?.(30);
    confetti({
      particleCount: 60,
      spread: 70,
      startVelocity: 35,
      origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
      colors: CONFETTI_COLORS,
    });
  };

  return (
    <div
      onClick={handleTap}
      className="fixed inset-0 z-100 flex flex-col items-center justify-center gap-2 overflow-hidden bg-bg px-6 text-center"
      style={{
        opacity: visible ? 1 : 0,
        filter: visible ? 'blur(0px)' : 'blur(12px)',
        transition: 'opacity 900ms ease, filter 900ms ease',
      }}
    >
      <FloatingPhotos />

      {/* 중앙 텍스트 영역을 사진이 침범하지 않도록 radial gradient로 부드럽게 가려줌 */}
      <div className="pointer-events-none absolute inset-0 z-5 bg-[radial-gradient(circle_at_50%_46%,color-mix(in_srgb,var(--color-bg)_90%,transparent)_0%,color-mix(in_srgb,var(--color-bg)_55%,transparent)_42%,transparent_72%)]" />

      <div className="relative z-10 font-serif-en text-7xl leading-none text-gold italic">
        Thank You
      </div>

      <div className="relative z-10 mt-6 text-base leading-relaxed tracking-[0.15rem] text-fg/70">
        결혼식에 와주셔서 감사합니다.
        <br />
        오래도록 행복하게 잘 살겠습니다.
      </div>

      <div className="relative z-10 mt-4 font-sans-en text-xs tracking-[0.4rem] text-fg/50">
        {WEDDING.groom.name} · {WEDDING.bride.name}
      </div>

      <div className="relative z-10 mt-8 flex flex-col items-center text-xl tabular-nums">
        <div className="flex items-center gap-1.5 tracking-[0.4rem] text-gold">
          {isFuture ? (
            <>
              <span className="text-xl">결혼까지</span>
              <span className="inline-flex h-16 min-w-16 animate-glow items-center justify-center rounded-2xl px-3 text-4xl leading-none font-semibold tracking-normal tabular-nums">
                {dDayLabel}
              </span>
            </>
          ) : (
            <>
              <span className="text-xl">결혼</span>
              <span className="inline-flex h-16 min-w-16 animate-glow items-center justify-center rounded-2xl px-3 text-5xl leading-none font-semibold tracking-normal tabular-nums">
                {elapsedCount}
              </span>
              <span className="text-xl">{elapsedUnit}</span>
            </>
          )}
        </div>
        <div className="mt-3 flex gap-4 text-sm tracking-[0.3rem] text-fg/60 *:flex *:items-center *:tracking-[0.1rem]">
          {/* 라벨(N초차/N분차/N시간차/N일차)이랑 겹치는 단위는 숨김 — 그 아래 단위만 살아서 째깍거림 */}
          {(isFuture || isDaily) && (
            <span>
              <Counter value={cd.h} {...digitProps} />
              <span>h</span>
            </span>
          )}
          {(isFuture || isDaily || isHourly) && (
            <span>
              <Counter value={cd.m} {...digitProps} />
              <span>m</span>
            </span>
          )}
          {(isFuture || !isSecondly) && (
            <span>
              <Counter value={cd.s} {...digitProps} />
              <span>s</span>
            </span>
          )}
        </div>
      </div>

      <motion.button
        onClick={(e) => {
          e.stopPropagation(); // 이 버튼은 confetti 안 터지게
          onEnter();
        }}
        whileTap={{ scale: 0.92 }}
        whileHover={{ scale: 1.04 }}
        className="relative z-10 mt-10 rounded-full border border-gold/50 px-7 py-2.5 text-sm tracking-[0.2rem] text-gold transition-colors hover:bg-gold/10 active:bg-gold/20"
      >
        청첩장 보러가기
      </motion.button>

      <TapHint />
    </div>
  );
}
