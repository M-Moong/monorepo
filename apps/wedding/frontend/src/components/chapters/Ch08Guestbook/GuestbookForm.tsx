'use client';

import { useState } from 'react';

export type Side = 'groom' | 'bride' | null;
export type AttendStatus = 'yes' | 'maybe' | 'no' | null;

export interface GuestbookFormData {
  name: string;
  message: string;
  reaction: string | null;
  side: Side;
  attend: AttendStatus;
}

interface GuestbookFormProps {
  onSubmit: (data: GuestbookFormData) => Promise<void>;
}

const REACTIONS = ['🥹', '🥂', '✨', '🫶', '📷', '🎉', '💍', '🌷'];

const ATTEND_OPTIONS: [AttendStatus, string][] = [
  ['yes', '갈게요'],
  ['maybe', '아직 몰라요'],
  ['no', '못 가요'],
];

const inputClass =
  'w-full py-3 bg-transparent border-0 border-b border-fg/30 text-fg text-[15px] outline-none box-border placeholder:text-fg/30';

export function GuestbookForm({ onSubmit }: GuestbookFormProps) {
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  const [reaction, setReaction] = useState<string | null>(null);
  const [side, setSide] = useState<Side>(null);
  const [attend, setAttend] = useState<AttendStatus>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = name.trim().length > 0 && msg.trim().length > 0 && !submitting;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);
    try {
      await onSubmit({ name, message: msg, reaction, side, attend });
      setName('');
      setMsg('');
      setReaction(null);
      setSide(null);
      setAttend(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : '저장에 실패했어요.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
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

      <div className="text-fg/55 mb-2 text-[9px] tracking-[.3em]">이모지를 골라주세요 (선택)</div>
      <div className="mb-[14px] flex flex-wrap gap-1.5">
        {REACTIONS.map((r) => (
          <button
            key={r}
            onClick={() => setReaction(reaction === r ? null : r)}
            aria-label={`이모지 ${r} 선택`}
            className={`h-[38px] w-[38px] cursor-pointer rounded-lg border p-0 text-[18px] transition-all duration-150 ${
              reaction === r ? 'bg-gold/[.18] border-gold' : 'bg-fg/[.05] border-transparent'
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      <div className="text-fg/55 mb-2 text-[9px] tracking-[.3em]">어느 쪽으로 오세요? (선택)</div>
      <div className="mb-[14px] grid grid-cols-2 gap-1">
        {(['groom', 'bride'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setSide(side === s ? null : s)}
            className={`cursor-pointer border py-2.5 text-[11px] tracking-[.05em] transition-all duration-200 ${
              side === s ? 'bg-gold text-bg border-gold' : 'text-fg border-fg/[.18] bg-transparent'
            }`}
          >
            {s === 'groom' ? '신랑측' : '신부측'}
          </button>
        ))}
      </div>

      <div className="text-fg/55 mb-2 text-[9px] tracking-[.3em]">
        참석 여부 (선택 — 나중에 알려주셔도 OK)
      </div>
      <div className="mb-[14px] grid grid-cols-3 gap-1">
        {ATTEND_OPTIONS.map(([k, l]) => (
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

      {error && <p className="mb-2 text-[11px] text-red-400">{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={!canSubmit}
        className={`w-full border-0 py-[14px] text-[11px] font-bold tracking-[.25em] transition-all duration-150 ${
          canSubmit ? 'bg-gold text-bg cursor-pointer' : 'bg-gold/20 text-fg/40 cursor-not-allowed'
        }`}
      >
        {submitting ? '저장 중…' : '방명록에 남기기 →'}
      </button>
    </div>
  );
}
