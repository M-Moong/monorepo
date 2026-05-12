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
  { n: '민지',  m: '두 분 진짜 잘 어울려요. 행복하세요!',           t: '2일 전', r: '🥹', side: 'bride' },
  { n: '준호',  m: '오빠 드디어 가는구나. 축하한다.',                t: '5일 전', r: '🥂', side: 'groom' },
  { n: '수아',  m: '청첩장 디자인에 감탄하는 중. 너무 두 분 답다.',  t: '1주 전', r: '✨', side: 'bride' },
  { n: '재현',  m: '그날 봐요. 사진 많이 찍어드릴게요 📷',           t: '1주 전', r: '📷', side: 'groom' },
  { n: '예린',  m: 'YES! 무조건 갑니다. 드레스 너무 기대돼요',       t: '2주 전', r: '👰', side: 'bride' },
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

  const counts = book.reduce<Record<GuestSide, number>>((acc, g) => {
    acc[g.side] = (acc[g.side] ?? 0) + 1;
    return acc;
  }, { groom: 0, bride: 0, guest: 0 });

  const inputClass = 'w-full py-3 bg-transparent border-0 border-b border-fg/30 text-fg text-[15px] outline-none box-border placeholder:text-fg/30';

  return (
    <ChapterSection chIndex={7} minHeightAuto>
      <ChHeader num={8} label="GUESTBOOK" title={<>한마디<br />남겨주세요.</>} />

      <p className="text-[12px] text-fg/70 mb-[18px] leading-[1.65]">
        식 당일 스크린에 띄워질 따뜻한 한마디.<br />
        <span className="text-gold">참석 여부는 천천히 알려주셔도 괜찮아요.</span>
      </p>

      {/* 통계 */}
      <div className="grid grid-cols-3 mb-[22px] bg-warm border border-fg/[.08]">
        {([['전체', book.length], ['신랑측', counts.groom], ['신부측', counts.bride]] as [string, number][]).map(([label, count]) => (
          <div key={label} className="py-[14px] px-1 text-center border-r border-fg/[.06]">
            <div className="font-serif text-[26px] italic text-gold leading-none tabular-nums">{count}</div>
            <div className="text-[9px] tracking-[.25em] text-fg/55 mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* 작성 폼 */}
      <div className="bg-warm border border-fg/10 p-4 mb-[22px]">
        <div className="text-[9px] tracking-[.3em] text-gold mb-3">· LEAVE A NOTE ·</div>

        <input
          className={inputClass}
          placeholder="이름 또는 닉네임"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          className={`${inputClass} resize-none pt-2.5 mt-1 mb-[14px]`}
          placeholder="짧고 따뜻한 한마디를 남겨주세요"
          value={msg}
          rows={3}
          onChange={(e) => setMsg(e.target.value)}
        />

        {/* 이모지 */}
        <div className="text-[9px] tracking-[.3em] text-fg/55 mb-2">이모지를 골라주세요 (선택)</div>
        <div className="flex gap-1.5 flex-wrap mb-[14px]">
          {REACTIONS.map((r) => (
            <button
              key={r}
              onClick={() => setReaction(reaction === r ? null : r)}
              className={`w-[38px] h-[38px] rounded-lg text-[18px] cursor-pointer p-0 border transition-all duration-150 ${
                reaction === r
                  ? 'bg-gold/[.18] border-gold'
                  : 'bg-fg/[.05] border-transparent'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* 참석여부 (선택) */}
        <div className="text-[9px] tracking-[.3em] text-fg/55 mb-2">
          참석 여부 (선택 — 나중에 알려주셔도 OK)
        </div>
        <div className="grid grid-cols-3 gap-1 mb-[14px]">
          {([['yes', '갈게요'], ['maybe', '아직 몰라요'], ['no', '못 가요']] as [AttendStatus, string][]).map(([k, l]) => (
            <button
              key={k}
              onClick={() => setAttend(attend === k ? null : k)}
              className={`py-2.5 cursor-pointer text-[11px] tracking-[.05em] border transition-all duration-200 ${
                attend === k
                  ? 'bg-gold text-bg border-gold'
                  : 'bg-transparent text-fg border-fg/[.18]'
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        <button
          onClick={submit}
          disabled={!canSubmit}
          className={`w-full py-[14px] border-0 tracking-[.25em] text-[11px] font-bold transition-all duration-150 ${
            canSubmit
              ? 'bg-gold text-bg cursor-pointer'
              : 'bg-gold/20 text-fg/40 cursor-not-allowed'
          }`}
        >
          방명록에 남기기 →
        </button>
      </div>

      {/* 피드 */}
      <div className="text-[9px] tracking-[.4em] text-gold mb-3">· {book.length} NOTES ·</div>
      <div className="flex flex-col gap-2">
        {book.map((g, i) => (
          <div key={i} className="p-[14px] bg-warm border-l-2 border-gold">
            <div className="flex justify-between items-baseline mb-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[18px]">{g.r}</span>
                <span className="text-[13px] text-gold tracking-[.05em]">{g.n}</span>
              </div>
              <div className="text-[9px] text-fg/40 tracking-[.15em]">{g.t}</div>
            </div>
            <div className="text-[13px] text-fg/88 leading-[1.6]">{g.m}</div>
          </div>
        ))}
      </div>
    </ChapterSection>
  );
}
