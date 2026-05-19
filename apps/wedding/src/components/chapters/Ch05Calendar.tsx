"use client";

import { useState } from "react";
import { ChapterSection } from "@/components/ui/ChapterSection";
import { ChHeader } from "@/components/ui/ChHeader";
import { useCountdown } from "@/hooks/useCountdown";
import { WEDDING } from "@/data/wedding";

const DAYS_HEADER = ["S", "M", "T", "W", "T", "F", "S"];

const calYear = WEDDING.date.getFullYear();
const calMonth = WEDDING.date.getMonth();
const CAL_MONTH_LABEL = WEDDING.date.toLocaleString("en-US", {
  month: "long",
  year: "numeric",
  timeZone: "Asia/Seoul",
});
const MONTH_START_DOW = new Date(calYear, calMonth, 1).getDay();
const MONTH_DAYS = new Date(calYear, calMonth + 1, 0).getDate();
const calendarCells = Array.from({ length: 35 }, (_, i) => {
  const d = i - MONTH_START_DOW + 1;
  return d >= 1 && d <= MONTH_DAYS ? d : null;
});

// ── 캘린더 유틸 ────────────────────────────────────────────────────────────────

function buildIcs(): string {
  const loc = `${WEDDING.venue.name}\\, ${WEDDING.venue.address}`;
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//MnS Wedding//KO",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `DTSTART:${WEDDING.utcStart}`,
    `DTEND:${WEDDING.utcEnd}`,
    `SUMMARY:${WEDDING.groom.name} & ${WEDDING.bride.name} 결혼식`,
    `DESCRIPTION:${WEDDING.groom.name} & ${WEDDING.bride.name}의 결혼을 축하해 주세요.`,
    `LOCATION:${loc}`,
    `UID:mns-${WEDDING.utcStart.slice(0, 8)}@wedding`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

const GOOGLE_CALENDAR_URL = (() => {
  const p = new URLSearchParams({
    action: "TEMPLATE",
    text: `${WEDDING.groom.name} & ${WEDDING.bride.name} 결혼식`,
    dates: `${WEDDING.utcStart}/${WEDDING.utcEnd}`,
    details: `${WEDDING.groom.name} & ${WEDDING.bride.name}의 결혼을 축하해 주세요.\n\n${WEDDING.venue.name}\n${WEDDING.venue.address}`,
    location: `${WEDDING.venue.name}, ${WEDDING.venue.address}`,
  });
  return `https://calendar.google.com/calendar/r/eventedit?${p}`;
})();

function downloadIcsFile() {
  const blob = new Blob([buildIcs()], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "mns-wedding-2026.ics";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ── 컴포넌트 ───────────────────────────────────────────────────────────────────

export function Ch05Calendar() {
  const cd = useCountdown(WEDDING.date);
  const [showPicker, setShowPicker] = useState(false);

  const addToCalendar = async () => {
    const file = new File([buildIcs()], "mns-wedding-2026.ics", {
      type: "text/calendar",
    });

    // Web Share API — iOS 15+ / Android Chrome 86+ 에서 네이티브 공유 시트 표시
    // 사용자가 "캘린더에 추가"를 선택하면 OS가 직접 처리
    if (
      typeof navigator.share === "function" &&
      typeof navigator.canShare === "function" &&
      navigator.canShare({ files: [file] })
    ) {
      try {
        await navigator.share({ files: [file] });
        return;
      } catch (err) {
        // AbortError = 사용자가 직접 닫음 → 피커 불필요
        if (err instanceof Error && err.name === "AbortError") return;
      }
    }

    // 폴백: 앱 선택 피커
    setShowPicker(true);
  };

  return (
    <ChapterSection chIndex={4}>
      <ChHeader
        num={5}
        label="WHEN"
        title={
          <>
            The
            <br />
            day.
          </>
        }
      />

      {/* 달력 */}
      <div className="mb-[1.375rem] bg-warm p-[1.125rem]">
        <div className="mb-3.5 flex justify-between">
          <div className="font-serif text-[1.375rem] text-fg italic">
            {CAL_MONTH_LABEL}
          </div>
          <div className="text-[0.625rem] tracking-[0.2rem] text-gold">
            {WEDDING.timeText}
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 text-[0.5625rem] tracking-[0.1rem]">
          {DAYS_HEADER.map((d, i) => (
            <div
              key={i}
              className={`py-1 text-center ${
                i === 0
                  ? "text-[#d97777]"
                  : i === 6
                    ? "text-gold"
                    : "text-fg/50"
              }`}
            >
              {d}
            </div>
          ))}
          {calendarCells.map((d, i) => {
            const dow = i % 7;
            const isWedding = d === WEDDING.date.getDate();
            return (
              <div
                key={i}
                className={`py-2 text-center text-[0.8125rem] ${
                  !d
                    ? "text-transparent"
                    : isWedding
                      ? "bg-gold font-bold text-bg"
                      : dow === 0
                        ? "text-[#d97777]"
                        : dow === 6
                          ? "text-gold"
                          : "text-fg"
                }`}
              >
                {d ?? "·"}
              </div>
            );
          })}
        </div>
      </div>

      {/* 카운트다운 */}
      <div className="grid grid-cols-4 gap-1.5">
        {(
          [
            ["DAYS", cd.d],
            ["HRS", cd.h],
            ["MIN", cd.m],
            ["SEC", cd.s],
          ] as [string, number][]
        ).map(([label, val]) => (
          <div
            key={label}
            className="border border-fg/[.08] bg-warm px-1.5 py-3.5 text-center"
          >
            <div className="font-serif text-[1.75rem] leading-none text-gold italic tabular-nums">
              {String(val).padStart(2, "0")}
            </div>
            <div className="mt-1.5 text-[0.5625rem] tracking-[0.25rem] text-fg/50">
              {label}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addToCalendar}
        className="mt-[1.125rem] w-full cursor-pointer border border-gold bg-transparent py-3.5 text-[0.6875rem] tracking-[0.25rem] text-gold transition-opacity duration-150 active:opacity-70"
      >
        + ADD TO CALENDAR
      </button>

      {/* 캘린더 앱 선택 피커 (Web Share 미지원 환경 폴백) */}
      {showPicker && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setShowPicker(false)}
        >
          <div
            className="mb-6 w-full max-w-[390px] border border-fg/[.15] bg-bg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-3 text-center text-[0.5625rem] tracking-[0.35rem] text-fg/40">
              · 캘린더 앱 선택 ·
            </div>

            <a
              href={GOOGLE_CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setShowPicker(false)}
              className="flex w-full cursor-pointer items-center justify-between border-t border-fg/[.08] px-5 py-[1.125rem] text-[0.8125rem] text-fg"
            >
              <span>구글 캘린더</span>
              <span className="text-[0.625rem] tracking-[0.2rem] text-gold">→</span>
            </a>

            <button
              onClick={() => {
                downloadIcsFile();
                setShowPicker(false);
              }}
              className="flex w-full cursor-pointer items-center justify-between border-t border-fg/[.08] bg-transparent px-5 py-[1.125rem] text-[0.8125rem] text-fg"
            >
              <span>애플 캘린더 · 기타 (.ics)</span>
              <span className="text-[0.625rem] tracking-[0.2rem] text-gold">↓</span>
            </button>

            <button
              onClick={() => setShowPicker(false)}
              className="w-full cursor-pointer border-t border-fg/[.08] bg-transparent py-4 text-[0.6875rem] tracking-[0.2rem] text-fg/40"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </ChapterSection>
  );
}
