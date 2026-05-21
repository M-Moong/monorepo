'use client';

import { useEffect, useRef } from 'react';

const LAT = 37.3995;
const LNG = 127.1272;
const NAVER_KEY = process.env.NEXT_PUBLIC_NAVER_MAP_KEY;
const KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;

declare global {
  interface Window {
    naver: {
      maps: {
        Map: new (el: HTMLElement, opts: object) => object;
        LatLng: new (lat: number, lng: number) => object;
        Marker: new (opts: object) => object;
        MapTypeId: { NORMAL: string };
      };
    };
    kakao: {
      maps: {
        load: (cb: () => void) => void;
        Map: new (el: HTMLElement, opts: object) => object;
        LatLng: new (lat: number, lng: number) => object;
        CustomOverlay: new (opts: object) => { setMap: (m: object) => void };
      };
    };
  }
}

// 더 바실리움 주변 실제 도로 구조 (야탑역, 성남대로, 탄천, 양현로 기반)
function SVGFallback() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 300 200" className="block">
      {/* 배경 */}
      <rect width="300" height="200" fill="var(--color-warm, #f9f6f1)" />

      {/* 탄천 (오른쪽) */}
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

      {/* 성남대로 (세로 대로) */}
      <path d="M72 0 L 68 200" stroke="var(--color-svg-road, #d8d0c4)" strokeWidth="16" fill="none" />
      <path
        d="M72 0 L 68 200"
        stroke="var(--color-svg-road-center, #e8e2d8)"
        strokeWidth="13"
        fill="none"
        strokeDasharray="3 10"
      />

      {/* 양현로 (가로 — 더 바실리움 접근로) */}
      <path d="M0 108 L 255 104" stroke="var(--color-svg-road, #d8d0c4)" strokeWidth="10" fill="none" />
      <path
        d="M0 108 L 255 104"
        stroke="var(--color-svg-road-center, #e8e2d8)"
        strokeWidth="8"
        fill="none"
        strokeDasharray="3 8"
      />

      {/* 보조도로 (가로 위) */}
      <path d="M0 58 L 255 55" stroke="var(--color-svg-road, #d8d0c4)" strokeWidth="6" fill="none" />

      {/* 야탑역 블록 */}
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

      {/* 성남터미널 블록 */}
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

      {/* 핀 glow 애니메이션 */}
      <circle cx="158" cy="104" r="20" fill="var(--color-svg-pin-glow, rgba(232,200,124,0.2))">
        <animate attributeName="r" values="18;26;18" dur="2.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.5;0.1;0.5" dur="2.5s" repeatCount="indefinite" />
      </circle>

      {/* 핀 */}
      <circle cx="158" cy="104" r="9" fill="var(--color-gold, #e8c87c)" />
      <circle cx="158" cy="104" r="4" fill="white" opacity="0.8" />

      {/* 장소 라벨 */}
      <rect x="108" y="74" width="100" height="18" rx="3" fill="var(--color-gold, #e8c87c)" />
      <text x="158" y="86.5" fill="#1a1408" fontSize="8" fontWeight="700" textAnchor="middle" letterSpacing="1.5">
        THE BASILEUM
      </text>

      {/* 도로/지형 라벨 */}
      <text x="30" y="51" fill="var(--color-svg-label, #8a7f72)" fontSize="6" letterSpacing="0.5" textAnchor="middle">
        성남대로
      </text>
      <text x="195" y="99" fill="var(--color-svg-label, #8a7f72)" fontSize="6" letterSpacing="0.5" textAnchor="middle">
        양현로
      </text>
      <text x="272" y="28" fill="var(--color-svg-label, #8a7f72)" fontSize="6" letterSpacing="0.5" textAnchor="middle">
        탄천
      </text>
    </svg>
  );
}

function NaverMap({ container }: { container: React.RefObject<HTMLDivElement | null> }) {
  useEffect(() => {
    const initMap = () => {
      if (!container.current) return;
      const center = new window.naver.maps.LatLng(LAT, LNG);
      new window.naver.maps.Map(container.current, {
        center,
        zoom: 16,
        mapTypeId: window.naver.maps.MapTypeId.NORMAL,
      });
      new window.naver.maps.Marker({ position: center, map: container.current });
    };

    if (window.naver?.maps) {
      initMap();
    } else {
      const script = document.createElement('script');
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${NAVER_KEY}`;
      script.onload = initMap;
      document.head.appendChild(script);
    }
  }, [container]);

  return <div ref={container} className="h-full w-full" />;
}

function KakaoMap({ container }: { container: React.RefObject<HTMLDivElement | null> }) {
  useEffect(() => {
    const initMap = () => {
      if (!container.current) return;
      window.kakao.maps.load(() => {
        const center = new window.kakao.maps.LatLng(LAT, LNG);
        const map = new window.kakao.maps.Map(container.current!, { center, level: 3 });
        const content = `
          <div style="position:relative;display:flex;flex-direction:column;align-items:center;transform:translateY(-100%);">
            <div style="background:#e8c87c;color:#0a0a0a;font-size:10px;font-weight:700;letter-spacing:.1em;padding:4px 8px;white-space:nowrap;">THE BASILEUM</div>
            <div style="width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:6px solid #e8c87c;"></div>
          </div>`;
        new window.kakao.maps.CustomOverlay({ position: center, content, yAnchor: 0 }).setMap(map);
      });
    };

    if (window.kakao?.maps) {
      initMap();
    } else {
      const script = document.createElement('script');
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_KEY}&autoload=false`;
      script.onload = initMap;
      document.head.appendChild(script);
    }
  }, [container]);

  return <div ref={container} className="h-full w-full" />;
}

export function VenueMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  if (NAVER_KEY) {
    return (
      <div className="relative mb-3.5 h-36 overflow-hidden border border-fg/10">
        <NaverMap container={mapRef} />
      </div>
    );
  }

  if (KAKAO_KEY) {
    return (
      <div className="relative mb-3.5 h-36 overflow-hidden border border-fg/10">
        <KakaoMap container={mapRef} />
      </div>
    );
  }

  return (
    <div className="relative mb-3.5 h-36 overflow-hidden border border-fg/10 bg-warm">
      <SVGFallback />
    </div>
  );
}
