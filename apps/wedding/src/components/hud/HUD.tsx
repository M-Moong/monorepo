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
    const el = containerRef.current?.querySelector<HTMLElement>(`[data-ch="${i}"]`);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* HUD 바 */}
      <div
        className="sticky top-0 z-50 flex items-center justify-between px-3.5 pt-3 pb-2.5 backdrop-blur-[8px]"
        style={{ background: 'var(--color-hud-gradient)' }}
      >
        {/* 챕터 번호 */}
        <div className="text-[0.5625rem] tracking-[0.3rem] text-gold">
          CH. {String(chapter + 1).padStart(2, '0')} / {String(totalChapters).padStart(2, '0')}
        </div>

        {/* 도트 바 */}
        <div className="flex items-center gap-1">
          {Array.from({ length: totalChapters }).map((_, i) => (
            <button
              key={i}
              onClick={() => jumpTo(i)}
              className="h-[1.5px] w-3 cursor-pointer border-0 p-0 transition-[background] duration-300"
              style={{
                background: i <= chapter ? 'var(--color-gold)' : 'var(--color-dot-inactive)',
              }}
            />
          ))}
        </div>

        {/* BGM 토글 */}
        <button
          onClick={onToggleSound}
          className={`cursor-pointer px-[0.5625rem] py-1 text-[0.5625rem] tracking-[0.2rem] transition-all duration-200 ${
            sound
              ? 'border border-gold bg-gold text-bg'
              : 'border border-fg/30 bg-transparent text-fg'
          }`}
        >
          {sound ? '♪ ON' : '♪ OFF'}
        </button>
      </div>

      {/* Progress bar */}
      <div className="sticky top-9 z-[49] h-px bg-fg/6">
        <div
          className="h-full bg-gold transition-[width] duration-150"
          style={{ width: `${progressPct * 100}%` }}
        />
      </div>
    </>
  );
}
