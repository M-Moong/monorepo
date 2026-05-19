import type { Vibe } from "@/data/fortune";
import { WEDDING } from "@/data/wedding";

interface FortuneCardProps {
  vibe: Vibe;
  palette: [string, string];
  idx: number;
  total: number;
  flipping: boolean;
}

export function FortuneCard({
  vibe: v,
  palette: [p1, p2],
  idx,
  total,
  flipping,
}: FortuneCardProps) {
  return (
    <div
      className="relative aspect-[4/5] overflow-hidden rounded-[18px] shadow-[0_20px_50px_rgba(0,0,0,.5)] transition-transform duration-[250ms]"
      style={{
        background: `linear-gradient(135deg, ${p1} 0%, ${p2} 100%)`,
        transform: flipping ? "rotateY(90deg)" : "rotateY(0)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 mix-blend-overlay"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(255,255,255,.5), transparent 50%), radial-gradient(circle at 80% 90%, rgba(0,0,0,.15), transparent 50%)",
        }}
      />

      <div className="absolute top-4 right-4 left-4 flex items-center justify-between">
        <div className="rounded-full bg-white/50 px-2.5 py-1 text-[11px] font-bold tracking-[-0.01em] text-black/70 backdrop-blur-[6px]">
          {v.tag}
        </div>
        <div className="text-[9px] tracking-[.25em] text-black/55">
          #{String(idx + 1).padStart(2, "0")} / {total}
        </div>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center px-[22px] pt-[50px] pb-[60px] text-center">
        <div className="mb-2.5 text-[32px] leading-none font-extrabold text-black/15">
          &ldquo;
        </div>
        <div className="font-serif text-[26px] leading-[1.45] font-medium tracking-[-0.01em] whitespace-pre-line text-[#1a1a1a]">
          {v.q}
        </div>
        <div className="mt-[18px] text-[11px] tracking-[.2em] text-black/55">
          {v.a}
        </div>
      </div>

      <div className="absolute right-4 bottom-[14px] left-4 flex items-center justify-between text-[9px] tracking-[.2em] text-black/45">
        <span>
          {WEDDING.groom.initial} &amp; {WEDDING.bride.initial} × DAILY
        </span>
        <span>{WEDDING.dateDot}</span>
      </div>
    </div>
  );
}
