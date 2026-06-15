'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChapterSection } from '@/components/ui/ChapterSection';
import { Lightbox } from '@/components/ui/Lightbox';
import { WEDDING } from '@/data/wedding';

type Tone = 'warm' | 'cool' | 'sage' | 'paper' | 'mono' | 'blush' | 'sepia' | 'ink';

// 갤러리 톤 순서
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
const ALL_TONES: Tone[] = WEDDING.photos.map((_, i) => BASE_TONES[i % BASE_TONES.length]!);

export function Ch04Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const total = WEDDING.photos.length;

  return (
    <ChapterSection chIndex={3} label="GALLERY" title="Scenes of us.">
      {/* 갤러리 썸네일 */}
      <div className="grid grid-cols-3 gap-1 overflow-hidden rounded-lg">
        {WEDDING.photos.map((photo, i) => (
          <button
            key={photo}
            type="button"
            onClick={() => setLightboxIndex(i)}
            className="relative aspect-square cursor-pointer overflow-hidden"
            aria-label={`${i + 1}번 사진 확대`}
          >
            <Image
              src={photo}
              alt={`웨딩 사진 ${i + 1}`}
              fill
              sizes="(max-width: 768px) 33vw, 200px"
              className="object-cover"
              unoptimized
            />
          </button>
        ))}
      </div>

      {/* 라이트박스 */}
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
