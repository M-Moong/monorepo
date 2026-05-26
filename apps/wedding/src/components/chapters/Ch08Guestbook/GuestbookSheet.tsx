'use client';

import { useEffect, useRef, useState } from 'react';
import { Drawer } from 'vaul';
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
  onClose: () => void;
}

export function GuestbookSheet({ open, onClose }: GuestbookSheetProps) {
  const [data, setData] = useState<GuestbookPage | null>(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(true);
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
    // 1. fade-out
    setVisible(false);
    await new Promise((r) => setTimeout(r, 200));

    // 2. 데이터 교체
    try {
      const next = await fetchPage(page);
      setData(next);
      scrollRef.current?.scrollTo({ top: 0 });
    } catch {
      /* 실패 시 기존 데이터 유지 */
    }

    // 3. fade-in
    setVisible(true);
  };

  const entries = data?.entries ?? [];
  const page = data?.page ?? 1;
  const totalPages = data?.totalPages ?? 1;

  return (
    <Drawer.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-black/50" />
        <Drawer.Content className="fixed inset-x-0 bottom-0 z-50 flex max-h-[78dvh] flex-col rounded-none border-0 bg-bg outline-none">
          {/* 헤더 */}
          <div className="flex shrink-0 flex-row items-center justify-between px-5.5 pt-4 pb-5">
            <Drawer.Title className="text-3xs font-normal tracking-[0.4rem] text-gold">
              · GUESTBOOK ·
            </Drawer.Title>
            <button
              onClick={onClose}
              className="flex cursor-pointer items-center border-0 bg-transparent p-1 text-2xs tracking-[0.2rem] text-fg/40"
            >
              <span>닫기 ✕</span>
            </button>
          </div>

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
                className="flex flex-col gap-3 transition-opacity duration-200"
                style={{ opacity: visible ? 1 : 0 }}
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
              loading={!visible}
            />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
