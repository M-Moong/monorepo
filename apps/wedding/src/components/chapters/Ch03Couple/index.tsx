'use client';

import { useState } from 'react';
import { ChapterSection } from '@/components/ui/ChapterSection';
import { WEDDING } from '@/data/wedding';
import { CoupleCard } from './CoupleCard';
import type { CoupleCardData } from './CoupleCard';

const CARDS = [
  {
    who: 'GROOM',
    name: WEDDING.groom.en,
    kor: WEDDING.groom.name,
    tagline: WEDDING.groom.tagline,
    facts: WEDDING.groom.facts,
    tone: 'mono',
    photoSrc: '/photos/groom_baby.webp',
  },
  {
    who: 'BRIDE',
    name: WEDDING.bride.en,
    kor: WEDDING.bride.name,
    tagline: WEDDING.bride.tagline,
    facts: WEDDING.bride.facts,
    tone: 'sepia',
    photoSrc: '/photos/bridge_baby.webp',
  },
] satisfies readonly CoupleCardData[];

export function Ch03Couple() {
  const [openCard, setOpenCard] = useState<CoupleCardData['who'] | null>(null);

  const toggleCard = (who: CoupleCardData['who']) => {
    setOpenCard((currentOpenCard) => (currentOpenCard === who ? null : who));
  };

  return (
    <ChapterSection
      chIndex={2}
      label="WITH LOVE"
      title={
        <>
          The
          <br />
          Couple
        </>
      }
    >
      {/* 신랑·신부 카드 */}
      <div className="flex flex-col gap-3.5">
        {CARDS.map((card) => (
          <CoupleCard
            key={card.who}
            card={card}
            isOpen={openCard === card.who}
            onToggle={() => toggleCard(card.who)}
          />
        ))}
      </div>

      {/* 카드 펼침 안내 */}
      <div className="mt-3 text-center text-2xs tracking-[0.2rem] text-fg/40">TAP TO READ MORE</div>
    </ChapterSection>
  );
}
