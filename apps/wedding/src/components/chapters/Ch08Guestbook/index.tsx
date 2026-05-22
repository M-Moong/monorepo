'use client';

import { useEffect, useState } from 'react';
import type { GuestbookPage } from '@/types/guestbook';
import { ChapterSection } from '@/components/ui/ChapterSection';
import { ChHeader } from '@/components/ui/ChHeader';
import { GuestbookStats } from './GuestbookStats';
import { GuestbookForm, GuestbookFormData } from './GuestbookForm';
import { GuestbookSheet } from './GuestbookSheet';

async function fetchPage(page: number): Promise<GuestbookPage> {
  const r = await fetch(`/api/guestbook?page=${page}`);
  if (!r.ok) throw new Error('불러오기 실패');
  return r.json();
}

export function Ch08Guestbook() {
  const [data, setData] = useState<GuestbookPage | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    fetchPage(1)
      .then(setData)
      .catch(() => {});
  }, []);

  const total = data?.total ?? 0;
  const groomCount = data?.groomCount ?? 0;
  const brideCount = data?.brideCount ?? 0;

  const handleSubmit = async (formData: GuestbookFormData) => {
    const res = await fetch('/api/guestbook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (!res.ok) {
      const d = await res.json();
      throw new Error(d.error ?? '저장에 실패했어요.');
    }
    try {
      setData(await fetchPage(1));
    } catch {
      /* 방명록 목록 갱신 실패 시 무시 */
    }
  };

  return (
    <>
      <ChapterSection chIndex={7} scrollable>
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

        <p className="mb-3 text-xs leading-[1.65] text-fg/70">
          식 당일 스크린에 띄워질 따뜻한 한마디.
          <br />
          <span className="text-gold">참석 여부는 천천히 알려주셔도 괜찮아요.</span>
        </p>

        <GuestbookStats total={total} groomCount={groomCount} brideCount={brideCount} />

        <GuestbookForm onSubmit={handleSubmit} />

        <button
          onClick={() => setSheetOpen(true)}
          className="w-full cursor-pointer border border-fg/15 bg-transparent py-3 text-3xs tracking-[0.3rem] text-fg/50 transition-colors hover:border-gold/40 hover:text-gold"
        >
          방명록 전체 보기 ({total})
        </button>
      </ChapterSection>

      <GuestbookSheet open={sheetOpen} total={total} onClose={() => setSheetOpen(false)} />
    </>
  );
}
