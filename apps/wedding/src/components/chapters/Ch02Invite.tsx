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

      <div className="my-3.5 border-t border-fg/20" />

      <p className="mb-[1.625rem] font-serif text-[1.0625rem] leading-[1.85] whitespace-pre-line text-fg italic">
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

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3.5 border-t border-b border-fg/20 py-[1.125rem]">
        {/* 신랑측 */}
        <div className="text-right">
          <div className="mb-1 text-[0.5625rem] tracking-[0.3rem] text-gold">
            GROOM&apos;S PARENTS
          </div>
          <div className="text-xs text-fg/70">
            {WEDDING.groom.father.name} · {WEDDING.groom.mother.name}
          </div>
          <div className="mt-1 font-serif text-lg text-fg italic">
            의 아들{" "}
            <span className="text-gold">{WEDDING.groom.name.slice(1)}</span>
          </div>
        </div>

        {/* & */}
        <div className="font-serif text-[1.75rem] text-gold italic">&amp;</div>

        {/* 신부측 */}
        <div className="text-left">
          <div className="mb-1 text-[0.5625rem] tracking-[0.3rem] text-gold">
            BRIDE&apos;S PARENTS
          </div>
          <div className="text-xs text-fg/70">
            {WEDDING.bride.father.name} · {WEDDING.bride.mother.name}
          </div>
          <div className="mt-1 font-serif text-lg text-fg italic">
            의 딸{" "}
            <span className="text-gold">{WEDDING.bride.name.slice(1)}</span>
          </div>
        </div>
      </div>

      <div className="mt-[1.375rem] text-center text-[0.625rem] tracking-[0.25rem] text-fg/50">
        {WEDDING.dateText}
      </div>
      <div className="mt-1 text-center text-[0.625rem] tracking-[0.2rem] text-fg/40">
        {WEDDING.venue.short}
      </div>
    </ChapterSection>
  );
}
