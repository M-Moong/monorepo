'use client';

import { RefObject } from 'react';

interface HUDProps {
  chapter: number;
  progressPct: number;
  sound: boolean;
  totalChapters: number;
  containerRef: RefObject<HTMLElement | null>;
  onToggleSound: () => void;
}

export function HUD({
  chapter,
  progressPct,
  sound,
  totalChapters,
  containerRef,
  onToggleSound,
}: HUDProps) {
  const jumpTo = (i: number) => {
    const container = containerRef.current;
    if (!container) return;
    const el = container.querySelector<HTMLElement>(`[data-ch="${i}"]`);
    if (!el) return;
    container.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
  };

  return (
    <>
      {/* HUD 바 */}
      <div
        className="flex items-center justify-between px-3.5 pt-3 pb-2.5 backdrop-blur"
        style={{ background: 'var(--color-hud-gradient)' }}
      >
        {/* 챕터 번호 */}
        <div className="text-2xs tracking-[0.3rem] text-gold">
          CH. {String(chapter + 1).padStart(2, '0')} / {String(totalChapters).padStart(2, '0')}
        </div>

        {/* 도트 바 */}
        <div className="flex items-center gap-1">
          {Array.from({ length: totalChapters }).map((_, i) => (
            <button
              key={i}
              onClick={() => jumpTo(i)}
              className="flex cursor-pointer items-center border-0 bg-transparent px-0 py-2"
            >
              <span
                className="block h-[2px] w-4 transition-[background] duration-300"
                style={{
                  background: i <= chapter ? 'var(--color-gold)' : 'var(--color-dot-inactive)',
                }}
              />
            </button>
          ))}
        </div>

        {/* BGM 토글 */}
        <button
          onClick={onToggleSound}
          className={`cursor-pointer px-2.25 py-1 text-2xs tracking-[0.2rem] transition-all duration-200 ${
            sound
              ? 'border border-gold bg-gold text-bg'
              : 'border border-fg/30 bg-transparent text-fg'
          }`}
        >
          {sound ? '♪ ON' : '♪ OFF'}
        </button>
      </div>

      {/* Progress bar */}
      <div className="h-px bg-fg/6">
        <div
          className="h-full bg-gold transition-[width] duration-150"
          style={{ width: `${progressPct * 100}%` }}
        />
      </div>
    </>
  );
}
