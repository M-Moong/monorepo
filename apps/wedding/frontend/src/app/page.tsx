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
    <div className="bg-bg flex min-h-dvh items-start justify-center">
      {!splashDone && <Splash onDone={() => setSplashDone(true)} />}
      {/* 모바일 프레임 */}
      <div className="relative w-full max-w-[390px]">
        <div
          ref={containerRef}
          className="bg-bg text-fg relative h-dvh overflow-y-scroll [scroll-snap-type:y_proximity]"
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

          <Ch01Cover />
          <Ch02Invite />
          <Ch03Couple />
          <Ch04Gallery />
          <Ch05Calendar />
          <Ch06Venue />
          <Ch07Fortune />
          <Ch08Guestbook />
          <Ch09Finale />
        </div>

        {/* 플로팅 방명록 버튼 (CH01~CH07 구간) */}
        {chapter > 0 && chapter < 7 && (
          <button
            onClick={jumpToGuestbook}
            className="bg-gold text-bg animate-pulse-btn absolute bottom-5 right-5 z-[60] cursor-pointer border-0 px-4 py-3 text-[10px] font-bold tracking-[.25em]"
          >
            방명록 →
          </button>
        )}
      </div>
    </div>
  );
}
