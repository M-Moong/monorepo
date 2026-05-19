import { ChapterSection } from "@/components/ui/ChapterSection";
import { ChHeader } from "@/components/ui/ChHeader";
import { WEDDING } from "@/data/wedding";

export function Ch02Invite() {
  return (
    <ChapterSection chIndex={1}>
      <ChHeader
        num={2}
        label="INVITATION"
        title={
          <>
            Will you
            <br />
            join us?
          </>
        }
      />

      <div className="my-[14px] border-t border-fg/20" />

      <p className="mb-[26px] font-serif text-[17px] leading-[1.85] whitespace-pre-line text-fg italic">
        {WEDDING.inviteLines.map((line, i, arr) => (
          <span key={i}>
            {"highlight" in line ? (
              <span className="text-gold">{line.text}</span>
            ) : (
              line.text
            )}
            {i < arr.length - 1 && <br />}
          </span>
        ))}
      </p>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-[14px] border-t border-b border-fg/20 py-[18px]">
        {/* 신랑측 */}
        <div className="text-right">
          <div className="mb-1 text-[9px] tracking-[.3em] text-gold">
            GROOM&apos;S PARENTS
          </div>
          <div className="text-[12px] text-fg/70">
            {WEDDING.groom.father.name} · {WEDDING.groom.mother.name}
          </div>
          <div className="mt-1 font-serif text-[18px] text-fg italic">
            의 아들{" "}
            <span className="text-gold">{WEDDING.groom.name.slice(1)}</span>
          </div>
        </div>

        {/* & */}
        <div className="font-serif text-[28px] text-gold italic">&amp;</div>

        {/* 신부측 */}
        <div className="text-left">
          <div className="mb-1 text-[9px] tracking-[.3em] text-gold">
            BRIDE&apos;S PARENTS
          </div>
          <div className="text-[12px] text-fg/70">
            {WEDDING.bride.father.name} · {WEDDING.bride.mother.name}
          </div>
          <div className="mt-1 font-serif text-[18px] text-fg italic">
            의 딸{" "}
            <span className="text-gold">{WEDDING.bride.name.slice(1)}</span>
          </div>
        </div>
      </div>

      <div className="mt-[22px] text-center text-[10px] tracking-[.25em] text-fg/50">
        {WEDDING.dateText}
      </div>
      <div className="mt-1 text-center text-[10px] tracking-[.2em] text-fg/40">
        {WEDDING.venue.short}
      </div>
    </ChapterSection>
  );
}
