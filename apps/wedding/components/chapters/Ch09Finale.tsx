'use client';

import { useState } from 'react';
import { ChapterSection } from '@/components/ui/ChapterSection';
import { ChHeader } from '@/components/ui/ChHeader';
import { WEDDING } from '@/data/wedding';

declare global {
  interface Window {
    Kakao: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Share: {
        sendDefault: (config: object) => void;
      };
    };
  }
}

type AccountSide = 'groom' | 'bride';

export function Ch09Finale() {
  const [openSection, setOpenSection] = useState<AccountSide | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);

  const copy = (id: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1600);
  };

  const shareLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 1600);
  };

  const shareSms = () => {
    const text = `${WEDDING.groom.name} & ${WEDDING.bride.name} 결혼식에 초대합니다.\n${WEDDING.dateText}\n${WEDDING.venue.short}\n\n${window.location.href}`;
    window.location.href = `sms:?body=${encodeURIComponent(text)}`;
  };

  const shareKakao = () => {
    const appKey = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;
    if (!window.Kakao || !appKey) {
      shareLink();
      return;
    }
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(appKey);
    }
    window.Kakao.Share.sendDefault({
      objectType: 'text',
      text: `${WEDDING.groom.name} & ${WEDDING.bride.name}\n${WEDDING.dateText}\n${WEDDING.venue.short}\n\n청첩장을 확인해 주세요.`,
      link: {
        mobileWebUrl: window.location.href,
        webUrl: window.location.href,
      },
    });
  };

  const SHARE_ACTIONS = [
    { key: 'kakao', label: 'KAKAO', sub: '카카오톡', onClick: shareKakao },
    {
      key: 'link',
      label: linkCopied ? '✓ COPIED' : 'LINK',
      sub: linkCopied ? '복사됨' : '링크 복사',
      onClick: shareLink,
    },
    { key: 'sms', label: 'SMS', sub: '문자', onClick: shareSms },
  ] as const;

  return (
    <ChapterSection chIndex={8} minHeightAuto>
      <ChHeader
        num={9}
        label="END SCENE"
        title={
          <>
            See you
            <br />
            there.
          </>
        }
      />

      {/* 날짜/장소 요약 */}
      <div className="border-fg/20 mb-6 border-b border-t py-5 text-center">
        <div className="text-fg font-serif text-[32px] font-light italic tabular-nums">
          17 · 10 · 2026
        </div>
        <div className="text-fg/70 mt-1.5 text-[12px] tracking-[.15em]">
          SAT 14:00 · {WEDDING.venue.short}
        </div>
      </div>

      {/* 계좌번호 */}
      <div className="text-gold mb-2 text-[9px] tracking-[.4em]">· 마음 전하실 곳 ·</div>
      <p className="text-fg/55 mb-[14px] text-[11px] leading-[1.55]">
        직접 축하 못 오시는 분들을 위해 계좌번호를 안내드립니다.
      </p>

      {(['groom', 'bride'] as AccountSide[]).map((side) => {
        const label = side === 'groom' ? '신랑측 계좌' : '신부측 계좌';
        const isOpen = openSection === side;
        return (
          <div key={side} className="mb-1.5">
            <button
              onClick={() => setOpenSection(isOpen ? null : side)}
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
                {WEDDING.accounts[side].map((a) => (
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
      })}

      {/* 공유 */}
      <div className="mt-7">
        <div className="text-gold mb-3 text-[9px] tracking-[.4em]">· SHARE ·</div>
        <div className="grid grid-cols-3 gap-1.5">
          {SHARE_ACTIONS.map((s) => (
            <button
              key={s.key}
              onClick={s.onClick}
              className={`border-fg/20 cursor-pointer border bg-transparent py-[14px] text-center transition-all duration-200 ${
                s.key === 'link' && linkCopied ? 'border-gold' : ''
              }`}
            >
              <div
                className={`text-[10px] tracking-[.25em] transition-colors duration-200 ${
                  s.key === 'link' && linkCopied ? 'text-gold' : 'text-gold'
                }`}
              >
                {s.label}
              </div>
              <div className="text-fg/50 mt-1 text-[10px]">{s.sub}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 마무리 */}
      <div className="text-fg/40 mt-12 text-center text-[9px] tracking-[.5em]">· FIN ·</div>
      <div className="text-gold mt-[14px] text-center font-serif text-[22px] italic">M &amp; S</div>
      <div className="text-fg/40 mt-1.5 pb-10 text-center text-[9px] tracking-[.3em]">
        WITH LOVE · 17.10.2026
      </div>
    </ChapterSection>
  );
}
