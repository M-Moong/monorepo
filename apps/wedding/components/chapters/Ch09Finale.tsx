'use client';

import { useState } from 'react';
import { ChapterSection } from '@/components/ui/ChapterSection';
import { ChHeader } from '@/components/ui/ChHeader';
import { WEDDING } from '@/data/wedding';

type AccountSide = 'groom' | 'bride';

export function Ch09Finale() {
  const [openSection, setOpenSection] = useState<AccountSide | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copy = (id: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1600);
  };

  return (
    <ChapterSection chIndex={8} minHeightAuto>
      <ChHeader num={9} label="END SCENE" title={<>See you<br />there.</>} />

      {/* 날짜/장소 요약 */}
      <div className="border-t border-b border-fg/20 py-5 mb-6 text-center">
        <div className="font-serif text-[32px] italic font-light tabular-nums text-fg">
          17 · 10 · 2026
        </div>
        <div className="text-[12px] text-fg/70 mt-1.5 tracking-[.15em]">
          SAT 14:00 · {WEDDING.venue.short}
        </div>
      </div>

      {/* 계좌번호 */}
      <div className="text-[9px] tracking-[.4em] text-gold mb-2">· 마음 전하실 곳 ·</div>
      <p className="text-[11px] text-fg/55 mb-[14px] leading-[1.55]">
        직접 축하 못 오시는 분들을 위해 계좌번호를 안내드립니다.
      </p>

      {(['groom', 'bride'] as AccountSide[]).map((side) => {
        const label = side === 'groom' ? '신랑측 계좌' : '신부측 계좌';
        const isOpen = openSection === side;
        return (
          <div key={side} className="mb-1.5">
            <button
              onClick={() => setOpenSection(isOpen ? null : side)}
              className="w-full py-[14px] px-4 bg-warm border border-fg/10 text-fg flex justify-between items-center cursor-pointer"
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
                {WEDDING.accounts[side].map((a) => (
                  <div
                    key={a.number}
                    className="px-[14px] py-3 bg-warm/60 border-l border-gold border-b border-b-fg/[.05] flex justify-between items-center gap-2.5"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-[9px] tracking-[.2em] text-gold">{a.who}</div>
                      <div className="text-[13px] mt-0.5 text-fg">{a.name}</div>
                      <div className="text-[10px] text-fg/60 font-mono mt-0.5">
                        {a.bank} · {a.number}
                      </div>
                    </div>
                    <button
                      onClick={() => copy(a.number, `${a.bank} ${a.number} ${a.name}`)}
                      className={`shrink-0 px-2.5 py-1.5 text-[9px] tracking-[.2em] border border-gold cursor-pointer transition-all duration-200 ${
                        copiedId === a.number
                          ? 'bg-gold text-bg'
                          : 'bg-transparent text-gold'
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
      })}

      {/* 공유 */}
      <div className="mt-7">
        <div className="text-[9px] tracking-[.4em] text-gold mb-3">· SHARE ·</div>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { n: 'KAKAO', sub: '카카오톡' },
            { n: 'LINK',  sub: '링크 복사' },
            { n: 'SMS',   sub: '문자' },
          ].map((s) => (
            <button
              key={s.n}
              className="py-[14px] bg-transparent border border-fg/20 text-fg cursor-pointer text-center"
            >
              <div className="text-[10px] tracking-[.25em] text-gold">{s.n}</div>
              <div className="text-[10px] text-fg/50 mt-1">{s.sub}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 마무리 */}
      <div className="mt-12 text-center text-[9px] tracking-[.5em] text-fg/40">· FIN ·</div>
      <div className="font-serif text-center mt-[14px] italic text-gold text-[22px]">M &amp; S</div>
      <div className="text-center text-[9px] text-fg/40 mt-1.5 tracking-[.3em] pb-10">
        WITH LOVE · 17.10.2026
      </div>
    </ChapterSection>
  );
}
