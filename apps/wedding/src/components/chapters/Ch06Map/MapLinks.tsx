import { WEDDING } from '@/data/wedding';

export function MapLinks() {
  return (
    <div className="mt-2">
      <a
        href={WEDDING.venue.mapUrls.tmap}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-center gap-1.5 border border-fg/15 bg-transparent py-2 text-2xs tracking-[0.2rem] text-fg/50 transition-opacity duration-150 active:opacity-60"
      >
        {/* T map 로고 */}
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#2B63C1" />
          <text
            x="12"
            y="17"
            textAnchor="middle"
            fill="white"
            fontSize="13"
            fontWeight="700"
            fontFamily="sans-serif"
          >
            T
          </text>
        </svg>
        <span>T MAP</span>
      </a>
    </div>
  );
}
