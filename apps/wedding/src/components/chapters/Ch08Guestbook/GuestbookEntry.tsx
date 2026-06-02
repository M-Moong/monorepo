'use client';

import { useState } from 'react';
import type { GuestEntry } from '@/types/guestbook';

function formatRelativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  const weeks = Math.floor(days / 7);
  if (mins < 1) return '방금';
  if (mins < 60) return `${mins}분 전`;
  if (hours < 24) return `${hours}시간 전`;
  if (days < 7) return `${days}일 전`;
  return `${weeks}주 전`;
}

interface GuestbookEntryProps {
  entry: GuestEntry;
}

export function GuestbookEntry({ entry: g }: GuestbookEntryProps) {
  const [likes, setLikes] = useState(g.likes);
  const [liked, setLiked] = useState(false);
  const [pressing, setPressing] = useState(false);

  const handleLike = async () => {
    if (liked) return;
    setLiked(true);
    setLikes((n) => n + 1);
    try {
      const res = await fetch(`/api/guestbook/${g.id}/like`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setLikes(data.likes);
      }
    } catch {
      setLiked(false);
      setLikes((n) => n - 1);
    }
  };

  return (
    <div className={`border-l-2 bg-warm p-3.5 ${g.isPrivate ? 'border-fg/20' : 'border-gold'}`}>
      <div className="mb-1.5 flex items-baseline justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">{g.isPrivate ? '🔒' : g.reaction}</span>
          <span
            className={`text-2sm tracking-[0.05rem] ${g.isPrivate ? 'text-fg/50' : 'text-gold'}`}
          >
            {g.name}
          </span>
        </div>
        <div className="text-3xs tracking-[0.15rem] text-fg/40">
          {formatRelativeTime(g.createdAt)}
        </div>
      </div>

      <p className={`text-2sm leading-[1.6] ${g.isPrivate ? 'text-fg/35 italic' : 'text-fg/88'}`}>
        {g.message}
      </p>

      <div className="mt-2 flex justify-end">
        <button
          onClick={handleLike}
          onMouseDown={() => setPressing(true)}
          onMouseUp={() => setPressing(false)}
          onMouseLeave={() => setPressing(false)}
          disabled={liked}
          aria-label="좋아요"
          className={`flex cursor-pointer items-center gap-1 rounded-full border px-2.5 py-1 text-3xs transition-all duration-150 ${
            liked
              ? 'cursor-default border-transparent bg-transparent text-gold/70'
              : pressing
                ? 'scale-90 border-gold/40 bg-gold/10 text-gold'
                : 'border-fg/10 bg-transparent text-fg/30 hover:border-gold/40 hover:text-gold/70'
          }`}
        >
          <span
            className={`text-xs transition-transform duration-150 ${pressing ? 'scale-125' : ''}`}
          >
            {liked ? '❤️' : '🤍'}
          </span>
          {likes > 0 && <span className="tabular-nums">{likes}</span>}
        </button>
      </div>
    </div>
  );
}
