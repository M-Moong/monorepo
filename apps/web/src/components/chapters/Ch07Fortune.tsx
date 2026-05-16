'use client';

import { useState } from 'react';
import { ChapterSection } from '@/components/ui/ChapterSection';
import { ChHeader } from '@/components/ui/ChHeader';

interface Vibe {
  tag: string;
  q: string;
  a: string;
}

const VIBES: Vibe[] = [
  { tag: '#오늘의나', q: '나를 아끼는 일이\n오늘의 가장 큰 일.', a: '— 너에게' },
  { tag: '#월요병퇴치', q: '뭐든 일단\n해보고 후회하자.', a: '— 26살의 결심' },
  { tag: '#럭키비키', q: '잘 안 풀리면\n잘 풀리려고 그러는 거임.', a: '— 럭키비키 마인드' },
  { tag: '#소소행', q: '커피 한 모금에\n하루가 살짝 괜찮아짐.', a: '— 화요일 오전' },
  { tag: '#무지성긍정', q: '되면 좋고\n안 되면 더 좋고.', a: '— MZ식 단단함' },
  { tag: '#나에게진심', q: '남 눈치 한 스푼 빼고\n내 기분 한 스푼 더.', a: '— 레시피' },
  { tag: '#마음근육', q: '오늘 안 한다고\n인생 망하지 않음.', a: '— 진짜임' },
  { tag: '#럽스타그램', q: '좋은 사람 옆에 있으면\n나도 좋은 사람이 됨.', a: '— M & S로부터' },
  { tag: '#긍정스택', q: '될 일은 되고\n안 될 일은 안 가도 됨.', a: '— 우주의 흐름' },
  { tag: '#존버는승리', q: '버티는 게 아니라\n쌓이는 중.', a: '— 너의 시간' },
  { tag: '#MBTI관계없음', q: '결국 다정한 사람이\n이긴다.', a: '— 통계 없음 사실임' },
  { tag: '#결혼식초대', q: '좋은 사람들끼리\n좋은 날 모이자.', a: '— 17.10.2026' },
];

const PALETTES: [string, string][] = [
  ['#ff9a9e', '#fad0c4'],
  ['#a18cd1', '#fbc2eb'],
  ['#ffecd2', '#fcb69f'],
  ['#84fab0', '#8fd3f4'],
  ['#fccb90', '#d57eeb'],
  ['#fdcbf1', '#e6dee9'],
  ['#a1c4fd', '#c2e9fb'],
  ['#ff9a8b', '#ff6a88'],
  ['#fbc2eb', '#a6c1ee'],
  ['#fdfcfb', '#e2d1c3'],
  ['#c2e9fb', '#a1c4fd'],
  ['#ffd6a5', '#ffadad'],
];

export function Ch07Fortune() {
  const [idx, setIdx] = useState(() => Math.floor(Math.random() * VIBES.length));
  const [flipping, setFlipping] = useState(false);
  const [copied, setCopied] = useState(false);

  const v = VIBES[idx];
  const [p1, p2] = PALETTES[idx % PALETTES.length];

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

      {/* 카드 */}
      <div
        className="relative aspect-[4/5] overflow-hidden rounded-[18px] shadow-[0_20px_50px_rgba(0,0,0,.5)] transition-transform duration-[250ms]"
        style={{
          background: `linear-gradient(135deg, ${p1} 0%, ${p2} 100%)`,
          transform: flipping ? 'rotateY(90deg)' : 'rotateY(0)',
        }}
      >
        {/* paper grain */}
        <div
          className="pointer-events-none absolute inset-0 mix-blend-overlay"
          style={{
            background:
              'radial-gradient(circle at 30% 20%, rgba(255,255,255,.5), transparent 50%), radial-gradient(circle at 80% 90%, rgba(0,0,0,.15), transparent 50%)',
          }}
        />

        {/* 상단 태그 */}
        <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
          <div className="rounded-full bg-white/50 px-2.5 py-1 text-[11px] font-bold tracking-[-0.01em] text-black/70 backdrop-blur-[6px]">
            {v.tag}
          </div>
          <div className="text-[9px] tracking-[.25em] text-black/55">
            #{String(idx + 1).padStart(2, '0')} / {VIBES.length}
          </div>
        </div>

        {/* 명언 */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-[22px] pb-[60px] pt-[50px] text-center">
          <div className="mb-2.5 text-[32px] font-extrabold leading-none text-black/15">
            &ldquo;
          </div>
          <div className="whitespace-pre-line font-serif text-[26px] font-medium leading-[1.45] tracking-[-0.01em] text-[#1a1a1a]">
            {v.q}
          </div>
          <div className="mt-[18px] text-[11px] tracking-[.2em] text-black/55">{v.a}</div>
        </div>

        {/* 하단 레이블 */}
        <div className="absolute bottom-[14px] left-4 right-4 flex items-center justify-between text-[9px] tracking-[.2em] text-black/45">
          <span>M &amp; S × DAILY</span>
          <span>17.10.2026</span>
        </div>
      </div>

      {/* 버튼 */}
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
