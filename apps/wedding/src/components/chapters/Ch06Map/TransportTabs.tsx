'use client';

import { useState } from 'react';
import { WEDDING, TransportKey } from '@/data/wedding';
import { TabButton } from '@/components/ui/TabButton';

const TRANSPORT_KEYS: TransportKey[] = ['subway', 'bus', 'car', 'taxi'];

export function TransportTabs() {
  const [tab, setTab] = useState<TransportKey>('subway');
  const dir = WEDDING.venue.transport[tab];

  return (
    <>
      <div className="mb-3 grid grid-cols-4 gap-1">
        {TRANSPORT_KEYS.map((key) => {
          const t = WEDDING.venue.transport[key];
          return (
            <TabButton key={key} active={tab === key} onClick={() => setTab(key)} className="px-1">
              <div className="mb-0.5 text-base">{t.icon}</div>
              {t.title}
            </TabButton>
          );
        })}
      </div>

      <div className="border-l-2 border-gold bg-warm p-3.5 text-xs leading-[1.7] whitespace-pre-line text-fg/85">
        {dir.body}
      </div>
    </>
  );
}
