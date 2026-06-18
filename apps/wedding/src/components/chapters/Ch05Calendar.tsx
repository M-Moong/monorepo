'use client';

import { Counter } from '@repo/ui/reactbits/counter';
import { ChapterSection } from '@/components/ui/ChapterSection';
import { useCountdown } from '@/hooks/useCountdown';
import { useCopy } from '@/hooks/useCopy';
import { WEDDING } from '@/data/wedding';

const DAYS_HEADER = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const calYear = WEDDING.date.getFullYear();
const calMonth = WEDDING.date.getMonth();
const CAL_MONTH_LABEL = `${calYear}.${String(calMonth + 1).padStart(2, '0')}`;
const MONTH_START_DOW = new Date(calYear, calMonth, 1).getDay();
const MONTH_DAYS = new Date(calYear, calMonth + 1, 0).getDate();
const calendarCells = Array.from({ length: 35 }, (_, i) => {
  const d = i - MONTH_START_DOW + 1;
  return d >= 1 && d <= MONTH_DAYS ? d : null;
});

const weddingTimeParts = new Intl.DateTimeFormat('ko-KR', {
  timeZone: 'Asia/Seoul',
  hour: 'numeric',
  minute: 'numeric',
  hour12: true,
}).formatToParts(WEDDING.date);
const period = weddingTimeParts.find(({ type }) => type === 'dayPeriod')?.value;
const hour = weddingTimeParts.find(({ type }) => type === 'hour')?.value;
const minute = weddingTimeParts.find(({ type }) => type === 'minute')?.value;
const COPY_TEXT = `${WEDDING.groom.name} · ${WEDDING.bride.name} 결혼식
${period} ${hour}시 ${minute}분
${WEDDING.venue.name}`;

// ── 컴포넌트 ───────────────────────────────────────────────────────────────────

export function Ch05Calendar() {
  const cd = useCountdown(WEDDING.date);
  const { copiedId, copy } = useCopy();

  return (
    <ChapterSection
      chIndex={4}
      label="WHEN"
      title={
        <>
          The day
          {/* <br />
          day. */}
        </>
      }
    >
      {/* 달력 */}
      <div className="mb-5.5 bg-warm p-4.5">
        <div className="mb-3.5 flex items-center justify-between">
          <span className="font-serif text-3xl text-fg italic">{CAL_MONTH_LABEL}</span>
          <span className="text-2xs tracking-[0.2rem] text-gold">{WEDDING.timeText}</span>
        </div>

        <div className="grid grid-cols-7 gap-1 text-3xs tracking-[0.1rem]">
          {DAYS_HEADER.map((d, i) => (
            <div
              key={i}
              className={`flex items-center justify-center py-1 ${
                i === 0 ? 'text-[#d97777]' : i === 6 ? 'text-gold' : 'text-fg/50'
              }`}
            >
              <span>{d}</span>
            </div>
          ))}
          {calendarCells.map((d, i) => {
            const dow = i % 7;
            const isWedding = d === WEDDING.date.getDate();
            return (
              <div
                key={i}
                className={`flex items-center justify-center py-2 text-2sm ${
                  !d
                    ? 'text-transparent'
                    : isWedding
                      ? 'bg-gold font-bold text-bg'
                      : dow === 0
                        ? 'text-[#d97777]'
                        : dow === 6
                          ? 'text-gold'
                          : 'text-fg'
                }`}
              >
                <span>{d ?? '·'}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 카운트다운 */}
      <div className="grid grid-cols-4 gap-1.5">
        {(
          [
            ['일', cd.d],
            ['시간', cd.h],
            ['분', cd.m],
            ['초', cd.s],
          ] as [string, number][]
        ).map(([label, val]) => (
          <div
            key={label}
            className="flex flex-col items-center border border-fg/8 bg-warm px-1.5 py-3.5"
          >
            <span className="text-gold">
              {label === '일' ? (
                <Counter
                  value={val}
                  places={[100, 10, 1]}
                  fontSize={16}
                  padding={10}
                  gap={1}
                  horizontalPadding={1}
                  gradientHeight={0}
                  digitStyle={{ width: '1.15ch' }}
                />
              ) : (
                <Counter
                  value={val}
                  places={[10, 1]}
                  fontSize={16}
                  padding={10}
                  gap={1}
                  horizontalPadding={1}
                  gradientHeight={0}
                  digitStyle={{ width: '1.15ch' }}
                />
              )}
            </span>
            <span className="mt-0 text-3xs tracking-[0.25rem] text-fg/50">{label}</span>
          </div>
        ))}
      </div>

      <button
        onClick={() => copy('wedding-info', COPY_TEXT)}
        className="mt-4.5 flex w-full cursor-pointer items-center justify-center border border-gold bg-transparent py-3.5 text-2xs tracking-[0.25rem] text-gold transition-opacity duration-150 active:opacity-70"
      >
        <span>{copiedId === 'wedding-info' ? '복사됨' : '시간 · 장소 복사'}</span>
      </button>
    </ChapterSection>
  );
}
