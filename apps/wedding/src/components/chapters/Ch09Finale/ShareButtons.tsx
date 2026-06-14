'use client';

import Image from 'next/image';
import { Link, Check } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
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

  const LinkIcon = linkCopied ? Check : Link;

  const SHARE_ACTIONS = [
    { key: 'kakao', label: 'KAKAO', sub: '카카오톡', onClick: shareKakao },
    {
      key: 'link',
      label: 'LINK',
      sub: linkCopied ? '복사됨' : '주소 복사',
      onClick: shareLink,
    },
    { key: 'sms', label: 'SMS', sub: '문자', onClick: shareSms },
  ];

  return (
    <div className="mt-3">
      <div className="mb-3 text-3xs tracking-[0.4rem] text-gold">· SHARE ·</div>
      <div className="grid grid-cols-3 gap-1.5">
        {SHARE_ACTIONS.map((s) => (
          <motion.button
            key={s.key}
            type="button"
            onClick={s.onClick}
            whileTap={{ scale: 0.97 }}
            className={`flex cursor-pointer flex-col items-center rounded-md border py-3.5 transition-colors duration-200 ${
              s.key === 'link' && linkCopied
                ? 'border-gold bg-gold/5'
                : 'border-fg/10 bg-transparent'
            }`}
          >
            <span className="mb-1 flex h-4 items-center justify-center">
              {s.key === 'kakao' && (
                <Image src="/logo/kakaotalk.svg" alt="kakao" width={16} height={16} />
              )}
              {s.key === 'link' && (
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={linkCopied ? 'check' : 'link'}
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.85, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="inline-flex"
                  >
                    <LinkIcon size={13} className="text-gold" />
                  </motion.span>
                </AnimatePresence>
              )}
              {s.key === 'sms' && (
                <Image src="/logo/imessage.webp" alt="sms" width={16} height={16} />
              )}
            </span>
            <span className="text-xs tracking-[0.25rem] text-gold">{s.label}</span>
            <span className="mt-1 text-2xs text-fg/50">{s.sub}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
