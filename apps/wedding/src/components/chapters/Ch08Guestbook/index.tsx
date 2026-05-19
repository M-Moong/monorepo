"use client";

import { useEffect, useRef, useState } from "react";
import type { GuestEntry } from "@repo/types";
import { ChapterSection } from "@/components/ui/ChapterSection";
import { ChHeader } from "@/components/ui/ChHeader";
import { GuestbookStats } from "./GuestbookStats";
import { GuestbookForm, GuestbookFormData } from "./GuestbookForm";
import { GuestbookEntry } from "./GuestbookEntry";

const POLL_INTERVAL = 10_000;

async function fetchEntries(): Promise<GuestEntry[]> {
  const r = await fetch("/api/guestbook");
  const data = await r.json();
  return Array.isArray(data) ? data : [];
}

export function Ch08Guestbook() {
  const [entries, setEntries] = useState<GuestEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const latestIdRef = useRef<string | null>(null);

  // 초기 로드
  useEffect(() => {
    fetchEntries()
      .then((data) => {
        setEntries(data);
        latestIdRef.current = data[0]?.id ?? null;
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // 폴링 — 10초마다 새 항목 확인
  useEffect(() => {
    const timer = setInterval(async () => {
      try {
        const data = await fetchEntries();
        if (data[0]?.id !== latestIdRef.current) {
          setEntries(data);
          latestIdRef.current = data[0]?.id ?? null;
        }
      } catch {
        // 네트워크 오류 무시
      }
    }, POLL_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (data: GuestbookFormData) => {
    const res = await fetch("/api/guestbook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const d = await res.json();
      throw new Error(d.error ?? "저장에 실패했어요.");
    }
    // 제출 후 즉시 반영
    const newEntry: GuestEntry = await res.json();
    setEntries((prev) => [newEntry, ...prev]);
    latestIdRef.current = newEntry.id;
  };

  const counts = entries.reduce<Record<string, number>>(
    (acc, g) => {
      acc[g.side] = (acc[g.side] ?? 0) + 1;
      return acc;
    },
    { groom: 0, bride: 0 },
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

      <p className="mb-[18px] text-[12px] leading-[1.65] text-fg/70">
        식 당일 스크린에 띄워질 따뜻한 한마디.
        <br />
        <span className="text-gold">
          참석 여부는 천천히 알려주셔도 괜찮아요.
        </span>
      </p>

      <GuestbookStats
        total={entries.length}
        groomCount={counts.groom}
        brideCount={counts.bride}
      />

      <GuestbookForm onSubmit={handleSubmit} />

      <div className="mb-3 text-[9px] tracking-[.4em] text-gold">
        · {entries.length} NOTES ·
      </div>

      {loading ? (
        <div className="py-8 text-center text-[11px] tracking-[.2em] text-fg/40">
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
