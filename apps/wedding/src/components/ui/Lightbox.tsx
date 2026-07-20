'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
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
} as const;

export function Lightbox({ index, total, tones, photos, onClose, onJump }: LightboxProps) {
  // 상태
  const [displayIndex, setDisplayIndex] = useState(index);
  const [sidePad, setSidePad] = useState(120);
  const stripRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; time: number } | null>(null);
  const isInitialMount = useRef(true);

  // 이동 처리
  const goTo = useCallback(
    (nextIndex: number) => {
      const wrapped = ((nextIndex % total) + total) % total;
      setDisplayIndex(wrapped);
      onJump(wrapped);
    },
    [onJump, total]
  );

  // 바디 스크롤 잠금 (iOS Safari는 overflow:hidden만으로 안 막혀서 position:fixed 병행)
  useEffect(() => {
    const scrollY = window.scrollY;
    const body = document.body;
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.overflow = 'hidden';
    body.style.overscrollBehavior = 'none'; // 안드로이드 Chrome 당겨서 새로고침 방지
    return () => {
      body.style.position = '';
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      body.style.overflow = '';
      body.style.overscrollBehavior = '';
      window.scrollTo(0, scrollY);
    };
  }, []);

  // 썸네일 좌우 패딩 계산
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    setSidePad(strip.clientWidth / 2 - THUMB_SIZE / 2);
  }, []);

  // 현재 인덱스 썸네일 자동 스크롤
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    strip.scrollTo({ left: index * THUMB_UNIT, behavior: 'smooth' });
  }, [index]);

  // 키보드 이동(초기 마운트 시 과도한 리스너 등록 방지)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goTo(index - 1);
      if (e.key === 'ArrowRight') goTo(index + 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goTo, index, onClose]);

  // 그리드 인덱스 보정
  const gridIndex = (i: number) => i % photos.length || 0;
  // 플레이스홀더 여부 확인
  const hasRealPhoto = (i: number) => {
    const src = photos[gridIndex(i)];
    return src && !src.includes('placeholder');
  };
  const displaySrc = photos[gridIndex(displayIndex)];

  // 다음/이전 사진 프리로드 (스와이프 전환 시 빈 화면 방지)
  useEffect(() => {
    const preload = (i: number) => {
      const src = photos[gridIndex(i)];
      if (src && !src.includes('placeholder')) new window.Image().src = src;
    };
    preload(displayIndex + 1);
    preload(displayIndex - 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayIndex, photos]);

  // 터치 스와이프 (framer motion drag 대신 직접 처리 — drag는 touch-action을 강제로
  // pan-y로 덮어써서 사진 위에서 핀치줌이 막힘. 순수 터치 이벤트라 그 제약이 없음)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) {
      touchStartRef.current = null; // 멀티터치(핀치)는 스와이프 대상 아님
      return;
    }
    touchStartRef.current = { x: e.touches[0]!.clientX, time: Date.now() };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 1) touchStartRef.current = null; // 핀치 시작되면 스와이프 취소
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartRef.current;
    touchStartRef.current = null;
    const touch = e.changedTouches[0];
    if (!start || !touch) return;

    const deltaX = touch.clientX - start.x;
    const deltaTime = Date.now() - start.time || 1;
    const velocity = (deltaX / deltaTime) * 1000; // px/s
    const width = imageWrapRef.current?.clientWidth ?? window.innerWidth;
    const distanceThreshold = width * 0.15;
    const velocityThreshold = 500;

    if (deltaX < -distanceThreshold || velocity < -velocityThreshold) goTo(index + 1);
    else if (deltaX > distanceThreshold || velocity > velocityThreshold) goTo(index - 1);
  };

  // 제스처 도중 취소(OS 컨트롤센터 진입 등)되면 touchend가 안 옴 — 남은 상태 정리
  const handleTouchCancel = () => {
    touchStartRef.current = null;
  };

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-100 flex flex-col bg-bg/98"
    >
      {/* 상단 닫기 */}
      <div className="flex shrink-0 items-center justify-end px-5 pt-[max(1.25rem,env(safe-area-inset-top))]">
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className="flex h-11 cursor-pointer items-center gap-1.5 rounded-full border border-fg/20 px-4 text-fg/90 backdrop-blur-sm transition-colors hover:border-fg/50 hover:text-fg"
        >
          <span className="text-2xs tracking-[0.2rem]">CLOSE</span>
          <X size={14} strokeWidth={1.5} />
        </motion.button>
      </div>

      {/* 메인 이미지 + 이전/다음 버튼 */}
      <div className="flex min-h-0 flex-1 flex-col items-center gap-3 overflow-hidden px-5">
        <div ref={imageWrapRef} className="relative min-h-0 w-full max-w-[85%] flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={displayIndex}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute inset-0 overflow-hidden rounded-md"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={handleTouchCancel}
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
      <div className="shrink-0 pt-2 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
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
