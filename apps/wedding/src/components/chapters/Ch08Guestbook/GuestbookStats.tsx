interface GuestbookStatsProps {
  total: number;
  groomCount: number;
  brideCount: number;
  loading?: boolean;
}

export function GuestbookStats({ total, groomCount, brideCount, loading }: GuestbookStatsProps) {
  const stats: [string, number][] = [
    ['전체', total],
    ['신랑측', groomCount],
    ['신부측', brideCount],
  ];

  return (
    <div className="mb-3 grid grid-cols-3 border border-fg/8 bg-warm">
      {stats.map(([label, count]) => (
        <div
          key={label}
          className="flex flex-col items-center border-r border-fg/6 px-1 py-3 last:border-r-0"
        >
          {loading ? (
            <div className="h-9 w-8 animate-pulse rounded bg-fg/10" />
          ) : (
            <span className="font-serif text-4xl leading-none font-medium text-gold tabular-nums">
              {count}
            </span>
          )}
          <span className="mt-1 text-3xs tracking-[0.25rem] text-fg/55">{label}</span>
        </div>
      ))}
    </div>
  );
}
