'use client';

import { useState } from 'react';
import { TabButton } from '@/components/ui/TabButton';

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

const SIDE_OPTIONS: [NonNullable<Side>, string][] = [
  ['groom', '신랑측'],
  ['bride', '신부측'],
];

const ATTEND_OPTIONS: [NonNullable<AttendStatus>, string][] = [
  ['yes', '갈게요'],
  ['maybe', '아직 몰라요'],
  ['no', '못 가요'],
];

const inputClass =
  'w-full py-3 bg-transparent border-0 border-b border-fg/30 text-fg text-[0.9375rem] outline-none box-border placeholder:text-fg/30';

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
    <div className="mb-5.5 border border-fg/10 bg-warm p-4">
      <div className="mb-3 text-[0.5625rem] tracking-[0.3rem] text-gold">· LEAVE A NOTE ·</div>

      <input
        className={inputClass}
        placeholder="이름 또는 닉네임"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <textarea
        className={`${inputClass} mt-1 mb-3.5 resize-none pt-2.5`}
        placeholder="짧고 따뜻한 한마디를 남겨주세요"
        value={msg}
        rows={3}
        onChange={(e) => setMsg(e.target.value)}
      />

      <div className="mb-2 text-[0.5625rem] tracking-[0.3rem] text-fg/55">
        이모지를 골라주세요 (선택)
      </div>
      <div className="mb-3.5 flex flex-wrap gap-1.5">
        {REACTIONS.map((r) => (
          <button
            key={r}
            onClick={() => setReaction(reaction === r ? null : r)}
            aria-label={`이모지 ${r} 선택`}
            className={`h-[2.375rem] w-[2.375rem] cursor-pointer rounded-lg border p-0 text-lg transition-all duration-150 ${
              reaction === r ? 'border-gold bg-gold/18' : 'border-transparent bg-fg/5'
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      <div className="mb-2 text-[0.5625rem] tracking-[0.3rem] text-fg/55">
        어느 쪽으로 오세요? (선택)
      </div>
      <div className="mb-3.5 grid grid-cols-2 gap-1">
        {SIDE_OPTIONS.map(([k, l]) => (
          <TabButton
            key={k}
            active={side === k}
            onClick={() => setSide(side === k ? null : k)}
            className="text-[0.6875rem] tracking-[0.05rem]"
          >
            {l}
          </TabButton>
        ))}
      </div>

      <div className="mb-2 text-[0.5625rem] tracking-[0.3rem] text-fg/55">
        참석 여부 (선택 — 나중에 알려주셔도 OK)
      </div>
      <div className="mb-3.5 grid grid-cols-3 gap-1">
        {ATTEND_OPTIONS.map(([k, l]) => (
          <TabButton
            key={k}
            active={attend === k}
            onClick={() => setAttend(attend === k ? null : k)}
            className="text-[0.6875rem] tracking-[0.05rem]"
          >
            {l}
          </TabButton>
        ))}
      </div>

      {error && <p className="mb-2 text-[0.6875rem] text-red-400">{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={!canSubmit}
        className={`w-full border-0 py-3.5 text-[0.6875rem] font-bold tracking-[0.25rem] transition-all duration-150 ${
          canSubmit ? 'cursor-pointer bg-gold text-bg' : 'cursor-not-allowed bg-gold/20 text-fg/40'
        }`}
      >
        {submitting ? '저장 중…' : '방명록에 남기기 →'}
      </button>
    </div>
  );
}
