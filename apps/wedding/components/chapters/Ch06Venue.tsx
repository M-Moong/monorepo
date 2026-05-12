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
      <ChHeader num={6} label="WHERE" title={<>Find<br />the place.</>} />

      {/* 추상 지도 SVG */}
      <div className="relative h-[180px] bg-warm border border-fg/10 overflow-hidden mb-[14px]">
        <svg width="100%" height="100%" viewBox="0 0 300 180" className="block">
          {/* 도로 */}
          <path d="M-10 120 Q 80 80, 150 100 T 320 90" stroke="rgba(240,232,216,.18)" strokeWidth="14" fill="none" />
          <path d="M-10 120 Q 80 80, 150 100 T 320 90" stroke="rgba(240,232,216,.06)" strokeWidth="12" fill="none" strokeDasharray="2 8" />
          <path d="M50 -10 L 70 200" stroke="rgba(240,232,216,.12)" strokeWidth="8" fill="none" />
          <path d="M220 -10 L 200 200" stroke="rgba(240,232,216,.12)" strokeWidth="8" fill="none" />
          {/* 강 */}
          <path d="M0 160 Q 100 150, 180 165 T 320 155" stroke="rgba(232,200,124,.15)" strokeWidth="20" fill="none" />
          {/* 레이블 */}
          <text x="14" y="20" fill="rgba(240,232,216,.4)" fontSize="8" letterSpacing="2">SOUTH GATE</text>
          <text x="220" y="20" fill="rgba(240,232,216,.4)" fontSize="8" letterSpacing="2">ITAEWON</text>
          {/* 핀 pulse */}
          <circle cx="150" cy="90" r="22" fill="#e8c87c" opacity=".15">
            <animate attributeName="r" values="22;30;22" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="150" cy="90" r="8" fill="#e8c87c" />
          <text x="150" y="78" fill="#e8c87c" fontSize="9" textAnchor="middle" letterSpacing="2">★</text>
          <text x="150" y="115" fill="#f0e8d8" fontSize="9" textAnchor="middle" letterSpacing="3">GRAND HYATT</text>
        </svg>
      </div>

      {/* 장소 정보 */}
      <div className="border-t border-b border-fg/[.15] py-[14px] mb-[14px]">
        <div className="font-serif text-[22px] italic text-fg">{WEDDING.venue.short}</div>
        <div className="text-[11px] text-fg/65 mt-1">{WEDDING.venue.detail}</div>
        <div className="text-[11px] text-fg/50 mt-2 font-mono">{WEDDING.venue.address}</div>
      </div>

      {/* 교통편 탭 */}
      <div className="grid grid-cols-4 gap-1 mb-3">
        {TRANSPORT_KEYS.map((key) => {
          const t = WEDDING.venue.transport[key];
          const active = tab === key;
          return (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`py-2.5 px-1 cursor-pointer text-[9px] tracking-[.2em] transition-all duration-200 border ${
                active
                  ? 'bg-gold text-bg border-gold'
                  : 'bg-transparent text-fg border-fg/[.15]'
              }`}
            >
              <div className="text-[16px] mb-0.5">{t.icon}</div>
              {t.title}
            </button>
          );
        })}
      </div>

      {/* 교통편 내용 */}
      <div className="bg-warm p-[14px] text-[12px] text-fg/85 whitespace-pre-line leading-[1.7] border-l-2 border-gold">
        {dir.body}
      </div>

      {/* 지도 버튼 */}
      <div className="grid grid-cols-3 gap-1 mt-[14px]">
        {['T MAP', 'KAKAO', 'NAVER'].map((n) => (
          <button
            key={n}
            className="py-3 bg-transparent border border-fg/20 text-fg text-[10px] tracking-[.2em] cursor-pointer"
          >
            {n} →
          </button>
        ))}
      </div>
    </ChapterSection>
  );
}
