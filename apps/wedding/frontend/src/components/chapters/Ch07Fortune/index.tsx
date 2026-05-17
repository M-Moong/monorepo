'use client';

import { useState } from 'react';
import { ChapterSection } from '@/components/ui/ChapterSection';
import { ChHeader } from '@/components/ui/ChHeader';
import { FortuneCard } from './FortuneCard';
import { VIBES, PALETTES } from '@/data/fortune';

export function Ch07Fortune() {
  const [idx, setIdx] = useState(() => Math.floor(Math.random() * VIBES.length));
  const [flipping, setFlipping] = useState(false);
  const [copied, setCopied] = useState(false);

  const v = VIBES[idx];

  const next = () => {
    setFlipping(true);
    setTimeout(() => {
      setIdx((i) => {
        let next = i;
        while (next === i) next = Math.floor(Math.random() * VIBES.length);
        return next;
      });
      setFlipping(false);
    }, 250);
  };

  const share = () => {
    const text = `"${v.q.replace(/\n/g, ' ')}" ${v.a}\n\n${v.tag} via M & S 청첩장`;
    if (navigator.share) {
      navigator.share({ text }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <ChapterSection chIndex={6}>
      <ChHeader
        num={7}
        label="DAILY VIBE"
        title={
          <>
            오늘의
            <br />한 줄.
          </>
        }
      />

      <p className="text-fg/70 mb-[18px] text-[12px] leading-[1.6]">
        랜덤으로 뽑히는 한 줄.
        <br />
        마음에 들면 캡처해서 SNS에 공유해 주세요. <span className="text-gold">#MnS_2026</span>
      </p>

      <FortuneCard
        vibe={v}
        palette={PALETTES[idx % PALETTES.length]}
        idx={idx}
        total={VIBES.length}
        flipping={flipping}
      />

      <div className="mt-4 grid grid-cols-2 gap-1.5">
        <button
          onClick={next}
          className="border-gold text-gold cursor-pointer border bg-transparent py-[14px] text-[11px] tracking-[.25em]"
        >
          ↻ 다른 카드
        </button>
        <button
          onClick={share}
          className="bg-gold text-bg cursor-pointer border-0 py-[14px] text-[11px] font-bold tracking-[.25em]"
        >
          {copied ? '✓ 복사됨' : '↗ 공유하기'}
        </button>
      </div>
    </ChapterSection>
  );
}
