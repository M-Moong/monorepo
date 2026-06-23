'use client';

import { useState } from 'react';
import { ChapterSection } from '@/components/ui/ChapterSection';
import { AccountSection } from './AccountSection';
import { ShareButtons } from './ShareButtons';
import { WEDDING } from '@/data/wedding';

export function Ch09Finale() {
  const [openAccount, setOpenAccount] = useState<'groom' | 'bride' | null>(null);

  return (
    <ChapterSection chIndex={8} label="FINALE" title="마지막 인사">
      <div className="mb-6 flex flex-col items-center border-y border-fg/20 py-5 text-center">
        <span className="font-serif text-[2rem] font-light text-fg italic tabular-nums">
          {WEDDING.dateShort}
        </span>
        <span className="mt-1.5 text-base tracking-[0.15rem] text-fg/70">
          {WEDDING.timeText} · {WEDDING.venue.short}
        </span>
      </div>

      <div className="mb-2 flex items-center font-sans-en text-3xs tracking-[0.4rem] text-gold">
        <span>· ACCOUNTS ·</span>
      </div>

      <AccountSection
        side="groom"
        isOpen={openAccount === 'groom'}
        onToggle={() => setOpenAccount((current) => (current === 'groom' ? null : 'groom'))}
      />
      <AccountSection
        side="bride"
        isOpen={openAccount === 'bride'}
        onToggle={() => setOpenAccount((current) => (current === 'bride' ? null : 'bride'))}
      />

      <ShareButtons />

      <div className="flex flex-col items-center gap-1.5 text-center">
        <span className="mt-2 font-serif-en text-[1.375rem] text-gold italic">
          {WEDDING.groom.initial} &amp; {WEDDING.bride.initial}
        </span>
        <span className="pb-10 font-sans-en text-3xs tracking-[0.3rem] text-fg/40">
          WITH LOVE · {WEDDING.dateShort}
        </span>
      </div>
    </ChapterSection>
  );
}
