'use client';

import { useEffect, useRef, useState } from 'react';
import type { GuestbookPage } from '@/types/guestbook';
import { ChapterSection } from '@/components/ui/ChapterSection';
import { ChHeader } from '@/components/ui/ChHeader';
import { GuestbookStats } from './GuestbookStats';
import { GuestbookForm, GuestbookFormData } from './GuestbookForm';
import { GuestbookEntry } from './GuestbookEntry';
import { GuestbookPagination } from './GuestbookPagination';

async function fetchPage(page: number): Promise<GuestbookPage> {
  const r = await fetch(`/api/guestbook?page=${page}`);
  if (!r.ok) throw new Error('불러오기 실패');
  return r.json();
}

export function Ch08Guestbook() {
  const [data, setData] = useState<GuestbookPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchPage(1)
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const goToPage = async (page: number) => {
    setPageLoading(true);
    try {
      const result = await fetchPage(page);
      setData(result);
      listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch {
      // 페이지 이동 실패는 조용히 무시
    } finally {
      setPageLoading(false);
    }
  };

  const refresh = () => goToPage(data?.page ?? 1);

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
    // 저장 성공 후 1페이지로 이동해 새 글 확인
    try {
      setData(await fetchPage(1));
    } catch {
      // 갱신 실패 시 폼 성공은 유지, 수동 새로고침 가능
    }
  };

  const entries = data?.entries ?? [];
  const total = data?.total ?? 0;
  const groomCount = data?.groomCount ?? 0;
  const brideCount = data?.brideCount ?? 0;
  const page = data?.page ?? 1;
  const totalPages = data?.totalPages ?? 1;

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

      <p className="mb-4.5 text-xs leading-[1.65] text-fg/70">
        식 당일 스크린에 띄워질 따뜻한 한마디.
        <br />
        <span className="text-gold">참석 여부는 천천히 알려주셔도 괜찮아요.</span>
      </p>

      <GuestbookStats total={total} groomCount={groomCount} brideCount={brideCount} />

      <GuestbookForm onSubmit={handleSubmit} />

      <div ref={listRef} className="mb-3 flex items-center justify-between">
        <div className="text-[0.5625rem] tracking-[0.4rem] text-gold">· {total} NOTES ·</div>
        <button
          onClick={refresh}
          disabled={pageLoading || loading}
          className="cursor-pointer border-0 bg-transparent p-1 text-[0.5625rem] tracking-[0.2rem] text-fg/40 transition-opacity disabled:opacity-40"
        >
          {pageLoading ? '···' : '↺ 새로고침'}
        </button>
      </div>

      {loading ? (
        <div className="py-8 text-center text-[0.6875rem] tracking-[0.2rem] text-fg/40">
          불러오는 중…
        </div>
      ) : entries.length === 0 ? (
        <div className="py-8 text-center text-[0.6875rem] tracking-[0.2rem] text-fg/40">
          아직 남겨진 메시지가 없어요.
        </div>
      ) : (
        <div
          className={`flex flex-col gap-2 transition-opacity duration-150 ${pageLoading ? 'opacity-40' : 'opacity-100'}`}
        >
          {entries.map((entry) => (
            <GuestbookEntry key={entry.id} entry={entry} />
          ))}
        </div>
      )}

      <GuestbookPagination
        page={page}
        totalPages={totalPages}
        onPageChange={goToPage}
        loading={pageLoading}
      />
    </ChapterSection>
  );
}
