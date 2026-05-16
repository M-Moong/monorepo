'use client';

import { useState } from 'react';
import { ChapterSection } from '@/components/ui/ChapterSection';
import { ChHeader } from '@/components/ui/ChHeader';
import { WEDDING, TransportKey } from '@/data/wedding';

const TRANSPORT_KEYS: TransportKey[] = ['subway', 'bus', 'car', 'taxi'];
type MapProvider = 'kakao' | 'naver';

const MAP_PROVIDERS: { key: MapProvider; label: string }[] = [
  { key: 'kakao', label: '카카오맵' },
  { key: 'naver', label: '네이버지도' },
];

export function Ch06Venue() {
  const [tab, setTab] = useState<TransportKey>('subway');
  const [mapProvider, setMapProvider] = useState<MapProvider>('kakao');
  const dir = WEDDING.venue.transport[tab];

  return (
    <ChapterSection chIndex={5}>
      <ChHeader
        num={6}
        label="WHERE"
        title={
          <>
            Find
            <br />
            the place.
          </>
        }
      />

      {/* 추상 지도 SVG */}
      <div className="bg-warm border-fg/10 relative mb-[14px] h-[180px] overflow-hidden border">
        <svg width="100%" height="100%" viewBox="0 0 300 180" className="block">
          {/* 도로 */}
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
          {/* 강 */}
          <path
            d="M0 160 Q 100 150, 180 165 T 320 155"
            style={{ stroke: 'var(--color-svg-river)' }}
            strokeWidth="20"
            fill="none"
          />
          {/* 레이블 */}
          <text
            x="14"
            y="20"
            style={{ fill: 'var(--color-svg-label)' }}
            fontSize="8"
            letterSpacing="2"
          >
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
          {/* 핀 pulse */}
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
      </div>

      {/* 장소 정보 */}
      <div className="border-fg/[.15] mb-[14px] border-b border-t py-[14px]">
        <div className="text-fg font-serif text-[22px] italic">{WEDDING.venue.short}</div>
        <div className="text-fg/65 mt-1 text-[11px]">{WEDDING.venue.detail}</div>
        <div className="text-fg/50 mt-2 font-mono text-[11px]">{WEDDING.venue.address}</div>
      </div>

      {/* 교통편 탭 */}
      <div className="mb-3 grid grid-cols-4 gap-1">
        {TRANSPORT_KEYS.map((key) => {
          const t = WEDDING.venue.transport[key];
          const active = tab === key;
          return (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`cursor-pointer border px-1 py-2.5 text-[9px] tracking-[.2em] transition-all duration-200 ${
                active ? 'bg-gold text-bg border-gold' : 'text-fg border-fg/[.15] bg-transparent'
              }`}
            >
              <div className="mb-0.5 text-[16px]">{t.icon}</div>
              {t.title}
            </button>
          );
        })}
      </div>

      {/* 교통편 내용 */}
      <div className="bg-warm text-fg/85 border-gold whitespace-pre-line border-l-2 p-[14px] text-[12px] leading-[1.7]">
        {dir.body}
      </div>

      {/* 지도 앱 탭 */}
      <div className="mt-[14px]">
        <div className="mb-2 grid grid-cols-2 gap-1">
          {MAP_PROVIDERS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setMapProvider(key)}
              className={`cursor-pointer border py-2.5 text-[10px] tracking-[.2em] transition-all duration-200 ${
                mapProvider === key
                  ? 'bg-gold text-bg border-gold'
                  : 'text-fg border-fg/[.15] bg-transparent'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <a
          href={WEDDING.venue.mapUrls[mapProvider]}
          target="_blank"
          rel="noopener noreferrer"
          className="border-gold text-gold mb-1 flex w-full cursor-pointer items-center justify-center border bg-transparent py-3 text-[11px] tracking-[.2em] transition-opacity duration-150 active:opacity-70"
        >
          {mapProvider === 'kakao' ? '카카오맵' : '네이버지도'}으로 열기 →
        </a>

        <a
          href={WEDDING.venue.mapUrls.tmap}
          target="_blank"
          rel="noopener noreferrer"
          className="border-fg/20 text-fg/50 flex w-full cursor-pointer items-center justify-center border bg-transparent py-2 text-[10px] tracking-[.2em] transition-opacity duration-150 active:opacity-70"
        >
          T MAP →
        </a>
      </div>
    </ChapterSection>
  );
}
