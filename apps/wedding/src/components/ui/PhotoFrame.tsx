import { CSSProperties } from "react";

type Tone =
  | "warm"
  | "cool"
  | "sage"
  | "paper"
  | "mono"
  | "blush"
  | "sepia"
  | "ink";

interface PhotoFrameProps {
  label?: string;
  tone?: Tone;
  style?: CSSProperties;
}

const TONES: Record<Tone, [string, string]> = {
  warm: ["#e8ddd0", "#d9c9b6"],
  cool: ["#dbe2e6", "#c6d1d8"],
  sage: ["#d4ddd0", "#bccab6"],
  paper: ["#ece5d8", "#dccfba"],
  mono: ["#e8e8e8", "#d4d4d4"],
  blush: ["#ead8d2", "#d9bfb6"],
  sepia: ["#dccaae", "#c4ad8c"],
  ink: ["#2a2620", "#1a1612"],
};

export function PhotoFrame({
  label = "photo",
  tone = "warm",
  style,
}: PhotoFrameProps) {
  const [a, b] = TONES[tone];
  const isInk = tone === "ink";

  return (
    <div
      className={`flex h-full w-full items-center justify-center font-mono text-[10px] tracking-[0.5px] uppercase ${isInk ? "text-white/45" : "text-black/40"}`}
      style={{
        background: `repeating-linear-gradient(135deg, ${a} 0 12px, ${b} 12px 24px)`,
        ...style,
      }}
    >
      {label}
    </div>
  );
}
