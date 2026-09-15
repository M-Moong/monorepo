'use client';

import { memo, useEffect, useState } from 'react';
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

const PHOTO_COUNT = 12;
const FIREWORK_COUNT = 2;

interface FireworkItem {
  left: number;
  top: number;
  driftX: number;
  duration: number;
  delay: number;
  repeatDelay: number;
}

function buildFireworkItems(): FireworkItem[] {
  return Array.from({ length: FIREWORK_COUNT }, () => ({
    left: 10 + Math.random() * 78,
    top: 12 + Math.random() * 60,
    driftX: -30 + Math.random() * 60,
    duration: 6 + Math.random() * 3,
    delay: Math.random() * 5,
    repeatDelay: 2 + Math.random() * 4,
  }));
}

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

// ponytail: 사진 12장(BACKGROUND_PHOTOS 전체) + 폭죽 이모지 2개, 개별 랜덤 타이밍으로 순차 등장. 무한 반복.
// memo: 부모(MarriedScreen)가 카운트다운 때문에 매초 리렌더되는데, 그때마다 animate 객체가
// 새로 생성되면 Framer Motion이 애니메이션을 재계산해 버벅임(jump)이 생김 — 재렌더 자체를 막음.
export const FloatingPhotos = memo(function FloatingPhotos() {
  // Math.random() 기반이라 서버/클라이언트 렌더 값이 달라 하이드레이션 불일치가 났음 —
  // 마운트 후(클라이언트에서만) 채워서 서버 렌더 HTML과 비교 대상 자체를 없앰.
  const [items, setItems] = useState<FloatingItem[]>([]);
  const [fireworks, setFireworks] = useState<FireworkItem[]>([]);

  useEffect(() => {
    setItems(buildFloatingItems());
    setFireworks(buildFireworkItems());
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {fireworks.map((fw, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl"
          style={{ left: `${fw.left}%`, top: `${fw.top}%` }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: [0, 0.9, 0], y: [30, -70], x: [0, fw.driftX] }}
          transition={{
            duration: fw.duration,
            delay: fw.delay,
            repeat: Infinity,
            repeatDelay: fw.repeatDelay,
            ease: 'easeInOut',
          }}
        >
          🎉
        </motion.div>
      ))}
      {items.map((item, i) => (
        <motion.div
          key={i}
          className="absolute shadow-[0_0_30px_rgba(0,0,0,0.1)]"
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
          animate={{ opacity: [0, 0.6, 0], y: [40, -90], x: [0, item.driftX] }}
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
});
