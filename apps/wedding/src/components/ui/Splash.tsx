'use client';

import { useEffect, useRef, useState } from 'react';
import { WEDDING } from '@/data/wedding';

type Phase = 'enter' | 'hold' | 'opening' | 'done';

interface Props {
  onDone: () => void;
}

// 파티클 위치는 고정 (SSR 안전)
const PARTICLES = [
  { left: '48%', top: '30%', delay: '0s', dur: '2.2s' },
  { left: '52%', top: '45%', delay: '0.4s', dur: '1.8s' },
  { left: '49%', top: '60%', delay: '0.8s', dur: '2.5s' },
  { left: '51%', top: '25%', delay: '1.1s', dur: '2.0s' },
  { left: '47%', top: '50%', delay: '0.2s', dur: '1.9s' },
  { left: '53%', top: '38%', delay: '0.6s', dur: '2.3s' },
];

export function Splash({ onDone }: Props) {
  const [phase, setPhase] = useState<Phase>('enter');
  const doneRef = useRef(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const t1 = setTimeout(() => setPhase('hold'), 200);
    const t2 = setTimeout(() => setPhase('opening'), 2200);
    const t3 = setTimeout(() => {
      if (!doneRef.current) {
        doneRef.current = true;
        setPhase('done');
        document.body.style.overflow = '';
        onDone();
      }
    }, 3600);

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

  const panelTransition = isOpening ? 'transform 1200ms cubic-bezier(0.76, 0, 0.24, 1)' : 'none';

  return (
    <div
      className="fixed inset-0 z-[100] overflow-hidden"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 250ms ease',
      }}
    >
      {/* 뒤에서 퍼지는 골드 bloom (문 열릴 때) */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, color-mix(in srgb, #e8c87c 18%, transparent) 0%, transparent 70%)',
          opacity: isOpening ? 1 : 0,
          transition: 'opacity 800ms ease 200ms',
        }}
      />

      {/* 왼쪽 문 */}
      <div
        className="absolute top-0 left-0 z-10 flex h-full w-1/2 flex-col items-end justify-center"
        style={{
          background: 'var(--color-bg)',
          transform: isOpening ? 'translateX(-100%)' : 'translateX(0)',
          transition: panelTransition,
        }}
      >
        {/* 장식 수직선 */}
        <div
          className="absolute top-[15%] right-[28px] h-[30%] w-px"
          style={{
            background: 'color-mix(in srgb, var(--color-gold) 30%, transparent)',
          }}
        />
        <div
          className="absolute right-[28px] bottom-[15%] h-[30%] w-px"
          style={{
            background: 'color-mix(in srgb, var(--color-gold) 30%, transparent)',
          }}
        />

        <div className="flex flex-col items-end pr-4">
          <div
            className="font-serif text-[5.5rem] leading-none italic"
            style={{
              color: 'var(--color-gold)',
              textShadow: '0 0 40px color-mix(in srgb, var(--color-gold) 50%, transparent)',
              animation: isVisible && !isOpening ? 'glow 2.5s ease-in-out infinite' : 'none',
            }}
          >
            {WEDDING.groom.initial}
          </div>
          <div
            className="mt-3 text-right text-[0.625rem] tracking-[0.4rem]"
            style={{
              color: 'color-mix(in srgb, var(--color-fg) 55%, transparent)',
            }}
          >
            {WEDDING.groom.name}
          </div>
          <div
            className="mt-1 text-right text-[0.5rem] tracking-[0.25rem]"
            style={{
              color: 'color-mix(in srgb, var(--color-gold) 50%, transparent)',
            }}
          >
            GROOM
          </div>
        </div>

        {/* seam — 오른쪽 edge */}
        <div
          className="absolute top-0 right-0 h-full w-px"
          style={{
            background: 'var(--color-gold)',
            animation:
              isVisible && !isOpening ? 'splash-seam-glow 2s ease-in-out infinite' : 'none',
          }}
        />
      </div>

      {/* 오른쪽 문 */}
      <div
        className="absolute top-0 right-0 z-10 flex h-full w-1/2 flex-col items-start justify-center"
        style={{
          background: 'var(--color-bg)',
          transform: isOpening ? 'translateX(100%)' : 'translateX(0)',
          transition: panelTransition,
        }}
      >
        {/* 장식 수직선 */}
        <div
          className="absolute top-[15%] left-[28px] h-[30%] w-px"
          style={{
            background: 'color-mix(in srgb, var(--color-gold) 30%, transparent)',
          }}
        />
        <div
          className="absolute bottom-[15%] left-[28px] h-[30%] w-px"
          style={{
            background: 'color-mix(in srgb, var(--color-gold) 30%, transparent)',
          }}
        />

        <div className="flex flex-col items-start pl-4">
          <div
            className="font-serif text-[5.5rem] leading-none italic"
            style={{
              color: 'var(--color-gold)',
              textShadow: '0 0 40px color-mix(in srgb, var(--color-gold) 50%, transparent)',
              animation: isVisible && !isOpening ? 'glow 2.5s ease-in-out infinite 0.4s' : 'none',
            }}
          >
            {WEDDING.bride.initial}
          </div>
          <div
            className="mt-3 text-[0.625rem] tracking-[0.4rem]"
            style={{
              color: 'color-mix(in srgb, var(--color-fg) 55%, transparent)',
            }}
          >
            {WEDDING.bride.name}
          </div>
          <div
            className="mt-1 text-[0.5rem] tracking-[0.25rem]"
            style={{
              color: 'color-mix(in srgb, var(--color-gold) 50%, transparent)',
            }}
          >
            BRIDE
          </div>
        </div>

        {/* seam — 왼쪽 edge */}
        <div
          className="absolute top-0 left-0 h-full w-px"
          style={{
            background: 'var(--color-gold)',
            animation:
              isVisible && !isOpening ? 'splash-seam-glow 2s ease-in-out infinite 0.2s' : 'none',
          }}
        />
      </div>

      {/* 중앙 이니셜 오버레이 — 번잡해서 숨김 */}
      {/* <div ... /> */}

      {/* 파티클 (seam 근처) */}
      {isVisible &&
        !isOpening &&
        PARTICLES.map((p, i) => (
          <div
            key={i}
            className="pointer-events-none absolute z-20 h-[3px] w-[3px] rounded-full"
            style={{
              left: p.left,
              top: p.top,
              background: 'var(--color-gold)',
              animation: `splash-particle ${p.dur} ${p.delay} ease-out infinite`,
              opacity: 0,
            }}
          />
        ))}

      {/* 하단 날짜 + 장소 — 디자인 검토 중 */}
      {/* <div
        className="pointer-events-none absolute bottom-14 left-0 right-0 z-20 flex flex-col items-center gap-1.5"
        style={{
          opacity: isOpening ? 0 : isVisible ? 1 : 0,
          transition: isOpening ? 'opacity 250ms ease' : 'opacity 700ms ease 500ms',
        }}
      >
        <div className="text-[0.5rem] tracking-[0.6rem]">· {WEDDING.dateShort} ·</div>
        <div className="text-[0.5625rem] tracking-[0.35rem]">{WEDDING.venue.short}</div>
        <div className="mt-1 text-[0.4375rem] tracking-[0.5rem]">{WEDDING.timeText}</div>
      </div> */}
    </div>
  );
}
