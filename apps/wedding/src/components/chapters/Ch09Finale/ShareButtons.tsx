'use client';

import { WEDDING } from '@/data/wedding';
import { useCopy } from '@/hooks/useCopy';

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
  const { copiedId, copy } = useCopy();
  const linkCopied = copiedId === 'link';

  const shareLink = () => copy('link', window.location.href);

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
      <div className="mb-3 text-3xs tracking-[0.4rem] text-gold">· SHARE ·</div>
      <div className="grid grid-cols-3 gap-1.5">
        {SHARE_ACTIONS.map((s) => (
          <button
            key={s.key}
            onClick={s.onClick}
            className={`flex cursor-pointer flex-col items-center border border-fg/20 bg-transparent py-3.5 transition-all duration-200 ${
              s.key === 'link' && linkCopied ? 'border-gold' : ''
            }`}
          >
            <span className="text-2xs tracking-[0.25rem] text-gold">{s.label}</span>
            <span className="mt-1 text-2xs text-fg/50">{s.sub}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
