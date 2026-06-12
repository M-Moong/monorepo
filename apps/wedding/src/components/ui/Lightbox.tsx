'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
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

const variants = {
  enter: { scale: 1.05, opacity: 0 },
  center: { scale: 1, opacity: 1 },
  exit: { scale: 0.95, opacity: 0 },
};

export function Lightbox({ index, total, tones, photos, onClose, onJump }: LightboxProps) {
  const [displayIndex, setDisplayIndex] = useState(index);
  const [sidePad, setSidePad] = useState(120);
  const stripRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    setSidePad(strip.clientWidth / 2 - THUMB_SIZE / 2);
  }, []);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    strip.scrollTo({ left: index * THUMB_UNIT, behavior: 'smooth' });
  }, [index]);

  function goTo(nextIndex: number) {
    const wrapped = ((nextIndex % total) + total) % total;
    setDisplayIndex(wrapped);
    onJump(wrapped);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goTo(index - 1);
      if (e.key === 'ArrowRight') goTo(index + 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, onClose]);

  const gridIndex = (i: number) => i % photos.length || 0;
  const hasRealPhoto = (i: number) => {
    const src = photos[gridIndex(i)];
    return src && !src.includes('placeholder');
  };
  const displaySrc = photos[gridIndex(displayIndex)];

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-100 flex flex-col bg-bg/98"
    >
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

      {/* 메인 이미지 + 이전/다음 버튼 */}
      <div className="flex min-h-0 flex-1 flex-col items-center gap-3 overflow-hidden px-5">
        <div className="relative min-h-0 w-full max-w-[85%] flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={displayIndex}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute inset-0 overflow-hidden rounded-md"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              onDragStart={() => {
                isDragging.current = true;
              }}
              onDragEnd={(_, info) => {
                if (!isDragging.current) return;
                isDragging.current = false;
                if (info.offset.x < -50) goTo(index + 1);
                else if (info.offset.x > 50) goTo(index - 1);
              }}
            >
              {hasRealPhoto(displayIndex) && displaySrc ? (
                <Image
                  src={displaySrc}
                  alt={`photo ${displayIndex + 1}`}
                  fill
                  sizes="85vw"
                  className="object-contain"
                  draggable={false}
                  unoptimized
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

        {/* 이전/다음 버튼 */}
        <div className="flex w-full max-w-[85%] shrink-0 justify-between">
          <motion.button
            onClick={() => goTo(index - 1)}
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.88 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-fg/15 bg-bg/70 text-fg/80 backdrop-blur-sm transition-colors hover:border-fg/40 hover:text-fg"
          >
            <ChevronLeft size={22} strokeWidth={1.5} />
          </motion.button>
          <motion.button
            onClick={() => goTo(index + 1)}
            whileHover={{ scale: 1.1, x: 2 }}
            whileTap={{ scale: 0.88 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-fg/15 bg-bg/70 text-fg/80 backdrop-blur-sm transition-colors hover:border-fg/40 hover:text-fg"
          >
            <ChevronRight size={22} strokeWidth={1.5} />
          </motion.button>
        </div>
      </div>

      {/* 카운터 */}
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
              onClick={() => goTo(i)}
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
                <Image
                  src={photos[gridIndex(i)]!}
                  alt={`thumb ${i + 1}`}
                  fill
                  sizes={`${THUMB_SIZE}px`}
                  className="object-cover"
                  draggable={false}
                  unoptimized
                />
              ) : (
                <PhotoFrame tone={tone} />
              )}
            </button>
          ))}
        </div>
      </div>
    </motion.div>,
    document.body
  );
}
