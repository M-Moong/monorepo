'use client';

import { WEDDING } from '@/data/wedding';

export function MapLinks() {
  return (
    <div className="mt-3.5 flex flex-col gap-1">
      <a
        href={WEDDING.venue.mapUrls.kakao}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full cursor-pointer items-center justify-center border border-gold bg-transparent py-3 text-[0.6875rem] tracking-[0.2rem] text-gold transition-opacity duration-150 active:opacity-70"
      >
        카카오맵으로 열기 →
      </a>

      <a
        href={WEDDING.venue.mapUrls.naver}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full cursor-pointer items-center justify-center border border-gold bg-transparent py-3 text-[0.6875rem] tracking-[0.2rem] text-gold transition-opacity duration-150 active:opacity-70"
      >
        네이버지도로 열기 →
      </a>

      <a
        href={WEDDING.venue.mapUrls.tmap}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full cursor-pointer items-center justify-center border border-fg/20 bg-transparent py-2 text-[0.625rem] tracking-[0.2rem] text-fg/50 transition-opacity duration-150 active:opacity-70"
      >
        T MAP →
      </a>
    </div>
  );
}
