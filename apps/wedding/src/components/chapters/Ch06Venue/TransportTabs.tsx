'use client';

import { useState } from 'react';
import { WEDDING, TransportKey } from '@/data/wedding';

const TRANSPORT_KEYS: TransportKey[] = ['subway', 'bus', 'car', 'taxi'];

export function TransportTabs() {
  const [tab, setTab] = useState<TransportKey>('subway');
  const dir = WEDDING.venue.transport[tab];

  return (
    <>
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

      <div className="bg-warm text-fg/85 border-gold whitespace-pre-line border-l-2 p-[14px] text-[12px] leading-[1.7]">
        {dir.body}
      </div>
    </>
  );
}
