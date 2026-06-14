'use client';

import { useRef, useState } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import { HUD } from '@/components/hud/HUD';
import { Ch01Cover } from '@/components/chapters/Ch01Cover';
import { Ch02Invite } from '@/components/chapters/Ch02Invite';
import { Ch03Couple } from '@/components/chapters/Ch03Couple';
import { Ch04Gallery } from '@/components/chapters/Ch04Gallery';
import { Ch05Calendar } from '@/components/chapters/Ch05Calendar';
import { Ch06Map } from '@/components/chapters/Ch06Map';
import { Ch07Quiz } from '@/components/chapters/Ch07Quiz';
import { Ch08Guestbook } from '@/components/chapters/Ch08Guestbook';
import { GuestbookSheet } from '@/components/chapters/Ch08Guestbook/GuestbookSheet';
import { Ch09Finale } from '@/components/chapters/Ch09Finale';
import { useBGM } from '@/hooks/useBGM';
import { Splash } from '@/components/ui/Splash';

const TOTAL_CHAPTERS = 9;

export default function InvitationPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sound, setSound] = useState(false);
  const [splashDone, setSplashDone] = useState(false);
  const [chapter, setChapter] = useState(0);
  const [progressPct, setProgressPct] = useState(0);
  const [guestbookSheetOpen, setGuestbookSheetOpen] = useState(false);
  useBGM(sound);

  const { scrollY, scrollYProgress } = useScroll({ container: containerRef });

  useMotionValueEvent(scrollYProgress, 'change', (v) => setProgressPct(v));

  useMotionValueEvent(scrollY, 'change', (scrollTop) => {
    const el = containerRef.current;
    if (!el) return;
    const vh = el.clientHeight;
    let current = 0;
    el.querySelectorAll<HTMLElement>('[data-ch]').forEach((s) => {
      if (s.offsetTop <= scrollTop + vh / 2) current = Number(s.dataset.ch);
    });
    setChapter(current);
  });

  // 방명록 바로 이동하기
  // const jumpToGuestbook = () => {
  //   const el = containerRef.current?.querySelector<HTMLElement>('[data-ch="7"]');
  //   if (el) el.scrollIntoView({ behavior: 'smooth' });
  // };

  return (
    <div className="flex min-h-dvh items-start justify-center bg-bg">
      {!splashDone && <Splash onDone={() => setSplashDone(true)} />}
      <div className="relative w-full max-w-[450px]">
        {/* HUD: normal flow 밖에 두어 스크롤 컨테이너 레이아웃에 영향 없도록 */}
        <div className="pointer-events-none absolute top-0 right-0 left-0 z-50">
          <div className="pointer-events-auto">
            <HUD
              chapter={chapter}
              progressPct={progressPct}
              sound={sound}
              totalChapters={TOTAL_CHAPTERS}
              containerRef={containerRef}
              onToggleSound={() => setSound((s) => !s)}
            />
          </div>
        </div>

        {/* data-scroll-container: SlideGroup이 스크롤 위치를 읽는 기준점 */}
        <div
          ref={containerRef}
          data-scroll-container
          className="relative h-dvh snap-y snap-proximity overflow-y-scroll bg-bg text-fg"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          <Ch01Cover />

          <Ch02Invite />

          <Ch03Couple />

          <Ch04Gallery />

          <Ch05Calendar />

          <Ch06Map />

          <Ch07Quiz />

          <Ch08Guestbook onOpenSheet={() => setGuestbookSheetOpen(true)} />

          <Ch09Finale />
        </div>

        {/* {chapter !== 7 && (
          <button
            onClick={jumpToGuestbook}
            className="absolute right-5 bottom-5 z-60 animate-pulse-btn cursor-pointer border-0 bg-gold px-4 py-3 text-2xs font-bold tracking-[0.25rem] text-bg"
          >
            방명록 →
          </button>
        )} */}
      </div>

      <GuestbookSheet open={guestbookSheetOpen} onClose={() => setGuestbookSheetOpen(false)} />
    </div>
  );
}
