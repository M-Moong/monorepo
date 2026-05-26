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
        <div className="flex flex-1 flex-col px-4 py-3.5">
          <span className="mb-1.5 text-3xs tracking-[0.3rem] text-gold">{c.who}</span>
          <span className="font-serif text-[1.75rem] leading-none font-light text-fg italic">
            {c.name}
          </span>
          <span className="mt-1 text-xs text-fg/60">{c.kor}</span>
          <span className="mt-3 font-serif text-sm text-gold italic">
            &ldquo;{c.tagline}&rdquo;
          </span>
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
              {c.facts.map((f) => (
                <div
                  key={f}
                  className="flex items-center gap-2.5 border-b border-fg/5 py-2 text-xs text-fg/75"
                >
                  <span className="text-gold">—</span>
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
