import type { GuestEntry } from "@repo/types";

function formatRelativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  const weeks = Math.floor(days / 7);
  if (mins < 1) return "방금";
  if (mins < 60) return `${mins}분 전`;
  if (hours < 24) return `${hours}시간 전`;
  if (days < 7) return `${days}일 전`;
  return `${weeks}주 전`;
}

interface GuestbookEntryProps {
  entry: GuestEntry;
}

export function GuestbookEntry({ entry: g }: GuestbookEntryProps) {
  return (
    <div className="border-l-2 border-gold bg-warm p-[14px]">
      <div className="mb-1.5 flex items-baseline justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[18px]">{g.reaction}</span>
          <span className="text-[13px] tracking-[.05em] text-gold">
            {g.name}
          </span>
        </div>
        <div className="text-[9px] tracking-[.15em] text-fg/40">
          {formatRelativeTime(g.createdAt)}
        </div>
      </div>
      <div className="text-[13px] leading-[1.6] text-fg/88">{g.message}</div>
    </div>
  );
}
