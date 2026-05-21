'use client';

import { useState, useEffect } from 'react';
import { ChapterSection } from '@/components/ui/ChapterSection';
import { ChHeader } from '@/components/ui/ChHeader';
import { FortuneCard } from './FortuneCard';
import { VIBES, PALETTES } from '@/data/fortune';
import { useCopy } from '@/hooks/useCopy';

export function Ch07Fortune() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    setIdx(Math.floor(Math.random() * VIBES.length));
  }, []);
  const [flipping, setFlipping] = useState(false);
  const { copiedId, copy } = useCopy(1500);
  const copied = copiedId === 'fortune';

  const v = VIBES[idx];
  if (!v) return null;

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
      copy('fortune', text);
    }
  };

  return (
    <ChapterSection chIndex={6}>
      <ChHeader
        num={7}
        label="DAILY VIBE"
        title={
          <>
            Today&apos;s
            <br />
            fortune.
          </>
        }
      />

      <p className="mb-4.5 text-xs leading-[1.6] text-fg/70">
        랜덤으로 뽑히는 한 줄.
        <br />
        마음에 들면 캡처해서 SNS에 공유해 주세요. <span className="text-gold">#MnS_2026</span>
      </p>

      <FortuneCard
        vibe={v}
        palette={PALETTES[idx % PALETTES.length]!}
        idx={idx}
        total={VIBES.length}
        flipping={flipping}
      />

      <div className="mt-4 grid grid-cols-2 gap-1.5">
        <button
          onClick={next}
          className="cursor-pointer border border-gold bg-transparent py-3.5 text-[0.6875rem] tracking-[0.25rem] text-gold"
        >
          ↻ 다른 카드
        </button>
        <button
          onClick={share}
          className="cursor-pointer border-0 bg-gold py-3.5 text-[0.6875rem] font-bold tracking-[0.25rem] text-bg"
        >
          {copied ? '✓ 복사됨' : '↗ 공유하기'}
        </button>
      </div>
    </ChapterSection>
  );
}
