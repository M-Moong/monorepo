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
        className="sticky top-0 z-50 flex items-center justify-between px-[14px] pb-[10px] pt-3 backdrop-blur-[8px]"
        style={{ background: 'var(--color-hud-gradient)' }}
      >
        {/* 챕터 번호 */}
        <div className="text-gold text-[9px] tracking-[.3em]">
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
          className={`cursor-pointer px-[9px] py-1 text-[9px] tracking-[.2em] transition-all duration-200 ${
            sound
              ? 'bg-gold text-bg border-gold border'
              : 'text-fg border-fg/30 border bg-transparent'
          }`}
        >
          {sound ? '♪ ON' : '♪ OFF'}
        </button>
      </div>

      {/* Progress bar */}
      <div className="bg-fg/[.06] sticky top-9 z-[49] h-px">
        <div
          className="bg-gold h-full transition-[width] duration-150"
          style={{ width: `${progressPct * 100}%` }}
        />
      </div>
    </>
  );
}
