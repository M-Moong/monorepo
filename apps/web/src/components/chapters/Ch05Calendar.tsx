'use client';

import { ChapterSection } from '@/components/ui/ChapterSection';
import { ChHeader } from '@/components/ui/ChHeader';
import { useCountdown } from '@/hooks/useCountdown';
import { WEDDING } from '@/data/wedding';

// 2026년 10월 1일은 목요일 (0=일, 4=목)
const DAYS_HEADER = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const OCTOBER_START_DOW = 4; // Thursday
const OCTOBER_DAYS = 31;

const calendarCells = Array.from({ length: 35 }, (_, i) => {
  const d = i - OCTOBER_START_DOW + 1;
  return d >= 1 && d <= OCTOBER_DAYS ? d : null;
});

export function Ch05Calendar() {
  const cd = useCountdown(WEDDING.date);

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

      {/* 카운트다운 브릭 */}
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

      {/* 캘린더 추가 버튼 (UI만) */}
      <button className="border-gold text-gold mt-[18px] w-full cursor-pointer border bg-transparent py-[14px] text-[11px] tracking-[.25em]">
        + ADD TO CALENDAR
      </button>
    </ChapterSection>
  );
}
