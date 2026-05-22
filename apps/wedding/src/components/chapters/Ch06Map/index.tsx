'use client';

import { Copy, Check } from 'lucide-react';
import { ChapterSection } from '@/components/ui/ChapterSection';
import { ChHeader } from '@/components/ui/ChHeader';
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
      className="flex cursor-pointer items-center gap-1 border border-fg/15 px-2.5 py-1 font-mono text-3xs tracking-[0.1rem] text-fg/40 transition-opacity duration-150 active:opacity-50"
    >
      {copied ? <Check size={10} /> : <Copy size={10} />}
      주소 복사
    </button>
  );
}

export function Ch06Map() {
  return (
    <ChapterSection chIndex={5} scrollable>
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

      <VenueMap />

      <div className="mb-3.5 border-y border-fg/15 py-2">
        <div className="flex items-baseline gap-2">
          <span className="font-serif text-xl text-fg italic">{WEDDING.venue.short}</span>
          <span className="text-2xs text-fg/65">({WEDDING.venue.detail})</span>
        </div>
        <div className="mt-1 flex items-center justify-between gap-2">
          <span className="font-mono text-2xs text-fg/50">{WEDDING.venue.address}</span>
          <CopyAddressButton />
        </div>
      </div>

      <TransportTabs />
    </ChapterSection>
  );
}
