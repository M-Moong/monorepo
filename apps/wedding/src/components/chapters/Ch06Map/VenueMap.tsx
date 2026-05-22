'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { WEDDING } from '@/data/wedding';

const NAVER_KEY = process.env.NEXT_PUBLIC_NAVER_MAP_KEY;

declare global {
  interface Window {
    naver: {
      maps: {
        onJSContentLoaded: (() => void) | undefined;
        Map: new (el: HTMLElement, opts: object) => object;
        LatLng: new (lat: number, lng: number) => object;
        Marker: new (opts: object) => object;
        InfoWindow: new (opts: object) => { open: (map: object, anchor: object) => void };
        Service: {
          geocode: (
            opts: { query: string },
            cb: (
              status: string,
              response: { v2: { addresses: { x: string; y: string }[] } }
            ) => void
          ) => void;
          Status: { OK: string };
        };
      };
    };
  }
}

function SVGFallback() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 300 200" className="block">
      <rect width="300" height="200" fill="var(--color-warm, #f9f6f1)" />
      <path
        d="M255 0 Q 260 50, 252 100 Q 248 150, 258 200"
        stroke="var(--color-svg-river, #b8d4e8)"
        strokeWidth="18"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M255 0 Q 260 50, 252 100 Q 248 150, 258 200"
        stroke="var(--color-svg-river-inner, #cce2f0)"
        strokeWidth="12"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M72 0 L 68 200"
        stroke="var(--color-svg-road, #d8d0c4)"
        strokeWidth="16"
        fill="none"
      />
      <path
        d="M72 0 L 68 200"
        stroke="var(--color-svg-road-center, #e8e2d8)"
        strokeWidth="13"
        fill="none"
        strokeDasharray="3 10"
      />
      <path
        d="M0 108 L 255 104"
        stroke="var(--color-svg-road, #d8d0c4)"
        strokeWidth="10"
        fill="none"
      />
      <path
        d="M0 108 L 255 104"
        stroke="var(--color-svg-road-center, #e8e2d8)"
        strokeWidth="8"
        fill="none"
        strokeDasharray="3 8"
      />
      <path
        d="M0 58 L 255 55"
        stroke="var(--color-svg-road, #d8d0c4)"
        strokeWidth="6"
        fill="none"
      />
      <rect x="44" y="70" width="48" height="24" rx="2" fill="var(--color-svg-block, #e2dbd0)" />
      <text
        x="68"
        y="86"
        fill="var(--color-svg-label, #8a7f72)"
        fontSize="6.5"
        textAnchor="middle"
        letterSpacing="0.5"
      >
        야탑역
      </text>
      <rect x="44" y="116" width="52" height="20" rx="2" fill="var(--color-svg-block, #e2dbd0)" />
      <text
        x="70"
        y="130"
        fill="var(--color-svg-label, #8a7f72)"
        fontSize="6"
        textAnchor="middle"
        letterSpacing="0.5"
      >
        성남터미널
      </text>
      <circle cx="158" cy="104" r="20" fill="var(--color-svg-pin-glow, rgba(232,200,124,0.2))">
        <animate attributeName="r" values="18;26;18" dur="2.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.5;0.1;0.5" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="158" cy="104" r="9" fill="var(--color-gold, #e8c87c)" />
      <circle cx="158" cy="104" r="4" fill="white" opacity="0.8" />
      <rect x="108" y="74" width="100" height="18" rx="3" fill="var(--color-gold, #e8c87c)" />
      <text
        x="158"
        y="86.5"
        fill="#1a1408"
        fontSize="8"
        fontWeight="700"
        textAnchor="middle"
        letterSpacing="1.5"
      >
        THE BASILEUM
      </text>
      <text
        x="30"
        y="51"
        fill="var(--color-svg-label, #8a7f72)"
        fontSize="6"
        letterSpacing="0.5"
        textAnchor="middle"
      >
        성남대로
      </text>
      <text
        x="195"
        y="99"
        fill="var(--color-svg-label, #8a7f72)"
        fontSize="6"
        letterSpacing="0.5"
        textAnchor="middle"
      >
        양현로
      </text>
      <text
        x="272"
        y="28"
        fill="var(--color-svg-label, #8a7f72)"
        fontSize="6"
        letterSpacing="0.5"
        textAnchor="middle"
      >
        탄천
      </text>
    </svg>
  );
}

export function VenueMap() {
  const naverRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    if (!NAVER_KEY) return;

    const renderMap = () => {
      if (!naverRef.current || doneRef.current) return;
      doneRef.current = true;

      window.naver.maps.Service.geocode({ query: WEDDING.venue.address }, (status, response) => {
        if (status !== window.naver.maps.Service.Status.OK || !response.v2.addresses.length) return;
        const addr = response.v2.addresses[0];
        if (!addr) return;

        const position = new window.naver.maps.LatLng(parseFloat(addr.y), parseFloat(addr.x));
        const map = new window.naver.maps.Map(naverRef.current!, { center: position, zoom: 17 });
        const marker = new window.naver.maps.Marker({ position, map });
        const infoWindow = new window.naver.maps.InfoWindow({
          content:
            '<div style="padding:5px 10px;font-size:12px;font-weight:700;white-space:nowrap;">더 바실리움</div>',
        });
        infoWindow.open(map, marker);
      });
    };

    const init = () => requestAnimationFrame(() => requestAnimationFrame(renderMap));

    if (window.naver?.maps?.Service) {
      init();
    } else if (window.naver?.maps) {
      // maps는 로드됐지만 Service 서브모듈 초기화 대기
      window.naver.maps.onJSContentLoaded = init;
    } else {
      const script = document.createElement('script');
      script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${NAVER_KEY}&submodules=geocoder`;
      script.onload = () => {
        if (window.naver?.maps?.Service) {
          init();
        } else {
          window.naver.maps.onJSContentLoaded = init;
        }
      };
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div className="mb-3.5">
      <div className="relative h-48 overflow-hidden border border-fg/10">
        {NAVER_KEY ? (
          <div ref={naverRef} className="h-full w-full" />
        ) : (
          <div className="absolute inset-0 bg-warm">
            <SVGFallback />
          </div>
        )}
      </div>

      <div className="mt-1 grid grid-cols-2 gap-1">
        <a
          href={WEDDING.venue.mapUrls.naver}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 border border-fg/15 bg-transparent py-2.5 text-2xs tracking-[0.15rem] text-fg/70 transition-opacity duration-150 active:opacity-60"
        >
          <Image src="/logo/navermap.webp" alt="네이버지도" width={14} height={14} />
          <span>네이버지도</span>
        </a>
        <a
          href={WEDDING.venue.mapUrls.kakao}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 border border-fg/15 bg-transparent py-2.5 text-2xs tracking-[0.15rem] text-fg/70 transition-opacity duration-150 active:opacity-60"
        >
          <Image src="/logo/kakaomap.webp" alt="카카오맵" width={14} height={14} />
          <span>카카오맵</span>
        </a>
      </div>
    </div>
  );
}
