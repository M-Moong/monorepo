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

export function HUD({ chapter, progressPct, sound, totalChapters, containerRef, onToggleSound }: HUDProps) {
  const jumpTo = (i: number) => {
    const el = containerRef.current?.querySelector<HTMLElement>(`[data-ch="${i}"]`);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* HUD 바 */}
      <div
        className="sticky top-0 z-50 px-[14px] pt-3 pb-[10px] flex justify-between items-center backdrop-blur-[8px]"
        style={{ background: 'linear-gradient(180deg, rgba(10,10,10,.96) 0%, rgba(10,10,10,.6) 80%, transparent 100%)' }}
      >
        {/* 챕터 번호 */}
        <div className="text-[9px] tracking-[.3em] text-gold">
          CH. {String(chapter + 1).padStart(2, '0')} / {String(totalChapters).padStart(2, '0')}
        </div>

        {/* 도트 바 */}
        <div className="flex gap-1 items-center">
          {Array.from({ length: totalChapters }).map((_, i) => (
            <button
              key={i}
              onClick={() => jumpTo(i)}
              className="w-3 h-[1.5px] p-0 border-0 cursor-pointer transition-[background] duration-300"
              style={{ background: i <= chapter ? '#e8c87c' : 'rgba(240,232,216,.18)' }}
            />
          ))}
        </div>

        {/* BGM 토글 */}
        <button
          onClick={onToggleSound}
          className={`px-[9px] py-1 text-[9px] tracking-[.2em] cursor-pointer transition-all duration-200 ${
            sound
              ? 'bg-gold text-bg border border-gold'
              : 'bg-transparent text-fg border border-fg/30'
          }`}
        >
          {sound ? '♪ ON' : '♪ OFF'}
        </button>
      </div>

      {/* Progress bar */}
      <div className="sticky top-9 z-[49] h-px bg-fg/[.06]">
        <div
          className="h-full bg-gold transition-[width] duration-150"
          style={{ width: `${progressPct * 100}%` }}
        />
      </div>
    </>
  );
}
