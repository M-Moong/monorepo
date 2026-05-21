'use client';

import { useEffect, useRef, useState } from 'react';
import type { GuestbookPage } from '@/types/guestbook';
import { GuestbookEntry } from './GuestbookEntry';
import { GuestbookPagination } from './GuestbookPagination';

async function fetchPage(page: number): Promise<GuestbookPage> {
  const r = await fetch(`/api/guestbook?page=${page}`);
  if (!r.ok) throw new Error('불러오기 실패');
  return r.json();
}

interface GuestbookSheetProps {
  open: boolean;
  total: number;
  onClose: () => void;
}

export function GuestbookSheet({ open, total, onClose }: GuestbookSheetProps) {
  const [data, setData] = useState<GuestbookPage | null>(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    fetchPage(1)
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [open]);

  const goToPage = async (page: number) => {
    setPageLoading(true);
    try {
      setData(await fetchPage(page));
      scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
    } finally {
      setPageLoading(false);
    }
  };

  const entries = data?.entries ?? [];
  const page = data?.page ?? 1;
  const totalPages = data?.totalPages ?? 1;

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-70 flex flex-col justify-end">
      {/* 딤 */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* 시트 */}
      <div className="relative flex max-h-[78dvh] w-full flex-col bg-bg">
        {/* 핸들 + 헤더 */}
        <div className="flex shrink-0 items-center justify-between px-5.5 pt-4 pb-3">
          <div className="text-[0.5625rem] tracking-[0.4rem] text-gold">· {total} NOTES ·</div>
          <button
            onClick={onClose}
            className="cursor-pointer border-0 bg-transparent p-1 text-[0.5625rem] tracking-[0.2rem] text-fg/40"
          >
            닫기 ✕
          </button>
        </div>

        <div className="mx-5.5 mb-3 h-px bg-fg/8" />

        {/* 리스트 */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-5.5">
          {loading ? (
            <div className="py-12 text-center text-[0.6875rem] tracking-[0.2rem] text-fg/40">
              불러오는 중…
            </div>
          ) : entries.length === 0 ? (
            <div className="py-12 text-center text-[0.6875rem] tracking-[0.2rem] text-fg/40">
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
        </div>

        {/* 페이지네이션 */}
        <div className="shrink-0 px-5.5 pb-8">
          <GuestbookPagination
            page={page}
            totalPages={totalPages}
            onPageChange={goToPage}
            loading={pageLoading}
          />
        </div>
      </div>
    </div>
  );
}
