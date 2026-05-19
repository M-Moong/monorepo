'use client';

import { useState } from 'react';
import { ChapterSection } from '@/components/ui/ChapterSection';
import { ChHeader } from '@/components/ui/ChHeader';
import { useCountdown } from '@/hooks/useCountdown';
import { WEDDING } from '@/data/wedding';

// 2026년 10월 1일은 목요일 (0=일, 4=목)
const DAYS_HEADER = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const OCTOBER_START_DOW = 4;
const OCTOBER_DAYS = 31;

const calendarCells = Array.from({ length: 35 }, (_, i) => {
  const d = i - OCTOBER_START_DOW + 1;
  return d >= 1 && d <= OCTOBER_DAYS ? d : null;
});

// ── 캘린더 유틸 ────────────────────────────────────────────────────────────────

function buildIcs(): string {
  // 14:00 KST = 05:00 UTC, 18:00 KST = 09:00 UTC
  const loc = `${WEDDING.venue.name}\\, ${WEDDING.venue.address}`;
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//MnS Wedding//KO',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    'DTSTART:20261017T050000Z',
    'DTEND:20261017T090000Z',
    `SUMMARY:${WEDDING.groom.name} & ${WEDDING.bride.name} 결혼식`,
    `DESCRIPTION:${WEDDING.groom.name} & ${WEDDING.bride.name}의 결혼을 축하해 주세요.`,
    `LOCATION:${loc}`,
    'UID:mns-20261017@wedding',
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

const GOOGLE_CALENDAR_URL = (() => {
  const p = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${WEDDING.groom.name} & ${WEDDING.bride.name} 결혼식`,
    dates: '20261017T050000Z/20261017T090000Z',
    details: `${WEDDING.groom.name} & ${WEDDING.bride.name}의 결혼을 축하해 주세요.\n\n${WEDDING.venue.name}\n${WEDDING.venue.address}`,
    location: `${WEDDING.venue.name}, ${WEDDING.venue.address}`,
  });
  return `https://calendar.google.com/calendar/r/eventedit?${p}`;
})();

function downloadIcsFile() {
  const blob = new Blob([buildIcs()], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'mns-wedding-2026.ics';
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
    const file = new File([buildIcs()], 'mns-wedding-2026.ics', {
      type: 'text/calendar',
    });

    // Web Share API — iOS 15+ / Android Chrome 86+ 에서 네이티브 공유 시트 표시
    // 사용자가 "캘린더에 추가"를 선택하면 OS가 직접 처리
    if (
      typeof navigator.share === 'function' &&
      typeof navigator.canShare === 'function' &&
      navigator.canShare({ files: [file] })
    ) {
      try {
        await navigator.share({ files: [file] });
        return;
      } catch (err) {
        // AbortError = 사용자가 직접 닫음 → 피커 불필요
        if (err instanceof Error && err.name === 'AbortError') return;
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
      <div className="bg-warm mb-[22px] p-[18px]">
        <div className="mb-[14px] flex justify-between">
          <div className="text-fg font-serif text-[22px] italic">October 2026</div>
          <div className="text-gold text-[10px] tracking-[.2em]">SAT 14:00</div>
        </div>

        <div className="grid grid-cols-7 gap-1 text-[9px] tracking-[.1em]">
          {DAYS_HEADER.map((d, i) => (
            <div
              key={i}
              className={`py-1 text-center ${
                i === 0 ? 'text-[#d97777]' : i === 6 ? 'text-gold' : 'text-fg/50'
              }`}
            >
              {d}
            </div>
          ))}
          {calendarCells.map((d, i) => {
            const dow = i % 7;
            const isWedding = d === 17;
            return (
              <div
                key={i}
                className={`py-2 text-center text-[13px] ${
                  !d
                    ? 'text-transparent'
                    : isWedding
                      ? 'bg-gold text-bg font-bold'
                      : dow === 0
                        ? 'text-[#d97777]'
                        : dow === 6
                          ? 'text-gold'
                          : 'text-fg'
                }`}
              >
                {d ?? '·'}
              </div>
            );
          })}
        </div>
      </div>

      {/* 카운트다운 */}
      <div className="grid grid-cols-4 gap-1.5">
        {(
          [
            ['DAYS', cd.d],
            ['HRS', cd.h],
            ['MIN', cd.m],
            ['SEC', cd.s],
          ] as [string, number][]
        ).map(([label, val]) => (
          <div key={label} className="bg-warm border-fg/[.08] border px-1.5 py-[14px] text-center">
            <div className="text-gold font-serif text-[28px] italic tabular-nums leading-none">
              {String(val).padStart(2, '0')}
            </div>
            <div className="text-fg/50 mt-1.5 text-[9px] tracking-[.25em]">{label}</div>
          </div>
        ))}
      </div>

      <button
        onClick={addToCalendar}
        className="border-gold text-gold mt-[18px] w-full cursor-pointer border bg-transparent py-[14px] text-[11px] tracking-[.25em] transition-opacity duration-150 active:opacity-70"
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
            className="bg-bg border-fg/[.15] mb-6 w-full max-w-[390px] border"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-fg/40 px-4 py-3 text-center text-[9px] tracking-[.35em]">
              · 캘린더 앱 선택 ·
            </div>

            <a
              href={GOOGLE_CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setShowPicker(false)}
              className="border-fg/[.08] text-fg flex w-full cursor-pointer items-center justify-between border-t px-5 py-[18px] text-[13px]"
            >
              <span>구글 캘린더</span>
              <span className="text-gold text-[10px] tracking-[.2em]">→</span>
            </a>

            <button
              onClick={() => {
                downloadIcsFile();
                setShowPicker(false);
              }}
              className="border-fg/[.08] text-fg flex w-full cursor-pointer items-center justify-between border-t bg-transparent px-5 py-[18px] text-[13px]"
            >
              <span>애플 캘린더 · 기타 (.ics)</span>
              <span className="text-gold text-[10px] tracking-[.2em]">↓</span>
            </button>

            <button
              onClick={() => setShowPicker(false)}
              className="border-fg/[.08] text-fg/40 w-full cursor-pointer border-t bg-transparent py-4 text-[11px] tracking-[.2em]"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </ChapterSection>
  );
}
