interface GuestbookStatsProps {
  total: number;
  groomCount: number;
  brideCount: number;
}

export function GuestbookStats({ total, groomCount, brideCount }: GuestbookStatsProps) {
  const stats: [string, number][] = [
    ['전체', total],
    ['신랑측', groomCount],
    ['신부측', brideCount],
  ];

  return (
    <div className="bg-warm border-fg/[.08] mb-[22px] grid grid-cols-3 border">
      {stats.map(([label, count]) => (
        <div key={label} className="border-fg/[.06] border-r px-1 py-[14px] text-center">
          <div className="text-gold font-serif text-[26px] italic tabular-nums leading-none">
            {count}
          </div>
          <div className="text-fg/55 mt-1 text-[9px] tracking-[.25em]">{label}</div>
        </div>
      ))}
    </div>
  );
}
