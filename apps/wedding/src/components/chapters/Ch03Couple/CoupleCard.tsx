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
      className={`bg-warm relative cursor-pointer overflow-hidden border transition-[border-color] duration-[350ms] ${
        isOpen ? 'border-gold' : 'border-fg/[.12]'
      }`}
    >
      <div className="flex items-stretch">
        <div className="aspect-[3/4] w-[110px] shrink-0">
          <PhotoFrame label={c.who} tone={c.tone} />
        </div>
        <div className="flex-1 p-[14px_16px]">
          <div className="text-gold mb-1.5 text-[9px] tracking-[.3em]">{c.who}</div>
          <div className="text-fg font-serif text-[28px] font-light italic leading-none">
            {c.name}
          </div>
          <div className="text-fg/60 mt-1 text-[12px]">{c.kor}</div>
          <div className="text-gold mt-3 font-serif text-[14px] italic">
            &ldquo;{c.tagline}&rdquo;
          </div>
          <div className="text-fg/40 mt-[14px] text-[10px] tracking-[.2em]">
            {isOpen ? '— LESS' : 'MORE +'}
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="border-fg/10 border-t px-4 pb-[18px]">
          {c.facts.map((f) => (
            <div
              key={f}
              className="text-fg/75 border-fg/[.05] flex items-center gap-2.5 border-b py-2 text-[12px]"
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
