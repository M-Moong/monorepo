'use client';

import { WEDDING } from '@/data/wedding';
import { useCopy } from '@/hooks/useCopy';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@repo/ui/components/accordion';

type AccountSide = 'groom' | 'bride';

interface AccountSectionProps {
  side: AccountSide;
}

export function AccountSection({ side }: AccountSectionProps) {
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
    <Accordion type="single" collapsible className="mb-1.5">
      <AccordionItem value={side} className="border-0">
        <AccordionTrigger className="flex w-full items-center justify-between rounded-none border border-fg/10 bg-warm px-4 py-3.5 text-fg hover:no-underline [&[data-state=open]>svg]:hidden">
          <span className="text-xs tracking-[0.15rem]">{label}</span>
          <span className="text-base text-gold transition-transform duration-300 data-[state=open]:rotate-45">
            +
          </span>
        </AccordionTrigger>
        <AccordionContent className="pb-0">
          <div>
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
                  className={`flex shrink-0 cursor-pointer items-center border border-gold px-2.5 py-1.5 text-3xs tracking-[0.2rem] transition-all duration-200 ${
                    copiedId === a.number ? 'bg-gold text-bg' : 'bg-transparent text-gold'
                  }`}
                >
                  <span>{copiedId === a.number ? '✓ 복사됨' : 'COPY'}</span>
                </button>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
