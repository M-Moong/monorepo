'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Check, Copy } from 'lucide-react';
import { WEDDING } from '@/data/wedding';
import { useCopy } from '@/hooks/useCopy';

type AccountSide = 'groom' | 'bride';

interface AccountSectionProps {
  side: AccountSide;
  isOpen: boolean;
  onToggle: () => void;
}

export function AccountSection({ side, isOpen, onToggle }: AccountSectionProps) {
  const { copiedId, copy } = useCopy();

  const label = side === 'groom' ? '신랑측 계좌' : '신부측 계좌';
  const p = WEDDING[side];
  const prefix = side === 'groom' ? '신랑' : '신부';
  const accounts = [
    { who: prefix, name: p.name, ...p.account },
    ...(side === 'groom'
      ? [{ who: `${prefix} 아버지`, name: p.father.name, ...p.father.account }]
      : []),
    { who: `${prefix} 어머니`, name: p.mother.name, ...p.mother.account },
  ];

  return (
    <div className="mb-3">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full cursor-pointer items-center justify-between border border-fg/10 bg-warm px-4 py-3.5 text-fg transition-colors duration-200 hover:border-fg/20"
      >
        <span className="text-xs tracking-[0.15rem]">{label}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
          className="text-2xl leading-none text-gold"
        >
          +
        </motion.span>
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
            {accounts.map((a) => {
              const copied = copiedId === a.number;

              return (
                <motion.div
                  key={a.number}
                  layout
                  className={`flex items-center justify-between gap-2.5 border px-3.5 py-3 transition-colors duration-200 ${
                    copied ? 'border-gold bg-gold/5' : 'border-fg/5 bg-warm/60'
                  }`}
                >
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="text-3xs tracking-[0.2rem] text-gold">{a.who}</span>
                    <span className="mt-0.5 text-2sm text-fg">{a.name}</span>
                    <span className="mt-0.5 font-mono text-2xs text-fg/60">
                      {a.bank} · {a.number}
                    </span>
                  </div>
                  <motion.button
                    type="button"
                    onClick={() => copy(a.number, `${a.bank} ${a.number} ${a.name}`)}
                    whileTap={{ scale: 0.95 }}
                    className={`flex shrink-0 cursor-pointer items-center justify-center rounded-md border p-1.5 text-gold transition-colors duration-200 active:opacity-50 ${
                      copied ? 'border-gold bg-gold/10' : 'border-gold/10 bg-transparent'
                    }`}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {copied ? (
                        <motion.span
                          key="check"
                          initial={{ scale: 0.85, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.85, opacity: 0 }}
                          transition={{ duration: 0.18 }}
                          className="inline-flex"
                        >
                          <Check size={15} />
                        </motion.span>
                      ) : (
                        <motion.span
                          key="copy"
                          initial={{ scale: 0.85, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.85, opacity: 0 }}
                          transition={{ duration: 0.18 }}
                          className="inline-flex"
                        >
                          <Copy size={15} />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
