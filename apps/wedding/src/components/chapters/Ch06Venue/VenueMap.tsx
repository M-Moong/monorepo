'use client';

import { useEffect, useRef } from 'react';

const LAT = 37.539565;
const LNG = 126.992161;
const APP_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;

declare global {
  interface Window {
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

function SVGFallback() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 300 180" className="block">
      <path
        d="M-10 120 Q 80 80, 150 100 T 320 90"
        style={{ stroke: 'var(--color-svg-road)' }}
        strokeWidth="14"
        fill="none"
      />
      <path
        d="M-10 120 Q 80 80, 150 100 T 320 90"
        style={{ stroke: 'var(--color-svg-road-center)' }}
        strokeWidth="12"
        fill="none"
        strokeDasharray="2 8"
      />
      <path
        d="M50 -10 L 70 200"
        style={{ stroke: 'var(--color-svg-road)' }}
        strokeWidth="8"
        fill="none"
      />
      <path
        d="M220 -10 L 200 200"
        style={{ stroke: 'var(--color-svg-road)' }}
        strokeWidth="8"
        fill="none"
      />
      <path
        d="M0 160 Q 100 150, 180 165 T 320 155"
        style={{ stroke: 'var(--color-svg-river)' }}
        strokeWidth="20"
        fill="none"
      />
      <text x="14" y="20" style={{ fill: 'var(--color-svg-label)' }} fontSize="8" letterSpacing="2">
        SOUTH GATE
      </text>
      <text
        x="220"
        y="20"
        style={{ fill: 'var(--color-svg-label)' }}
        fontSize="8"
        letterSpacing="2"
      >
        ITAEWON
      </text>
      <circle cx="150" cy="90" r="22" style={{ fill: 'var(--color-svg-pin-glow)' }}>
        <animate attributeName="r" values="22;30;22" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="150" cy="90" r="8" style={{ fill: 'var(--color-gold)' }} />
      <text
        x="150"
        y="78"
        style={{ fill: 'var(--color-gold)' }}
        fontSize="9"
        textAnchor="middle"
        letterSpacing="2"
      >
        ★
      </text>
      <text
        x="150"
        y="115"
        style={{ fill: 'var(--color-fg)' }}
        fontSize="9"
        textAnchor="middle"
        letterSpacing="3"
      >
        GRAND HYATT
      </text>
    </svg>
  );
}

export function VenueMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!APP_KEY || !mapRef.current) return;

    const initMap = () => {
      if (!mapRef.current) return;
      window.kakao.maps.load(() => {
        const center = new window.kakao.maps.LatLng(LAT, LNG);
        const map = new window.kakao.maps.Map(mapRef.current!, {
          center,
          level: 3,
        });

        // 골드 커스텀 마커
        const content = `
          <div style="
            position:relative;
            display:flex;
            flex-direction:column;
            align-items:center;
            transform:translateY(-100%);
          ">
            <div style="
              background:#e8c87c;
              color:#0a0a0a;
              font-size:10px;
              font-weight:700;
              letter-spacing:.1em;
              padding:4px 8px;
              white-space:nowrap;
            ">GRAND HYATT</div>
            <div style="width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:6px solid #e8c87c;"></div>
          </div>`;

        new window.kakao.maps.CustomOverlay({
          position: center,
          content,
          yAnchor: 0,
        }).setMap(map);
      });
    };

    if (window.kakao?.maps) {
      initMap();
    } else {
      const script = document.createElement('script');
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${APP_KEY}&autoload=false`;
      script.onload = initMap;
      document.head.appendChild(script);
    }
  }, []);

  if (!APP_KEY) {
    return (
      <div className="relative mb-3.5 h-[11.25rem] overflow-hidden border border-fg/10 bg-warm">
        <SVGFallback />
      </div>
    );
  }

  return (
    <div className="relative mb-3.5 h-[11.25rem] overflow-hidden border border-fg/10">
      <div ref={mapRef} className="h-full w-full" />
    </div>
  );
}
