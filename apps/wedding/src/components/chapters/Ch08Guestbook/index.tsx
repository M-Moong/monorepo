'use client';

import { useEffect, useState } from 'react';
import type { GuestEntry } from '@/types/guestbook';
import { ChapterSection } from '@/components/ui/ChapterSection';
import { ChHeader } from '@/components/ui/ChHeader';
import { GuestbookStats } from './GuestbookStats';
import { GuestbookForm, GuestbookFormData } from './GuestbookForm';
import { GuestbookEntry } from './GuestbookEntry';

async function fetchEntries(): Promise<GuestEntry[]> {
  const r = await fetch('/api/guestbook');
  const data = await r.json();
  return Array.isArray(data) ? data : [];
}

export function Ch08Guestbook() {
  const [entries, setEntries] = useState<GuestEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // 초기 로드
  useEffect(() => {
    fetchEntries()
      .then(setEntries)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const refresh = async () => {
    setRefreshing(true);
    try {
      setEntries(await fetchEntries());
    } catch {
      // 네트워크 오류 무시
    } finally {
      setRefreshing(false);
    }
  };

  const handleSubmit = async (data: GuestbookFormData) => {
    const res = await fetch('/api/guestbook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const d = await res.json();
      throw new Error(d.error ?? '저장에 실패했어요.');
    }
    const newEntry: GuestEntry = await res.json();
    setEntries((prev) => [newEntry, ...prev]);
  };

  const counts = entries.reduce<Record<string, number>>(
    (acc, g) => {
      acc[g.side] = (acc[g.side] ?? 0) + 1;
      return acc;
    },
    { groom: 0, bride: 0 }
  );

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

      <p className="mb-[1.125rem] text-xs leading-[1.65] text-fg/70">
        식 당일 스크린에 띄워질 따뜻한 한마디.
        <br />
        <span className="text-gold">참석 여부는 천천히 알려주셔도 괜찮아요.</span>
      </p>

      <GuestbookStats
        total={entries.length}
        groomCount={counts.groom ?? 0}
        brideCount={counts.bride ?? 0}
      />

      <GuestbookForm onSubmit={handleSubmit} />

      <div className="mb-3 flex items-center justify-between">
        <div className="text-[0.5625rem] tracking-[0.4rem] text-gold">
          · {entries.length} NOTES ·
        </div>
        <button
          onClick={refresh}
          disabled={refreshing}
          className="cursor-pointer border-0 bg-transparent p-1 text-[0.5625rem] tracking-[0.2rem] text-fg/40 transition-opacity disabled:opacity-40"
        >
          {refreshing ? '···' : '↺ 새로고침'}
        </button>
      </div>

      {loading ? (
        <div className="py-8 text-center text-[0.6875rem] tracking-[0.2rem] text-fg/40">
          불러오는 중…
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {entries.map((entry) => (
            <GuestbookEntry key={entry.id} entry={entry} />
          ))}
        </div>
      )}
    </ChapterSection>
  );
}
