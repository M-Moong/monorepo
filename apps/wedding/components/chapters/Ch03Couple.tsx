'use client';

import { useState } from 'react';
import { ChapterSection } from '@/components/ui/ChapterSection';
import { ChHeader } from '@/components/ui/ChHeader';
import { PhotoFrame } from '@/components/ui/PhotoFrame';
import { WEDDING } from '@/data/wedding';

type Tone = 'mono' | 'sepia';

interface CardData {
  who: 'GROOM' | 'BRIDE';
  name: string;
  kor: string;
  tagline: string;
  facts: readonly string[];
  tone: Tone;
}

const CARDS: CardData[] = [
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
];

export function Ch03Couple() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <ChapterSection chIndex={2}>
      <ChHeader num={3} label="THE COUPLE" title={<>Two<br />people.</>} />

      <div className="flex flex-col gap-[14px]">
        {CARDS.map((c, i) => (
          <div
            key={c.who}
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className={`relative cursor-pointer bg-warm overflow-hidden border transition-[border-color] duration-[350ms] ${
              openIndex === i ? 'border-gold' : 'border-fg/[.12]'
            }`}
          >
            <div className="flex items-stretch">
              <div className="w-[110px] aspect-[3/4] shrink-0">
                <PhotoFrame label={c.who} tone={c.tone} />
              </div>
              <div className="flex-1 p-[14px_16px]">
                <div className="text-[9px] tracking-[.3em] text-gold mb-1.5">{c.who}</div>
                <div className="font-serif text-[28px] italic leading-none font-light text-fg">
                  {c.name}
                </div>
                <div className="text-[12px] text-fg/60 mt-1">{c.kor}</div>
                <div className="font-serif text-[14px] italic text-gold mt-3">
                  &ldquo;{c.tagline}&rdquo;
                </div>
                <div className="text-[10px] tracking-[.2em] text-fg/40 mt-[14px]">
                  {openIndex === i ? '— LESS' : 'MORE +'}
                </div>
              </div>
            </div>

            {openIndex === i && (
              <div className="px-4 pb-[18px] border-t border-fg/10">
                {c.facts.map((f) => (
                  <div
                    key={f}
                    className="text-[12px] text-fg/75 py-2 border-b border-fg/[.05] flex gap-2.5 items-center"
                  >
                    <span className="text-gold">—</span>
                    {f}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="text-[10px] text-fg/40 mt-[14px] tracking-[.2em] text-center">
        TAP TO READ MORE
      </div>
    </ChapterSection>
  );
}
