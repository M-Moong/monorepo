import { ChapterSection } from "@/components/ui/ChapterSection";
import { ChHeader } from "@/components/ui/ChHeader";
import { AccountSection } from "./AccountSection";
import { ShareButtons } from "./ShareButtons";
import { WEDDING } from "@/data/wedding";

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

      <div className="mb-6 border-t border-b border-fg/20 py-5 text-center">
        <div className="font-serif text-[2rem] font-light text-fg italic tabular-nums">
          {WEDDING.dateShort}
        </div>
        <div className="mt-1.5 text-xs tracking-[0.15rem] text-fg/70">
          {WEDDING.timeText} · {WEDDING.venue.short}
        </div>
      </div>

      <div className="mb-2 text-[0.5625rem] tracking-[0.4rem] text-gold">
        · 마음 전하실 곳 ·
      </div>
      <p className="mb-3.5 text-[0.6875rem] leading-[1.55] text-fg/55">
        직접 축하 못 오시는 분들을 위해 계좌번호를 안내드립니다.
      </p>

      <AccountSection side="groom" />
      <AccountSection side="bride" />

      <ShareButtons />

      <div className="mt-12 text-center text-[0.5625rem] tracking-[0.5rem] text-fg/40">
        · FIN ·
      </div>
      <div className="mt-3.5 text-center font-serif text-[1.375rem] text-gold italic">
        {WEDDING.groom.initial} &amp; {WEDDING.bride.initial}
      </div>
      <div className="mt-1.5 pb-10 text-center text-[0.5625rem] tracking-[0.3rem] text-fg/40">
        WITH LOVE · {WEDDING.dateShort}
      </div>
    </ChapterSection>
  );
}
