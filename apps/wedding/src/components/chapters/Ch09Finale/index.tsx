import { ChapterSection } from '@/components/ui/ChapterSection';
import { ChHeader } from '@/components/ui/ChHeader';
import { AccountSection } from './AccountSection';
import { ShareButtons } from './ShareButtons';
import { WEDDING } from '@/data/wedding';

export function Ch09Finale() {
  return (
    <ChapterSection chIndex={8} autoHeight>
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

      <div className="mb-6 flex flex-col items-center border-y border-fg/20 py-5 text-center">
        <span className="font-serif text-[2rem] font-light text-fg italic tabular-nums">
          {WEDDING.dateShort}
        </span>
        <span className="mt-1.5 text-xs tracking-[0.15rem] text-fg/70">
          {WEDDING.timeText} · {WEDDING.venue.short}
        </span>
      </div>

      <div className="mb-2 flex items-center text-3xs tracking-[0.4rem] text-gold">
        <span>· 마음 전하실 곳 ·</span>
      </div>
      <p className="mb-3.5 text-2xs leading-[1.55] text-fg/55">
        <span>직접 축하 못 오시는 분들을 위해 계좌번호를 안내드립니다.</span>
      </p>

      <AccountSection side="groom" />
      <AccountSection side="bride" />

      <ShareButtons />

      <div className="mt-12 flex flex-col items-center gap-1.5 text-center">
        <span className="text-3xs tracking-[0.5rem] text-fg/40">· FIN ·</span>
        <span className="mt-2 font-serif text-[1.375rem] text-gold italic">
          {WEDDING.groom.initial} &amp; {WEDDING.bride.initial}
        </span>
        <span className="pb-10 text-3xs tracking-[0.3rem] text-fg/40">
          WITH LOVE · {WEDDING.dateShort}
        </span>
      </div>
    </ChapterSection>
  );
}
