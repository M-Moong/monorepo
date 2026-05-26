'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { WEDDING } from '@/data/wedding';
import { useCopy } from '@/hooks/useCopy';

type AccountSide = 'groom' | 'bride';

interface AccountSectionProps {
  side: AccountSide;
}

export function AccountSection({ side }: AccountSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { copiedId, copy } = useCopy();

  const label = side === 'groom' ? '신랑측 계좌' : '신부측 계좌';
  const p = WEDDING[side];
  const prefix = side === 'groom' ? '신랑' : '신부';
  const accounts = [
    { who: prefix, name: p.name, ...p.account },
    { who: `${prefix} 아버지`, name: p.father.name, ...p.father.account },
    { who: `${prefix} 어머니`, name: p.mother.name, ...p.mother.account },
  ];

  return (
    <div className="mb-3">
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="flex w-full cursor-pointer items-center justify-between border border-fg/10 bg-warm px-4 py-3.5 text-fg"
      >
        <span className="text-xs tracking-[0.15rem]">{label}</span>
        <span
          className="text-2xl leading-none text-gold transition-transform duration-300"
          style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
        >
          +
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            {accounts.map((a) => (
              <div
                key={a.number}
                className="flex items-center justify-between gap-2.5 border-b border-l border-gold border-b-fg/5 bg-warm/60 px-3.5 py-3"
              >
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="text-3xs tracking-[0.2rem] text-gold">{a.who}</span>
                  <span className="mt-0.5 text-2sm text-fg">{a.name}</span>
                  <span className="mt-0.5 font-mono text-2xs text-fg/60">
                    {a.bank} · {a.number}
                  </span>
                </div>
                <button
                  onClick={() => copy(a.number, `${a.bank} ${a.number} ${a.name}`)}
                  className="flex shrink-0 cursor-pointer items-center justify-center rounded-md border border-gold/30 p-1.5 text-gold transition-opacity duration-200 active:opacity-50"
                >
                  {copiedId === a.number ? <Check size={15} /> : <Copy size={15} />}
                </button>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
