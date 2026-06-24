'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { PhotoFrame } from '@/components/ui/PhotoFrame';

type Tone = 'mono' | 'sepia';

export interface CoupleCardData {
  who: 'GROOM' | 'BRIDE';
  name: string;
  kor: string;
  tagline: string;
  facts: readonly string[];
  tone: Tone;
  photoSrc: string;
}

interface CoupleCardProps {
  card: CoupleCardData;
  isOpen: boolean;
  onToggle: () => void;
}

export function CoupleCard({ card, isOpen, onToggle }: CoupleCardProps) {
  return (
    <div
      onClick={onToggle}
      className={`relative cursor-pointer overflow-hidden border bg-warm transition-[border-color] duration-350 ${
        isOpen ? 'border-gold' : 'border-fg/12'
      }`}
    >
      {/* 인물 요약 */}
      <div className="flex items-stretch">
        <div className="aspect-3/4 w-27.5 shrink-0">
          <PhotoFrame label={card.who} tone={card.tone} src={card.photoSrc} />
        </div>
        <div className="flex flex-1 flex-col px-4 py-3.5">
          <div className="flex flex-1 flex-col justify-center">
            <span className="mb-1.5 text-3xs tracking-[0.3rem] text-gold">{card.who}</span>
            <span className="font-serif text-[1.75rem] leading-none font-light text-fg">
              {card.name}
            </span>
            <span className="mt-1 text-xs text-fg/60">{card.kor}</span>
            <span className="mt-3 font-serif text-sm text-gold">&ldquo;{card.tagline}&rdquo;</span>
          </div>
          <div className="mt-3.5 flex justify-end text-fg/40">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isOpen ? 'less' : 'more'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* 인물 상세 정보 */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-fg/10 px-4 pb-4.5">
              {card.facts.map((fact) => (
                <div
                  key={fact}
                  className="flex items-center gap-2.5 border-b border-fg/5 py-2 text-xs text-fg/75"
                >
                  <span className="text-gold">—</span>
                  <span>{fact}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
