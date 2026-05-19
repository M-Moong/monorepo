"use client";

import { useState } from "react";
import { WEDDING } from "@/data/wedding";

type MapProvider = "kakao" | "naver";

const MAP_PROVIDERS: { key: MapProvider; label: string }[] = [
  { key: "kakao", label: "카카오맵" },
  { key: "naver", label: "네이버지도" },
];

export function MapLinks() {
  const [provider, setProvider] = useState<MapProvider>("kakao");

  return (
    <div className="mt-[14px]">
      <div className="mb-2 grid grid-cols-2 gap-1">
        {MAP_PROVIDERS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setProvider(key)}
            className={`cursor-pointer border py-2.5 text-[10px] tracking-[.2em] transition-all duration-200 ${
              provider === key
                ? "border-gold bg-gold text-bg"
                : "border-fg/[.15] bg-transparent text-fg"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <a
        href={WEDDING.venue.mapUrls[provider]}
        target="_blank"
        rel="noopener noreferrer"
        className="mb-1 flex w-full cursor-pointer items-center justify-center border border-gold bg-transparent py-3 text-[11px] tracking-[.2em] text-gold transition-opacity duration-150 active:opacity-70"
      >
        {provider === "kakao" ? "카카오맵" : "네이버지도"}으로 열기 →
      </a>

      <a
        href={WEDDING.venue.mapUrls.tmap}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full cursor-pointer items-center justify-center border border-fg/20 bg-transparent py-2 text-[10px] tracking-[.2em] text-fg/50 transition-opacity duration-150 active:opacity-70"
      >
        T MAP →
      </a>
    </div>
  );
}
