'use client';

import { Input } from '@repo/ui/components/input';
import { Textarea } from '@repo/ui/components/textarea';
import { TabButton } from '@/components/ui/TabButton';

export type Side = 'guest' | 'groom' | 'bride';

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

const REACTIONS = ['🥹', '🌷', '✨', '🫶', '📷', '🎉', '💍'];

const SIDE_OPTIONS: [Side, string][] = [
  ['guest', '💑 함께'],
  ['groom', '🤵 신랑'],
  ['bride', '👰 신부'],
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

      <div className="relative">
        <Input
          className={inputClass}
          placeholder="이름 or 닉네임"
          value={name}
          maxLength={20}
          onChange={(e) => setName(e.target.value)}
        />
        <span
          className={`absolute right-2 bottom-2 text-3xs tabular-nums ${name.length >= 20 ? 'text-red-400' : 'text-fg/30'}`}
        >
          {name.length} / 20
        </span>
      </div>

      <div className="relative mt-1.5 mb-3">
        <Textarea
          className={`${inputClass} resize-none pt-3 pb-5`}
          placeholder="짧고 따뜻한 한마디를 남겨주세요"
          value={msg}
          rows={3}
          maxLength={300}
          onChange={(e) => setMsg(e.target.value)}
        />
        <span
          className={`absolute right-2 bottom-2 text-3xs tabular-nums ${msg.length >= 300 ? 'text-red-400' : 'text-fg/30'}`}
        >
          {msg.length} / 300
        </span>
      </div>

      <div className="mb-1.5 text-3xs tracking-[0.3rem] text-fg/55">누구에게 쓸까요?</div>
      <div className="grid grid-cols-3 gap-1.5">
        {SIDE_OPTIONS.map(([k, l]) => (
          <TabButton
            key={k}
            active={side === k}
            onClick={() => setSide(k)}
            className="rounded-md py-3 text-sm tracking-normal"
            variant="outline"
          >
            {l}
          </TabButton>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-1.5">
        <span className="shrink-0 text-3xs tracking-[0.2rem] text-fg/55">이모지</span>
        <div className="flex flex-1 items-center justify-between">
          {REACTIONS.map((r) => (
            <button
              key={r}
              onClick={() => setReaction(reaction === r ? null : r)}
              aria-label={`이모지 ${r} 선택`}
              className={`flex cursor-pointer items-center justify-center rounded-md border p-2 text-base leading-none transition-all duration-150 ${
                reaction === r ? 'border-gold bg-gold/10' : 'border-fg/15 bg-transparent opacity-60'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3">
        <div className="flex items-center gap-1.5">
          <span className="mr-auto shrink-0 text-3xs tracking-[0.2rem] text-fg/55">공개 범위</span>
          <TabButton
            active={!isPrivate}
            onClick={() => setIsPrivate(false)}
            className="rounded-md px-2.5 py-1.5 tracking-normal"
            variant="outline"
          >
            🌐 모두 공개
          </TabButton>
          <TabButton
            active={isPrivate}
            onClick={() => setIsPrivate(true)}
            className="rounded-md px-2.5 py-1.5 tracking-normal"
            variant="outline"
          >
            💌 비밀 공개
          </TabButton>
        </div>
        <p className="mt-1.5 text-right text-3xs text-fg/35">
          비밀 공개 글은 신랑·신부만 확인할 수 있어요.
        </p>
      </div>

      {error && <p className="mt-2 text-2xs text-red-400">{error}</p>}
    </div>
  );
}
