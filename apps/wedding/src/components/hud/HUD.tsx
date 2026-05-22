'use client';

import { RefObject, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const CHAPTER_NAMES = [
  'COVER',
  'INVITATION',
  'COUPLE',
  'GALLERY',
  'CALENDAR',
  'VENUE',
  'QUIZ',
  'GUESTBOOK',
  'FINALE',
];

// 도트 1개 너비(16px) + gap(4px), 버튼 padding 없음
const DOT_STEP = 20;

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
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirst = useRef(true);

  useEffect(() => {
    // 최초 마운트는 스킵
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(true);
    timerRef.current = setTimeout(() => setVisible(false), 500);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [chapter]);

  const jumpTo = (i: number) => {
    const container = containerRef.current;
    if (!container) return;
    const el = container.querySelector<HTMLElement>(`[data-ch="${i}"]`);
    if (!el) return;
    container.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
  };

  const chapterName = CHAPTER_NAMES[chapter] ?? `CH${chapter + 1}`;
  // 도트 바 왼쪽 끝 기준 활성 도트 중앙 x 오프셋
  const dotCenterX = chapter * DOT_STEP + 8; // 8px = 도트 선 너비 절반

  return (
    <div className="relative">
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
        <div className="relative flex items-center gap-1" id="hud-dot-bar">
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

          {/* 말풍선 — 도트 바 기준 absolute, backdrop-blur 없음 */}
          <AnimatePresence>
            {visible && (
              <motion.div
                key={chapter}
                className="pointer-events-none absolute top-full mt-2 -translate-x-1/2 rounded-full border border-gold/30 bg-bg px-2.5 py-px"
                style={{ left: dotCenterX }}
                initial={{ opacity: 0, y: -10, scaleX: 0.4, scaleY: 0.3, originX: '50%', originY: 0 }}
                animate={{ opacity: 1, y: 0, scaleX: 1, scaleY: 1 }}
                exit={{ opacity: 0, y: 4, transition: { duration: 0.25, ease: 'easeIn' } }}
                transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <span
                  className="absolute bottom-full left-1/2 -translate-x-1/2 border-x-[3px] border-b-[4px] border-x-transparent"
                  style={{ borderBottomColor: 'rgba(232,200,124,0.3)' }}
                />
                <span className="whitespace-nowrap text-[7px] tracking-[0.15rem] text-gold/80">
                  {chapterName}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
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
    </div>
  );
}
