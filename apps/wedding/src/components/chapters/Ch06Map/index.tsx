'use client';

import { Copy, Check } from 'lucide-react';
import { ChapterSection } from '@/components/ui/ChapterSection';
import { VenueMap } from './VenueMap';
import { TransportTabs } from './TransportTabs';
import { WEDDING } from '@/data/wedding';
import { useCopy } from '@/hooks/useCopy';

function CopyAddressButton() {
  const { copiedId, copy } = useCopy();
  const copied = copiedId === 'address';

  return (
    <button
      onClick={() => copy('address', WEDDING.venue.address)}
      className="flex cursor-pointer items-center gap-1.5 border border-fg/15 px-3 py-1.5 font-mono text-2xs tracking-[0.1rem] text-fg/40 transition-opacity duration-150 active:opacity-50"
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      주소 복사
    </button>
  );
}

export function Ch06Map() {
  return (
    <ChapterSection chIndex={5} label="WHERE" title={<>Wedding place</>}>
      <VenueMap />

      <div className="mb-2 flex items-center justify-between border-b border-fg/15 py-1">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-lg text-fg">{WEDDING.venue.short}</span>
            <span className="text-2xs text-fg/65">({WEDDING.venue.detail})</span>
          </div>

          <div className="my-1">
            <span className="font-mono text-sm text-fg/50">{WEDDING.venue.address}</span>
          </div>
        </div>
        <CopyAddressButton />
      </div>

      <TransportTabs />
    </ChapterSection>
  );
}
