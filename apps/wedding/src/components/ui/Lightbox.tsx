'use client';

import { useEffect } from 'react';
import { PhotoFrame } from '@/components/ui/PhotoFrame';

type Tone = 'warm' | 'cool' | 'sage' | 'paper' | 'mono' | 'blush' | 'sepia' | 'ink';

interface LightboxProps {
  index: number;
  total: number;
  tones: Tone[];
  photos: readonly string[];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function Lightbox({ index, total, tones, photos, onClose, onPrev, onNext }: LightboxProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onPrev, onNext]);

  const hasRealPhoto = photos[index] && !photos[index].includes('placeholder');

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg/95 p-5"
    >
      <div className="aspect-[3/4] max-h-[70%] w-full" onClick={(e) => e.stopPropagation()}>
        {hasRealPhoto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photos[index]}
            alt={`photo ${index + 1}`}
            className="h-full w-full object-cover"
          />
        ) : (
          <PhotoFrame label={`${index + 1} / ${total}`} tone={tones[index]} />
        )}
      </div>

      <div className="mt-4.5 flex gap-6" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onPrev}
          className="cursor-pointer border border-gold/40 bg-transparent px-3.5 py-2 text-[0.6875rem] tracking-[0.2rem] text-gold"
        >
          ← PREV
        </button>
        <button
          onClick={onNext}
          className="cursor-pointer border border-gold/40 bg-transparent px-3.5 py-2 text-[0.6875rem] tracking-[0.2rem] text-gold"
        >
          NEXT →
        </button>
      </div>

      <div className="mt-3.5 text-[0.5625rem] tracking-[0.3rem] text-fg/40">
        TAP ANYWHERE TO CLOSE
      </div>
    </div>
  );
}
