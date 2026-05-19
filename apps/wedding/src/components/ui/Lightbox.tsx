"use client";

import { useEffect } from "react";
import { PhotoFrame } from "@/components/ui/PhotoFrame";

type Tone =
  | "warm"
  | "cool"
  | "sage"
  | "paper"
  | "mono"
  | "blush"
  | "sepia"
  | "ink";

interface LightboxProps {
  index: number;
  total: number;
  tones: Tone[];
  photos: readonly string[];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function Lightbox({
  index,
  total,
  tones,
  photos,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

  const hasRealPhoto = photos[index] && !photos[index].includes("placeholder");

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg/95 p-5"
    >
      <div
        className="aspect-[3/4] max-h-[70%] w-full"
        onClick={(e) => e.stopPropagation()}
      >
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

      <div
        className="mt-[18px] flex gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onPrev}
          className="cursor-pointer border border-gold/40 bg-transparent px-[14px] py-2 text-[11px] tracking-[.2em] text-gold"
        >
          ← PREV
        </button>
        <button
          onClick={onNext}
          className="cursor-pointer border border-gold/40 bg-transparent px-[14px] py-2 text-[11px] tracking-[.2em] text-gold"
        >
          NEXT →
        </button>
      </div>

      <div className="mt-[14px] text-[9px] tracking-[.3em] text-fg/40">
        TAP ANYWHERE TO CLOSE
      </div>
    </div>
  );
}
