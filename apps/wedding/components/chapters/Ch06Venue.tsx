'use client';

import { useState } from 'react';
import { ChapterSection } from '@/components/ui/ChapterSection';
import { ChHeader } from '@/components/ui/ChHeader';
import { WEDDING, TransportKey } from '@/data/wedding';

const TRANSPORT_KEYS: TransportKey[] = ['subway', 'bus', 'car', 'taxi'];

export function Ch06Venue() {
  const [tab, setTab] = useState<TransportKey>('subway');
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
            stroke="rgba(240,232,216,.18)"
            strokeWidth="14"
            fill="none"
          />
          <path
            d="M-10 120 Q 80 80, 150 100 T 320 90"
            stroke="rgba(240,232,216,.06)"
            strokeWidth="12"
            fill="none"
            strokeDasharray="2 8"
          />
          <path d="M50 -10 L 70 200" stroke="rgba(240,232,216,.12)" strokeWidth="8" fill="none" />
          <path d="M220 -10 L 200 200" stroke="rgba(240,232,216,.12)" strokeWidth="8" fill="none" />
          {/* 강 */}
          <path
            d="M0 160 Q 100 150, 180 165 T 320 155"
            stroke="rgba(232,200,124,.15)"
            strokeWidth="20"
            fill="none"
          />
          {/* 레이블 */}
          <text x="14" y="20" fill="rgba(240,232,216,.4)" fontSize="8" letterSpacing="2">
            SOUTH GATE
          </text>
          <text x="220" y="20" fill="rgba(240,232,216,.4)" fontSize="8" letterSpacing="2">
            ITAEWON
          </text>
          {/* 핀 pulse */}
          <circle cx="150" cy="90" r="22" fill="#e8c87c" opacity=".15">
            <animate attributeName="r" values="22;30;22" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="150" cy="90" r="8" fill="#e8c87c" />
          <text x="150" y="78" fill="#e8c87c" fontSize="9" textAnchor="middle" letterSpacing="2">
            ★
          </text>
          <text x="150" y="115" fill="#f0e8d8" fontSize="9" textAnchor="middle" letterSpacing="3">
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

      {/* 지도 버튼 */}
      <div className="mt-[14px] grid grid-cols-3 gap-1">
        {['T MAP', 'KAKAO', 'NAVER'].map((n) => (
          <button
            key={n}
            className="border-fg/20 text-fg cursor-pointer border bg-transparent py-3 text-[10px] tracking-[.2em]"
          >
            {n} →
          </button>
        ))}
      </div>
    </ChapterSection>
  );
}
