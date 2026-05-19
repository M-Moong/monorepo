interface GuestbookStatsProps {
  total: number;
  groomCount: number;
  brideCount: number;
}

export function GuestbookStats({
  total,
  groomCount,
  brideCount,
}: GuestbookStatsProps) {
  const stats: [string, number][] = [
    ["전체", total],
    ["신랑측", groomCount],
    ["신부측", brideCount],
  ];

  return (
    <div className="mb-[22px] grid grid-cols-3 border border-fg/[.08] bg-warm">
      {stats.map(([label, count]) => (
        <div
          key={label}
          className="border-r border-fg/[.06] px-1 py-[14px] text-center last:border-r-0"
        >
          <div className="font-serif text-[26px] leading-none text-gold italic tabular-nums">
            {count}
          </div>
          <div className="mt-1 text-[9px] tracking-[.25em] text-fg/55">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
