'use client';

import { useEffect, useRef, useState } from 'react';
import { ChapterSection } from '@/components/ui/ChapterSection';
import { ChHeader } from '@/components/ui/ChHeader';
import { PhotoFrame } from '@/components/ui/PhotoFrame';
import { Lightbox } from '@/components/ui/Lightbox';
import { WEDDING } from '@/data/wedding';

type Tone = 'warm' | 'cool' | 'sage' | 'paper' | 'mono' | 'blush' | 'sepia' | 'ink';

const BASE_TONES: Tone[] = [
  'mono',
  'sepia',
  'warm',
  'paper',
  'sage',
  'blush',
  'cool',
  'ink',
  'sepia',
];
// 그리드 + Lightbox 모두 15장
const ALL_TONES: Tone[] = Array.from({ length: 15 }, (_, i) => BASE_TONES[i % BASE_TONES.length]!);

export function Ch04Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [atTop, setAtTop] = useState(true);
  const [atBottom, setAtBottom] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const total = ALL_TONES.length;

  function handleScroll() {
    const el = gridRef.current;
    if (!el) return;
    setAtTop(el.scrollTop <= 2);
    setAtBottom(el.scrollTop + el.clientHeight >= el.scrollHeight - 2);
  }

  useEffect(() => {
    handleScroll();
  }, []);

  // 내부 스크롤 div가 wheel 이벤트를 직접 처리해서 snap 컨테이너로 버블링 차단
  function handleWheel(e: React.WheelEvent<HTMLDivElement>) {
    const el = gridRef.current;
    if (!el) return;
    const isAtTop = el.scrollTop === 0 && e.deltaY < 0;
    const isAtBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1 && e.deltaY > 0;
    if (!isAtTop && !isAtBottom) {
      e.stopPropagation();
    }
  }

  return (
    <ChapterSection chIndex={3} className="overflow-hidden">
      <ChHeader
        num={4}
        label="GALLERY"
        title={
          <>
            Frames
            <br />
            of us.
          </>
        }
      />

      <div className="relative">
        <div
          ref={gridRef}
          onWheel={handleWheel}
          onScroll={handleScroll}
          className="aspect-square overflow-y-auto overscroll-contain"
          style={{ scrollbarWidth: 'none' }}
        >
          <div className="grid grid-cols-3 gap-1">
            {ALL_TONES.map((tone, i) => (
              <div
                key={i}
                onClick={() => setLightboxIndex(i)}
                className="relative aspect-square cursor-pointer overflow-hidden"
              >
                <PhotoFrame label={String(i + 1).padStart(2, '0')} tone={tone} />
              </div>
            ))}
          </div>
        </div>

        {/* 최하단 도달 시 위쪽 페이드 */}
        {atBottom && (
          <div className="pointer-events-none absolute top-0 right-0 left-0 h-16 bg-gradient-to-b from-bg to-transparent" />
        )}

        {/* 최상단일 때 아래쪽 페이드 + MORE 힌트 */}
        {atTop && !atBottom && (
          <div className="pointer-events-none absolute right-0 bottom-0 left-0 flex h-16 items-end justify-center bg-gradient-to-t from-bg to-transparent pb-2">
            <span className="text-2xs tracking-[0.15rem] text-fg/40">MORE ↓</span>
          </div>
        )}
      </div>

      <div className="mt-3.5 text-center text-2xs tracking-[0.2rem] text-fg/40">
        TAP ANY FRAME TO ENLARGE · {total} PHOTOS
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          index={lightboxIndex}
          total={total}
          tones={ALL_TONES}
          photos={WEDDING.photos}
          onClose={() => setLightboxIndex(null)}
          onJump={setLightboxIndex}
        />
      )}
    </ChapterSection>
  );
}
