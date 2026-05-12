'use client';

import { useState } from 'react';
import { ChapterSection } from '@/components/ui/ChapterSection';
import { ChHeader } from '@/components/ui/ChHeader';

type AttendStatus = 'yes' | 'maybe' | 'no' | null;
type GuestSide = 'groom' | 'bride' | 'guest';

interface GuestEntry {
  n: string;
  m: string;
  t: string;
  r: string;
  side: GuestSide;
}

const INITIAL_ENTRIES: GuestEntry[] = [
  { n: '민지', m: '두 분 진짜 잘 어울려요. 행복하세요!', t: '2일 전', r: '🥹', side: 'bride' },
  { n: '준호', m: '오빠 드디어 가는구나. 축하한다.', t: '5일 전', r: '🥂', side: 'groom' },
  {
    n: '수아',
    m: '청첩장 디자인에 감탄하는 중. 너무 두 분 답다.',
    t: '1주 전',
    r: '✨',
    side: 'bride',
  },
  { n: '재현', m: '그날 봐요. 사진 많이 찍어드릴게요 📷', t: '1주 전', r: '📷', side: 'groom' },
  { n: '예린', m: 'YES! 무조건 갑니다. 드레스 너무 기대돼요', t: '2주 전', r: '👰', side: 'bride' },
];

const REACTIONS = ['🥹', '🥂', '✨', '🫶', '📷', '🎉', '💍', '🌷'];

export function Ch08Guestbook() {
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  const [reaction, setReaction] = useState<string | null>(null);
  const [attend, setAttend] = useState<AttendStatus>(null);
  const [book, setBook] = useState<GuestEntry[]>(INITIAL_ENTRIES);

  const canSubmit = name.trim().length > 0 && msg.trim().length > 0;

  const submit = () => {
    if (!canSubmit) return;
    setBook((prev) => [
      { n: name.trim(), m: msg.trim(), t: '방금', r: reaction ?? '🫶', side: 'guest' },
      ...prev,
    ]);
    setName('');
    setMsg('');
    setReaction(null);
    setAttend(null);
  };

  const counts = book.reduce<Record<GuestSide, number>>(
    (acc, g) => {
      acc[g.side] = (acc[g.side] ?? 0) + 1;
      return acc;
    },
    { groom: 0, bride: 0, guest: 0 }
  );

  const inputClass =
    'w-full py-3 bg-transparent border-0 border-b border-fg/30 text-fg text-[15px] outline-none box-border placeholder:text-fg/30';

  return (
    <ChapterSection chIndex={7} minHeightAuto>
      <ChHeader
        num={8}
        label="GUESTBOOK"
        title={
          <>
            한마디
            <br />
            남겨주세요.
          </>
        }
      />

      <p className="text-fg/70 mb-[18px] text-[12px] leading-[1.65]">
        식 당일 스크린에 띄워질 따뜻한 한마디.
        <br />
        <span className="text-gold">참석 여부는 천천히 알려주셔도 괜찮아요.</span>
      </p>

      {/* 통계 */}
      <div className="bg-warm border-fg/[.08] mb-[22px] grid grid-cols-3 border">
        {(
          [
            ['전체', book.length],
            ['신랑측', counts.groom],
            ['신부측', counts.bride],
          ] as [string, number][]
        ).map(([label, count]) => (
          <div key={label} className="border-fg/[.06] border-r px-1 py-[14px] text-center">
            <div className="text-gold font-serif text-[26px] italic tabular-nums leading-none">
              {count}
            </div>
            <div className="text-fg/55 mt-1 text-[9px] tracking-[.25em]">{label}</div>
          </div>
        ))}
      </div>

      {/* 작성 폼 */}
      <div className="bg-warm border-fg/10 mb-[22px] border p-4">
        <div className="text-gold mb-3 text-[9px] tracking-[.3em]">· LEAVE A NOTE ·</div>

        <input
          className={inputClass}
          placeholder="이름 또는 닉네임"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          className={`${inputClass} mb-[14px] mt-1 resize-none pt-2.5`}
          placeholder="짧고 따뜻한 한마디를 남겨주세요"
          value={msg}
          rows={3}
          onChange={(e) => setMsg(e.target.value)}
        />

        {/* 이모지 */}
        <div className="text-fg/55 mb-2 text-[9px] tracking-[.3em]">이모지를 골라주세요 (선택)</div>
        <div className="mb-[14px] flex flex-wrap gap-1.5">
          {REACTIONS.map((r) => (
            <button
              key={r}
              onClick={() => setReaction(reaction === r ? null : r)}
              className={`h-[38px] w-[38px] cursor-pointer rounded-lg border p-0 text-[18px] transition-all duration-150 ${
                reaction === r ? 'bg-gold/[.18] border-gold' : 'bg-fg/[.05] border-transparent'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* 참석여부 (선택) */}
        <div className="text-fg/55 mb-2 text-[9px] tracking-[.3em]">
          참석 여부 (선택 — 나중에 알려주셔도 OK)
        </div>
        <div className="mb-[14px] grid grid-cols-3 gap-1">
          {(
            [
              ['yes', '갈게요'],
              ['maybe', '아직 몰라요'],
              ['no', '못 가요'],
            ] as [AttendStatus, string][]
          ).map(([k, l]) => (
            <button
              key={k}
              onClick={() => setAttend(attend === k ? null : k)}
              className={`cursor-pointer border py-2.5 text-[11px] tracking-[.05em] transition-all duration-200 ${
                attend === k
                  ? 'bg-gold text-bg border-gold'
                  : 'text-fg border-fg/[.18] bg-transparent'
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        <button
          onClick={submit}
          disabled={!canSubmit}
          className={`w-full border-0 py-[14px] text-[11px] font-bold tracking-[.25em] transition-all duration-150 ${
            canSubmit
              ? 'bg-gold text-bg cursor-pointer'
              : 'bg-gold/20 text-fg/40 cursor-not-allowed'
          }`}
        >
          방명록에 남기기 →
        </button>
      </div>

      {/* 피드 */}
      <div className="text-gold mb-3 text-[9px] tracking-[.4em]">· {book.length} NOTES ·</div>
      <div className="flex flex-col gap-2">
        {book.map((g, i) => (
          <div key={i} className="bg-warm border-gold border-l-2 p-[14px]">
            <div className="mb-1.5 flex items-baseline justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[18px]">{g.r}</span>
                <span className="text-gold text-[13px] tracking-[.05em]">{g.n}</span>
              </div>
              <div className="text-fg/40 text-[9px] tracking-[.15em]">{g.t}</div>
            </div>
            <div className="text-fg/88 text-[13px] leading-[1.6]">{g.m}</div>
          </div>
        ))}
      </div>
    </ChapterSection>
  );
}
