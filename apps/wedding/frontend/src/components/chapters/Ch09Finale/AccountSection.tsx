'use client';

import { useState } from 'react';
import { WEDDING } from '@/data/wedding';

type AccountSide = 'groom' | 'bride';

interface AccountSectionProps {
  side: AccountSide;
}

export function AccountSection({ side }: AccountSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const label = side === 'groom' ? '신랑측 계좌' : '신부측 계좌';
  const accounts = WEDDING.accounts[side];

  const copy = (id: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1600);
  };

  return (
    <div className="mb-1.5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-warm border-fg/10 text-fg flex w-full cursor-pointer items-center justify-between border px-4 py-[14px]"
      >
        <span className="text-[12px] tracking-[.15em]">{label}</span>
        <span
          className="text-gold text-[16px] transition-transform duration-300"
          style={{ transform: isOpen ? 'rotate(45deg)' : 'none' }}
        >
          +
        </span>
      </button>

      {isOpen && (
        <div>
          {accounts.map((a) => (
            <div
              key={a.number}
              className="bg-warm/60 border-gold border-b-fg/[.05] flex items-center justify-between gap-2.5 border-b border-l px-[14px] py-3"
            >
              <div className="min-w-0 flex-1">
                <div className="text-gold text-[9px] tracking-[.2em]">{a.who}</div>
                <div className="text-fg mt-0.5 text-[13px]">{a.name}</div>
                <div className="text-fg/60 mt-0.5 font-mono text-[10px]">
                  {a.bank} · {a.number}
                </div>
              </div>
              <button
                onClick={() => copy(a.number, `${a.bank} ${a.number} ${a.name}`)}
                className={`border-gold shrink-0 cursor-pointer border px-2.5 py-1.5 text-[9px] tracking-[.2em] transition-all duration-200 ${
                  copiedId === a.number ? 'bg-gold text-bg' : 'text-gold bg-transparent'
                }`}
              >
                {copiedId === a.number ? '✓ 복사됨' : 'COPY'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
