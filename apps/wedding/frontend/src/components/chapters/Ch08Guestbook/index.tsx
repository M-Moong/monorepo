'use client';

import { useEffect, useRef, useState } from 'react';
import type { GuestEntry } from '@repo/types';
import { ChapterSection } from '@/components/ui/ChapterSection';
import { ChHeader } from '@/components/ui/ChHeader';
import { GuestbookStats } from './GuestbookStats';
import { GuestbookForm, GuestbookFormData } from './GuestbookForm';
import { GuestbookEntry } from './GuestbookEntry';

export function Ch08Guestbook() {
  const [entries, setEntries] = useState<GuestEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const seenIds = useRef(new Set<string>());

  // 초기 목록 로드
  useEffect(() => {
    fetch('/api/guestbook')
      .then((r) => r.json())
      .then((data: GuestEntry[]) => {
        if (Array.isArray(data)) {
          data.forEach((e) => seenIds.current.add(e.id));
          setEntries(data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // SSE 실시간 수신 — 다른 사람이 남긴 방명록 즉시 반영
  useEffect(() => {
    const es = new EventSource('/api/guestbook/stream');

    es.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data) as GuestEntry & { type?: string };
        if (data.type === 'connected' || !data.id || seenIds.current.has(data.id)) return;
        seenIds.current.add(data.id);
        setEntries((prev) => [data, ...prev]);
      } catch {
        // 파싱 실패 무시
      }
    };

    return () => es.close();
  }, []);

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
    // SSE로 자동 수신되므로 수동 추가 불필요
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

      <p className="text-fg/70 mb-[18px] text-[12px] leading-[1.65]">
        식 당일 스크린에 띄워질 따뜻한 한마디.
        <br />
        <span className="text-gold">참석 여부는 천천히 알려주셔도 괜찮아요.</span>
      </p>

      <GuestbookStats total={entries.length} groomCount={counts.groom} brideCount={counts.bride} />

      <GuestbookForm onSubmit={handleSubmit} />

      <div className="text-gold mb-3 text-[9px] tracking-[.4em]">· {entries.length} NOTES ·</div>

      {loading ? (
        <div className="text-fg/40 py-8 text-center text-[11px] tracking-[.2em]">불러오는 중…</div>
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
