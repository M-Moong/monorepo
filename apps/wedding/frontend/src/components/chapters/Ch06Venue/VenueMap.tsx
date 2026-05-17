export function VenueMap() {
  return (
    <div className="bg-warm border-fg/10 relative mb-[14px] h-[180px] overflow-hidden border">
      <svg width="100%" height="100%" viewBox="0 0 300 180" className="block">
        <path
          d="M-10 120 Q 80 80, 150 100 T 320 90"
          style={{ stroke: 'var(--color-svg-road)' }}
          strokeWidth="14"
          fill="none"
        />
        <path
          d="M-10 120 Q 80 80, 150 100 T 320 90"
          style={{ stroke: 'var(--color-svg-road-center)' }}
          strokeWidth="12"
          fill="none"
          strokeDasharray="2 8"
        />
        <path
          d="M50 -10 L 70 200"
          style={{ stroke: 'var(--color-svg-road)' }}
          strokeWidth="8"
          fill="none"
        />
        <path
          d="M220 -10 L 200 200"
          style={{ stroke: 'var(--color-svg-road)' }}
          strokeWidth="8"
          fill="none"
        />
        <path
          d="M0 160 Q 100 150, 180 165 T 320 155"
          style={{ stroke: 'var(--color-svg-river)' }}
          strokeWidth="20"
          fill="none"
        />
        <text
          x="14"
          y="20"
          style={{ fill: 'var(--color-svg-label)' }}
          fontSize="8"
          letterSpacing="2"
        >
          SOUTH GATE
        </text>
        <text
          x="220"
          y="20"
          style={{ fill: 'var(--color-svg-label)' }}
          fontSize="8"
          letterSpacing="2"
        >
          ITAEWON
        </text>
        <circle cx="150" cy="90" r="22" style={{ fill: 'var(--color-svg-pin-glow)' }}>
          <animate attributeName="r" values="22;30;22" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="150" cy="90" r="8" style={{ fill: 'var(--color-gold)' }} />
        <text
          x="150"
          y="78"
          style={{ fill: 'var(--color-gold)' }}
          fontSize="9"
          textAnchor="middle"
          letterSpacing="2"
        >
          ★
        </text>
        <text
          x="150"
          y="115"
          style={{ fill: 'var(--color-fg)' }}
          fontSize="9"
          textAnchor="middle"
          letterSpacing="3"
        >
          GRAND HYATT
        </text>
      </svg>
    </div>
  );
}
