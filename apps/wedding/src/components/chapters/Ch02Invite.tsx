import { ChapterSection } from '@/components/ui/ChapterSection';
import { ChHeader } from '@/components/ui/ChHeader';
import { WEDDING } from '@/data/wedding';

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

      <div className="border-fg/20 my-[14px] border-t" />

      <p className="text-fg mb-[26px] whitespace-pre-line font-serif text-[17px] italic leading-[1.85]">
        {WEDDING.inviteLines.map((line, i, arr) => (
          <span key={i}>
            {'highlight' in line ? <span className="text-gold">{line.text}</span> : line.text}
            {i < arr.length - 1 && <br />}
          </span>
        ))}
      </p>

      <div className="border-fg/20 grid grid-cols-[1fr_auto_1fr] items-center gap-[14px] border-b border-t py-[18px]">
        {/* 신랑측 */}
        <div className="text-right">
          <div className="text-gold mb-1 text-[9px] tracking-[.3em]">GROOM&apos;S PARENTS</div>
          <div className="text-fg/70 text-[12px]">
            {WEDDING.groom.father.name} · {WEDDING.groom.mother.name}
          </div>
          <div className="text-fg mt-1 font-serif text-[18px] italic">
            의 아들 <span className="text-gold">{WEDDING.groom.name.slice(1)}</span>
          </div>
        </div>

        {/* & */}
        <div className="text-gold font-serif text-[28px] italic">&amp;</div>

        {/* 신부측 */}
        <div className="text-left">
          <div className="text-gold mb-1 text-[9px] tracking-[.3em]">BRIDE&apos;S PARENTS</div>
          <div className="text-fg/70 text-[12px]">
            {WEDDING.bride.father.name} · {WEDDING.bride.mother.name}
          </div>
          <div className="text-fg mt-1 font-serif text-[18px] italic">
            의 딸 <span className="text-gold">{WEDDING.bride.name.slice(1)}</span>
          </div>
        </div>
      </div>

      <div className="text-fg/50 mt-[22px] text-center text-[10px] tracking-[.25em]">
        {WEDDING.dateText}
      </div>
      <div className="text-fg/40 mt-1 text-center text-[10px] tracking-[.2em]">
        {WEDDING.venue.short}
      </div>
    </ChapterSection>
  );
}
