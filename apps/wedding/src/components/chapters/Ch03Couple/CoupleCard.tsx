import { PhotoFrame } from "@/components/ui/PhotoFrame";

type Tone = "mono" | "sepia";

export interface CoupleCardData {
  who: "GROOM" | "BRIDE";
  name: string;
  kor: string;
  tagline: string;
  facts: readonly string[];
  tone: Tone;
}

interface CoupleCardProps {
  card: CoupleCardData;
  isOpen: boolean;
  onToggle: () => void;
}

export function CoupleCard({ card: c, isOpen, onToggle }: CoupleCardProps) {
  return (
    <div
      onClick={onToggle}
      className={`relative cursor-pointer overflow-hidden border bg-warm transition-[border-color] duration-[350ms] ${
        isOpen ? "border-gold" : "border-fg/[.12]"
      }`}
    >
      <div className="flex items-stretch">
        <div className="aspect-[3/4] w-[110px] shrink-0">
          <PhotoFrame label={c.who} tone={c.tone} />
        </div>
        <div className="flex-1 p-[14px_16px]">
          <div className="mb-1.5 text-[9px] tracking-[.3em] text-gold">
            {c.who}
          </div>
          <div className="font-serif text-[28px] leading-none font-light text-fg italic">
            {c.name}
          </div>
          <div className="mt-1 text-[12px] text-fg/60">{c.kor}</div>
          <div className="mt-3 font-serif text-[14px] text-gold italic">
            &ldquo;{c.tagline}&rdquo;
          </div>
          <div className="mt-[14px] text-[10px] tracking-[.2em] text-fg/40">
            {isOpen ? "— LESS" : "MORE +"}
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-fg/10 px-4 pb-[18px]">
          {c.facts.map((f) => (
            <div
              key={f}
              className="flex items-center gap-2.5 border-b border-fg/[.05] py-2 text-[12px] text-fg/75"
            >
              <span className="text-gold">—</span>
              {f}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
