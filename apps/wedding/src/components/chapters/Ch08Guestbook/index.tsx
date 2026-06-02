'use client';

import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { BookOpen, PenLine } from 'lucide-react';
import type { GuestbookPage } from '@/types/guestbook';
import { ChapterSection } from '@/components/ui/ChapterSection';
import { ChHeader } from '@/components/ui/ChHeader';
import { GuestbookStats } from './GuestbookStats';
import { GuestbookForm, Side } from './GuestbookForm';

async function fetchPage(page: number): Promise<GuestbookPage> {
  const r = await fetch(`/api/guestbook?page=${page}`);
  if (!r.ok) throw new Error('불러오기 실패');
  return r.json();
}

interface Ch08GuestbookProps {
  onOpenSheet: () => void;
}

export function Ch08Guestbook({ onOpenSheet }: Ch08GuestbookProps) {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ['guestbook', 1],
    queryFn: () => fetchPage(1),
  });

  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  const [reaction, setReaction] = useState<string | null>(null);
  const [side, setSide] = useState<Side>(null);
  const [isPrivate, setIsPrivate] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = name.trim().length > 0 && msg.trim().length > 0 && !submitting;

  const total = data?.total ?? 0;
  const groomCount = data?.groomCount ?? 0;
  const brideCount = data?.brideCount ?? 0;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message: msg, reaction, side, isPrivate }),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error ?? '저장에 실패했어요.');
      }
      setName('');
      setMsg('');
      setReaction(null);
      setSide(null);
      setIsPrivate(false);
      queryClient.invalidateQueries({ queryKey: ['guestbook'] });
      toast('소중한 마음 감사해요 🤍');
    } catch (err) {
      setError(err instanceof Error ? err.message : '저장에 실패했어요.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ChapterSection chIndex={7} scrollable className="py-10">
      <ChHeader
        num={8}
        label="GUESTBOOK"
        title={
          <>
            Leave
            <br />a note.
          </>
        }
      />

      <GuestbookStats
        total={total}
        groomCount={groomCount}
        brideCount={brideCount}
        loading={isLoading}
      />

      <GuestbookForm
        state={{
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
        }}
      />

      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={onOpenSheet}
          className="flex cursor-pointer items-center justify-center gap-2 border border-fg/40 bg-transparent py-3 text-xs tracking-[0.2rem] text-fg/80 transition-colors hover:border-gold/60 hover:text-gold"
        >
          <BookOpen size={14} />
          <span>방명록 목록</span>
        </button>

        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className={`flex items-center justify-center gap-2 border-0 py-3 text-xs font-bold tracking-[0.2rem] transition-all duration-150 ${
            canSubmit
              ? 'cursor-pointer bg-gold text-bg'
              : 'cursor-not-allowed bg-gold/30 text-fg/50'
          }`}
        >
          {!submitting && <PenLine size={14} />}
          <span>{submitting ? '저장 중…' : '방명록 작성'}</span>
        </button>
      </div>
    </ChapterSection>
  );
}
