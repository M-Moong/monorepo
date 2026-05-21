'use client';

import { useRef, useState } from 'react';
import { HUD } from '@/components/hud/HUD';
import { Ch01Cover } from '@/components/chapters/Ch01Cover';
import { Ch02Invite } from '@/components/chapters/Ch02Invite';
import { Ch03Couple } from '@/components/chapters/Ch03Couple';
import { Ch04Gallery } from '@/components/chapters/Ch04Gallery';
import { Ch05Calendar } from '@/components/chapters/Ch05Calendar';
import { Ch06Venue } from '@/components/chapters/Ch06Venue';
import { Ch07Fortune } from '@/components/chapters/Ch07Fortune';
import { Ch08Guestbook } from '@/components/chapters/Ch08Guestbook';
import { Ch09Finale } from '@/components/chapters/Ch09Finale';
import { SlideGroup } from '@/components/ui/SlideGroup';
import { useScroll } from '@/hooks/useScroll';
import { useBGM } from '@/hooks/useBGM';
import { Splash } from '@/components/ui/Splash';

const TOTAL_CHAPTERS = 9;

export default function InvitationPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sound, setSound] = useState(false);
  const [splashDone, setSplashDone] = useState(false);
  const { chapter, progressPct } = useScroll(containerRef);
  useBGM(sound);

  const jumpToGuestbook = () => {
    const el = containerRef.current?.querySelector<HTMLElement>('[data-ch="7"]');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex min-h-dvh items-start justify-center bg-bg">
      {!splashDone && <Splash onDone={() => setSplashDone(true)} />}
      <div className="relative w-full max-w-[450px]">
        {/* data-scroll-container: SlideGroup이 스크롤 위치를 읽는 기준점 */}
        <div
          ref={containerRef}
          data-scroll-container
          className="relative h-dvh overflow-x-hidden overflow-y-scroll bg-bg text-fg"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          <HUD
            chapter={chapter}
            progressPct={progressPct}
            sound={sound}
            totalChapters={TOTAL_CHAPTERS}
            containerRef={containerRef}
            onToggleSound={() => setSound((s) => !s)}
          />

          {/* scroll 챕터: 1, 2, 3 */}
          <Ch01Cover />
          <Ch02Invite />
          <Ch03Couple />

          {/* slide 챕터: 4, 5, 6 — 세로 스크롤이 가로 전환으로 변환됨 */}
          <SlideGroup count={3}>
            <Ch04Gallery inSlideGroup />
            <Ch05Calendar inSlideGroup />
            <Ch06Venue inSlideGroup />
          </SlideGroup>

          {/* scroll 챕터: 7, 8, 9 */}
          <Ch07Fortune />
          <Ch08Guestbook />
          <Ch09Finale />
        </div>

        {chapter > 0 && chapter < 7 && (
          <button
            onClick={jumpToGuestbook}
            className="absolute right-5 bottom-5 z-60 animate-pulse-btn cursor-pointer border-0 bg-gold px-4 py-3 text-[0.625rem] font-bold tracking-[0.25rem] text-bg"
          >
            방명록 →
          </button>
        )}
      </div>
    </div>
  );
}
