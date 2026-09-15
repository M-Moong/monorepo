'use client';

import { memo, useEffect, useState } from 'react';
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

const HOUR_MS = 3_600_000;
const DAY_MS = 86_400_000;
const HOURLY_LIMIT_MS = 72 * HOUR_MS;

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
  const elapsedMs = Math.abs(cd.total);
  const isHourly = elapsedMs < HOURLY_LIMIT_MS;
  const elapsedCount = isHourly
    ? Math.floor(elapsedMs / HOUR_MS) + 1
    : Math.floor(elapsedMs / DAY_MS) + 1;
  const elapsedUnit = isHourly ? '시간차' : '일차';
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 20);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!visible) return;
    confetti({
      particleCount: 140,
      spread: 90,
      startVelocity: 45,
      origin: { y: 0.4 },
      colors: ['#e8c87c', '#ffffff', '#f4e4c1'],
    });
  }, [visible]);

  const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
    navigator.vibrate?.(30);
    confetti({
      particleCount: 60,
      spread: 70,
      startVelocity: 35,
      origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
      colors: ['#e8c87c', '#ffffff', '#f4e4c1'],
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
      <div
        className="pointer-events-none absolute inset-0 z-5"
        style={{
          background:
            'radial-gradient(circle at 50% 46%, color-mix(in srgb, var(--color-bg) 90%, transparent) 0%, color-mix(in srgb, var(--color-bg) 55%, transparent) 42%, transparent 72%)',
        }}
      />

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
          <span className="text-xl">결혼</span>
          <span className="inline-flex h-16 min-w-16 animate-glow items-center justify-center rounded-2xl px-3 text-5xl leading-none font-semibold tracking-normal tabular-nums">
            {elapsedCount}
          </span>
          <span className="text-xl">{elapsedUnit}</span>
        </div>
        <div className="mt-3 flex gap-4 text-sm tracking-[0.3rem] text-fg/60 *:flex *:items-center *:tracking-[0.1rem]">
          {!isHourly && (
            <span>
              <Counter value={cd.h} {...digitProps} />
              <span>h</span>
            </span>
          )}
          <span>
            <Counter value={cd.m} {...digitProps} />
            <span>m</span>
          </span>
          <span>
            <Counter value={cd.s} {...digitProps} />
            <span>s</span>
          </span>
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
