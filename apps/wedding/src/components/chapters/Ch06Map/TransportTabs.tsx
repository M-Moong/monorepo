'use client';

import { useState } from 'react';
import { WEDDING, TransportKey } from '@/data/wedding';
import { TabButton } from '@/components/ui/TabButton';
import { cn } from '@repo/ui/lib/utils';

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
            <TabButton
              key={key}
              active={active}
              onClick={() => setTab(key)}
              className={cn('flex flex-col items-center px-1 py-1.5', active && 'ring-2 ring-fg')}
            >
              <span className="mb-0.5 text-base">{t.icon}</span>
              <span className={cn('font-bold', active && 'text-black')}>{t.title}</span>
            </TabButton>
          );
        })}
      </div>

      <ul className="list-inside list-disc border-l-2 border-gold bg-warm p-3.5 text-xs leading-[1.7] text-fg/85">
        {dir.body.split('\n').map((line, i) => (
          <li key={i} className={i === 0 ? 'text-gold' : ''}>
            {line}
          </li>
        ))}
      </ul>
    </>
  );
}
