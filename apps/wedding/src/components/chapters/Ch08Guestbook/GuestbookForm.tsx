'use client';

import { Input } from '@repo/ui/components/input';
import { Textarea } from '@repo/ui/components/textarea';
import { TabButton } from '@/components/ui/TabButton';

export type Side = 'groom' | 'bride' | null;

export interface GuestbookFormData {
  name: string;
  message: string;
  reaction: string | null;
  side: Side;
  isPrivate: boolean;
}

export interface GuestbookFormState {
  name: string;
  msg: string;
  reaction: string | null;
  side: Side;
  isPrivate: boolean;
  setName: (v: string) => void;
  setMsg: (v: string) => void;
  setReaction: (v: string | null) => void;
  setSide: (v: Side) => void;
  setIsPrivate: (v: boolean) => void;
  error: string | null;
}

interface GuestbookFormProps {
  state: GuestbookFormState;
}

const REACTIONS = ['🥹', '🥂', '✨', '🫶', '📷', '🎉', '💍', '🌷'];

const SIDE_OPTIONS: [NonNullable<Side>, string][] = [
  ['groom', '🤵 신랑측'],
  ['bride', '👰 신부측'],
];

const inputClass =
  'w-full rounded-md border-0 bg-fg/5 px-3 py-3 text-2sm text-fg shadow-none outline-none ring-0 placeholder:text-fg/30 focus-visible:ring-0';

export function GuestbookForm({ state }: GuestbookFormProps) {
  const {
    name,
    msg,
    reaction,
    side,
    isPrivate,
    setName,
    setMsg,
    setReaction,
    setSide,
    setIsPrivate,
    error,
  } = state;

  return (
    <div className="mb-3 border border-fg/10 bg-warm p-3.5">
      <div className="mb-2.5 text-3xs tracking-[0.3rem] text-gold">· LEAVE A NOTE ·</div>

      <Input
        className={inputClass}
        placeholder="이름 또는 닉네임"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Textarea
        className={`${inputClass} mt-1.5 mb-3 resize-none pt-3`}
        placeholder="짧고 따뜻한 한마디를 남겨주세요"
        value={msg}
        rows={2}
        onChange={(e) => setMsg(e.target.value)}
      />

      <div className="mb-1.5 text-3xs tracking-[0.3rem] text-fg/55">이모지 (선택)</div>
      <div className="mb-3 flex flex-wrap justify-around gap-1.5">
        {REACTIONS.map((r) => (
          <button
            key={r}
            onClick={() => setReaction(reaction === r ? null : r)}
            aria-label={`이모지 ${r} 선택`}
            className={`h-9 w-9 cursor-pointer rounded-lg border p-0 text-lg transition-all duration-150 ${
              reaction === r ? 'border-gold bg-gold/18' : 'border-transparent bg-fg/5'
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      <div className="mb-1.5 text-3xs tracking-[0.3rem] text-fg/55">어느 쪽으로 오세요? (선택)</div>
      <div className="grid grid-cols-2 gap-2">
        {SIDE_OPTIONS.map(([k, l]) => (
          <TabButton
            key={k}
            active={side === k}
            onClick={() => setSide(side === k ? null : k)}
            className="rounded-md py-2 text-xs tracking-[0.05rem]"
          >
            {l}
          </TabButton>
        ))}
      </div>

      <button
        onClick={() => setIsPrivate(!isPrivate)}
        className={`mt-2 flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-md border py-2 text-2xs tracking-[0.1rem] transition-all duration-150 ${
          isPrivate
            ? 'border-gold/60 bg-gold/10 text-gold'
            : 'border-fg/10 bg-transparent text-fg/40'
        }`}
      >
        <span>{isPrivate ? '🔒' : '🔓'}</span>
        <span>{isPrivate ? '비밀글로 남기기' : '모두에게 공개'}</span>
      </button>

      {error && <p className="mt-2 text-2xs text-red-400">{error}</p>}
    </div>
  );
}
