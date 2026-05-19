"use client";

import { useState } from "react";
import { ChapterSection } from "@/components/ui/ChapterSection";
import { ChHeader } from "@/components/ui/ChHeader";
import { CoupleCard, CoupleCardData } from "./CoupleCard";
import { WEDDING } from "@/data/wedding";

const CARDS: CoupleCardData[] = [
  {
    who: "GROOM",
    name: WEDDING.groom.en,
    kor: WEDDING.groom.name,
    tagline: WEDDING.groom.tagline,
    facts: WEDDING.groom.facts,
    tone: "mono",
  },
  {
    who: "BRIDE",
    name: WEDDING.bride.en,
    kor: WEDDING.bride.name,
    tagline: WEDDING.bride.tagline,
    facts: WEDDING.bride.facts,
    tone: "sepia",
  },
];

export function Ch03Couple() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <ChapterSection chIndex={2}>
      <ChHeader
        num={3}
        label="THE COUPLE"
        title={
          <>
            Two
            <br />
            people.
          </>
        }
      />

      <div className="flex flex-col gap-3.5">
        {CARDS.map((card, i) => (
          <CoupleCard
            key={card.who}
            card={card}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>

      <div className="mt-3.5 text-center text-[0.625rem] tracking-[0.2rem] text-fg/40">
        TAP TO READ MORE
      </div>
    </ChapterSection>
  );
}
