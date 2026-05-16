'use client';

import { useState } from 'react';
import { ChapterSection } from '@/components/ui/ChapterSection';
import { ChHeader } from '@/components/ui/ChHeader';
import { PhotoFrame } from '@/components/ui/PhotoFrame';
import { Lightbox } from '@/components/ui/Lightbox';
import { WEDDING } from '@/data/wedding';

type Tone = 'warm' | 'cool' | 'sage' | 'paper' | 'mono' | 'blush' | 'sepia' | 'ink';

const TONES: Tone[] = ['mono', 'sepia', 'warm', 'paper', 'sage', 'blush', 'cool', 'mono', 'sepia'];

export function Ch04Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const total = TONES.length;

  const handlePrev = () => {
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + total) % total : 0));
  };
  const handleNext = () => {
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % total : 0));
  };

  return (
    <ChapterSection chIndex={3}>
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

      <div className="grid grid-cols-3 gap-1">
        {TONES.map((tone, i) => (
          <div
            key={i}
            onClick={() => setLightboxIndex(i)}
            className="relative aspect-square cursor-pointer overflow-hidden"
          >
            <PhotoFrame label={String(i + 1).padStart(2, '0')} tone={tone} />
          </div>
        ))}
      </div>

      <div className="text-fg/40 mt-[14px] text-center text-[10px] tracking-[.2em]">
        TAP ANY FRAME TO ENLARGE · {total} PHOTOS
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          index={lightboxIndex}
          total={total}
          tones={TONES}
          photos={WEDDING.photos}
          onClose={() => setLightboxIndex(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </ChapterSection>
  );
}
