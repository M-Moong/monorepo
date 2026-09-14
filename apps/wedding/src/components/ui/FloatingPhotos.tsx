'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// ponytail: 갤러리(WEDDING.photos)와 별개 배열. 여기만 바꾸면 갤러리 영향 없이 배경 사진 교체 가능.
const BACKGROUND_PHOTOS: string[] = [
  '/photos/01.webp',
  '/photos/02.webp',
  '/photos/03.webp',
  '/photos/04.webp',
  '/photos/05.webp',
  '/photos/06.webp',
  '/photos/07.webp',
  '/photos/08.webp',
  '/photos/09.webp',
  '/photos/10.webp',
  '/photos/11.webp',
  '/photos/12.webp',
];

const PHOTO_COUNT = 10;

interface FloatingItem {
  src: string;
  left: number;
  top: number;
  size: number;
  rotate: number;
  driftX: number;
  duration: number;
  delay: number;
  repeatDelay: number;
}

function buildFloatingItems(): FloatingItem[] {
  const shuffled = [...BACKGROUND_PHOTOS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, PHOTO_COUNT).map((src) => ({
    src,
    left: 2 + Math.random() * 92,
    top: 4 + Math.random() * 84,
    size: 90 + Math.random() * 50,
    rotate: -14 + Math.random() * 28,
    driftX: -24 + Math.random() * 48,
    duration: 5 + Math.random() * 3,
    delay: Math.random() * 5,
    repeatDelay: 1 + Math.random() * 3,
  }));
}

// ponytail: 사진 10장 랜덤 선택 + 개별 랜덤 타이밍으로 폭죽처럼 순차 등장. 무한 반복.
export function FloatingPhotos() {
  const items = useMemo(buildFloatingItems, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {items.map((item, i) => (
        <motion.div
          key={i}
          className="absolute shadow-[0_0_30px_rgba(0,0,0,0.1)] blur-[1.5px]"
          style={{
            left: `${item.left}%`,
            top: `${item.top}%`,
            width: item.size,
            height: item.size,
            rotate: item.rotate,
            borderRadius: '42% 58% 53% 47% / 48% 44% 56% 52%',
            overflow: 'hidden',
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: [0, 0.32, 0], y: [40, -90], x: [0, item.driftX] }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            repeatDelay: item.repeatDelay,
            ease: 'easeInOut',
          }}
        >
          <Image src={item.src} alt="" fill sizes="140px" className="object-cover" />
        </motion.div>
      ))}
    </div>
  );
}
