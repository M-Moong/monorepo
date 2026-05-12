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
      className="absolute inset-0 bg-bg/95 z-[100] flex flex-col items-center justify-center p-5"
    >
      <div
        className="w-full aspect-[3/4] max-h-[70%]"
        onClick={(e) => e.stopPropagation()}
      >
        {hasRealPhoto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photos[index]} alt={`photo ${index + 1}`} className="w-full h-full object-cover" />
        ) : (
          <PhotoFrame label={`${index + 1} / ${total}`} tone={tones[index]} />
        )}
      </div>

      <div
        className="flex gap-6 mt-[18px]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onPrev}
          className="bg-transparent border border-gold/40 text-gold px-[14px] py-2 cursor-pointer text-[11px] tracking-[.2em]"
        >
          ← PREV
        </button>
        <button
          onClick={onNext}
          className="bg-transparent border border-gold/40 text-gold px-[14px] py-2 cursor-pointer text-[11px] tracking-[.2em]"
        >
          NEXT →
        </button>
      </div>

      <div className="text-[9px] text-fg/40 mt-[14px] tracking-[.3em]">
        TAP ANYWHERE TO CLOSE
      </div>
    </div>
  );
}
