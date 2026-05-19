import { ChapterSection } from '@/components/ui/ChapterSection';
import { ChHeader } from '@/components/ui/ChHeader';
import { AccountSection } from './AccountSection';
import { ShareButtons } from './ShareButtons';
import { WEDDING } from '@/data/wedding';

export function Ch09Finale() {
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

      <div className="border-fg/20 mb-6 border-b border-t py-5 text-center">
        <div className="text-fg font-serif text-[32px] font-light italic tabular-nums">
          17 · 10 · 2026
        </div>
        <div className="text-fg/70 mt-1.5 text-[12px] tracking-[.15em]">
          SAT 14:00 · {WEDDING.venue.short}
        </div>
      </div>

      <div className="text-gold mb-2 text-[9px] tracking-[.4em]">· 마음 전하실 곳 ·</div>
      <p className="text-fg/55 mb-[14px] text-[11px] leading-[1.55]">
        직접 축하 못 오시는 분들을 위해 계좌번호를 안내드립니다.
      </p>

      <AccountSection side="groom" />
      <AccountSection side="bride" />

      <ShareButtons />

      <div className="text-fg/40 mt-12 text-center text-[9px] tracking-[.5em]">· FIN ·</div>
      <div className="text-gold mt-[14px] text-center font-serif text-[22px] italic">M &amp; S</div>
      <div className="text-fg/40 mt-1.5 pb-10 text-center text-[9px] tracking-[.3em]">
        WITH LOVE · 17.10.2026
      </div>
    </ChapterSection>
  );
}
