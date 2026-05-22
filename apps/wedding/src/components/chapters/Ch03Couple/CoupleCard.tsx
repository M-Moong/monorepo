import { PhotoFrame } from '@/components/ui/PhotoFrame';

type Tone = 'mono' | 'sepia';

export interface CoupleCardData {
  who: 'GROOM' | 'BRIDE';
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
        isOpen ? 'border-gold' : 'border-fg/12'
      }`}
    >
      <div className="flex items-stretch">
        <div className="aspect-[3/4] w-27.5 shrink-0">
          <PhotoFrame label={c.who} tone={c.tone} />
        </div>
        <div className="flex-1 p-[14px_16px]">
          <div className="mb-1.5 text-2xs tracking-[0.3rem] text-gold">{c.who}</div>
          <div className="font-serif text-[1.75rem] leading-none font-light text-fg italic">
            {c.name}
          </div>
          <div className="mt-1 text-xs text-fg/60">{c.kor}</div>
          <div className="mt-3 font-serif text-sm text-gold italic">&ldquo;{c.tagline}&rdquo;</div>
          <div className="mt-3.5 text-xs2 tracking-[0.2rem] text-fg/40">
            {isOpen ? '— LESS' : 'MORE +'}
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-fg/10 px-4 pb-4.5">
          {c.facts.map((f) => (
            <div
              key={f}
              className="flex items-center gap-2.5 border-b border-fg/5 py-2 text-xs text-fg/75"
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
