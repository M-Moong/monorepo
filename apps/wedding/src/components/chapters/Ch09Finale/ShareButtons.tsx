'use client';

import { useState } from 'react';
import { WEDDING } from '@/data/wedding';

declare global {
  interface Window {
    Kakao: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Share: { sendDefault: (config: object) => void };
    };
  }
}

export function ShareButtons() {
  const [linkCopied, setLinkCopied] = useState(false);

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
    if (!window.Kakao.isInitialized()) window.Kakao.init(appKey);
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
    <div className="mt-7">
      <div className="mb-3 text-[0.5625rem] tracking-[0.4rem] text-gold">· SHARE ·</div>
      <div className="grid grid-cols-3 gap-1.5">
        {SHARE_ACTIONS.map((s) => (
          <button
            key={s.key}
            onClick={s.onClick}
            className={`cursor-pointer border border-fg/20 bg-transparent py-3.5 text-center transition-all duration-200 ${
              s.key === 'link' && linkCopied ? 'border-gold' : ''
            }`}
          >
            <div className="text-[0.625rem] tracking-[0.25rem] text-gold">{s.label}</div>
            <div className="mt-1 text-[0.625rem] text-fg/50">{s.sub}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
