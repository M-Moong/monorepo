'use client';

import { useEffect, useRef, useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@repo/ui/components/sheet';
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
      /* 페이지 로드 실패 시 기존 데이터 유지 */
    } finally {
      setPageLoading(false);
    }
  };

  const entries = data?.entries ?? [];
  const page = data?.page ?? 1;
  const totalPages = data?.totalPages ?? 1;

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent
        side="bottom"
        showCloseButton={false}
        className="flex max-h-[78dvh] flex-col gap-0 rounded-none border-0 bg-bg px-0 pb-0"
      >
        <SheetHeader className="shrink-0 flex-row items-center justify-between px-5.5 pt-4 pb-3">
          <SheetTitle className="text-3xs font-normal tracking-[0.4rem] text-gold">
            · {total} NOTES ·
          </SheetTitle>
          <button
            onClick={onClose}
            className="flex cursor-pointer items-center border-0 bg-transparent p-1 text-3xs tracking-[0.2rem] text-fg/40"
          >
            <span>닫기 ✕</span>
          </button>
        </SheetHeader>

        <div className="mx-5.5 mb-3 h-px bg-fg/8" />

        {/* 리스트 */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-5.5">
          {loading ? (
            <div className="flex items-center justify-center py-12 text-2xs tracking-[0.2rem] text-fg/40">
              <span>불러오는 중…</span>
            </div>
          ) : entries.length === 0 ? (
            <div className="flex items-center justify-center py-12 text-2xs tracking-[0.2rem] text-fg/40">
              <span>아직 남겨진 메시지가 없어요.</span>
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
      </SheetContent>
    </Sheet>
  );
}
