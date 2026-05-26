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
        <span className="mt-1.5 text-base tracking-[0.15rem] text-fg/70">
          {WEDDING.timeText} · {WEDDING.venue.short}
        </span>
      </div>

      <div className="mb-2 flex items-center text-3xs tracking-[0.4rem] text-gold">
        <span>· ACCOUNTS ·</span>
      </div>

      <AccountSection side="groom" />
      <AccountSection side="bride" />

      <ShareButtons />

      <div className="pb-10" />
    </ChapterSection>
  );
}
