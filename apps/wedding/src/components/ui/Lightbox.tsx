'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { PhotoFrame } from '@/components/ui/PhotoFrame';

type Tone = 'warm' | 'cool' | 'sage' | 'paper' | 'mono' | 'blush' | 'sepia' | 'ink';

interface LightboxProps {
  index: number;
  total: number;
  tones: Tone[];
  photos: readonly string[];
  onClose: () => void;
  onJump: (index: number) => void;
}

const THUMB_SIZE = 64;
const THUMB_GAP = 8;
const THUMB_UNIT = THUMB_SIZE + THUMB_GAP;

export function Lightbox({ index, total, tones, photos, onClose, onJump }: LightboxProps) {
  const [direction, setDirection] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(index);
  // 양 끝 썸네일도 중앙에 올 수 있도록 스트립 너비 기반 패딩
  const [sidePad, setSidePad] = useState(120);
  const stripRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  // 라이트박스 열려있는 동안 뒤 배경 스크롤 방지
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // 마운트 시 스트립 너비 측정 → sidePad 설정
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    setSidePad(strip.clientWidth / 2 - THUMB_SIZE / 2);
  }, []);

  // 활성 썸네일이 항상 스트립 중앙에 오도록 스크롤
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    strip.scrollTo({ left: index * THUMB_UNIT, behavior: 'smooth' });
  }, [index]);

  function goTo(nextIndex: number, dir: number) {
    const wrapped = ((nextIndex % total) + total) % total;
    setDirection(dir);
    setDisplayIndex(wrapped);
    onJump(wrapped);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goTo(index - 1, -1);
      if (e.key === 'ArrowRight') goTo(index + 1, 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, onClose]);

  const gridIndex = (i: number) => i % photos.length || 0;
  const hasRealPhoto = (i: number) => {
    const src = photos[gridIndex(i)];
    return src && !src.includes('placeholder');
  };

  const variants = {
    enter: (dir: number) => ({ scale: dir !== 0 ? 0.85 : 1, opacity: 0 }),
    center: { scale: 1, opacity: 1 },
    exit: { scale: 0.85, opacity: 0 },
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] flex flex-col bg-bg/97">
      {/* 상단 닫기 */}
      <div className="flex shrink-0 items-center justify-end px-5 pt-5">
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className="flex cursor-pointer items-center gap-1.5 rounded-full border border-fg/20 px-3 py-1.5 text-fg/90 backdrop-blur-sm transition-colors hover:border-fg/50 hover:text-fg"
        >
          <span className="text-2xs tracking-[0.2rem]">CLOSE</span>
          <X size={14} strokeWidth={1.5} />
        </motion.button>
      </div>

      {/* 메인 이미지 */}
      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-5">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={displayIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.32, ease: [0.32, 0, 0.67, 0] }}
            className="aspect-[3/4] max-h-[78%] max-w-[85%]"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragStart={() => {
              isDragging.current = true;
            }}
            onDragEnd={(_, info) => {
              if (!isDragging.current) return;
              isDragging.current = false;
              if (info.offset.x < -50) goTo(index + 1, 1);
              else if (info.offset.x > 50) goTo(index - 1, -1);
            }}
          >
            {hasRealPhoto(displayIndex) ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={photos[gridIndex(displayIndex)]}
                alt={`photo ${displayIndex + 1}`}
                className="h-full w-full object-cover"
                draggable={false}
              />
            ) : (
              <PhotoFrame
                label={String(displayIndex + 1).padStart(2, '0')}
                tone={tones[displayIndex]}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 카운터 — 이미지 애니메이션과 분리하여 항상 고정 위치 */}
      <div className="shrink-0 pb-2 text-center font-mono text-xs tracking-[0.2rem] text-fg/60">
        {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </div>

      {/* 썸네일 스트립 */}
      <div className="shrink-0 pt-2 pb-6">
        <div
          ref={stripRef}
          className="flex gap-2 overflow-x-auto py-3"
          style={{ scrollbarWidth: 'none', paddingLeft: sidePad, paddingRight: sidePad }}
        >
          {tones.map((tone, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > index ? 1 : -1)}
              className="relative shrink-0 cursor-pointer overflow-hidden transition-all duration-200"
              style={{
                width: THUMB_SIZE,
                height: THUMB_SIZE,
                opacity: i === index ? 1 : 0.4,
                outline: i === index ? '2.5px solid rgba(212,175,55,1)' : '2.5px solid transparent',
                outlineOffset: '3px',
              }}
            >
              {hasRealPhoto(i) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={photos[gridIndex(i)]}
                  alt={`thumb ${i + 1}`}
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              ) : (
                <PhotoFrame tone={tone} />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
}
