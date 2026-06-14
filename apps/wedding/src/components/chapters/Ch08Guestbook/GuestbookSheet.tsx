'use client';

import { useRef, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
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
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [visible, setVisible] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const prevOpen = useRef(false);
  if (open && !prevOpen.current) {
    setCurrentPage(1);
  }
  prevOpen.current = open;

  const { data, isLoading } = useQuery({
    queryKey: ['guestbook', currentPage],
    queryFn: () => fetchPage(currentPage),
    enabled: open,
  });

  const goToPage = async (page: number) => {
    setVisible(false);
    await new Promise((r) => setTimeout(r, 200));
    await queryClient.prefetchQuery({
      queryKey: ['guestbook', page],
      queryFn: () => fetchPage(page),
    });
    setCurrentPage(page);
    scrollRef.current?.scrollTo({ top: 0 });
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
          <div ref={scrollRef} className="relative flex-1 overflow-y-auto px-5.5">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 size={20} className="animate-spin text-fg/30" />
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
            {!visible && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="size-5 animate-spin text-fg/30" />
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
