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
  },
  {
    who: 'BRIDE',
    name: WEDDING.bride.en,
    kor: WEDDING.bride.name,
    tagline: WEDDING.bride.tagline,
    facts: WEDDING.bride.facts,
    tone: 'sepia',
  },
] satisfies readonly CoupleCardData[];

export function Ch03Couple() {
  const [openCards, setOpenCards] = useState<Set<CoupleCardData['who']>>(new Set());

  const toggleCard = (who: CoupleCardData['who']) => {
    setOpenCards((currentOpenCards) => {
      const nextOpenCards = new Set(currentOpenCards);

      if (nextOpenCards.has(who)) nextOpenCards.delete(who);
      else nextOpenCards.add(who);

      return nextOpenCards;
    });
  };

  return (
    <ChapterSection
      chIndex={2}
      label="THE COUPLE"
      title={
        <>
          Two
          <br />
          people.
        </>
      }
    >
      {/* 신랑·신부 카드 */}
      <div className="flex flex-col gap-3.5">
        {CARDS.map((card) => (
          <CoupleCard
            key={card.who}
            card={card}
            isOpen={openCards.has(card.who)}
            onToggle={() => toggleCard(card.who)}
          />
        ))}
      </div>

      {/* 카드 펼침 안내 */}
      <div className="mt-3 text-center text-2xs tracking-[0.2rem] text-fg/40">TAP TO READ MORE</div>
    </ChapterSection>
  );
}
