import { ChapterSection } from '@/components/ui/ChapterSection';
import { ChHeader } from '@/components/ui/ChHeader';
import { WEDDING } from '@/data/wedding';

export function Ch02Invite() {
  return (
    <ChapterSection chIndex={1}>
      <ChHeader num={2} label="INVITATION" title={<>Will you<br />join us?</>} />

      <div className="border-t border-fg/20 my-[14px]" />

      <p className="font-serif text-[17px] italic leading-[1.85] text-fg mb-[26px] whitespace-pre-line">
        {WEDDING.inviteMessage.split('\n').map((line, i, arr) => (
          <span key={i}>
            {i === 3 ? <span className="text-gold">{line}</span> : line}
            {i < arr.length - 1 && <br />}
          </span>
        ))}
      </p>

      <div className="grid grid-cols-[1fr_auto_1fr] gap-[14px] py-[18px] border-t border-b border-fg/20 items-center">
        {/* 신랑측 */}
        <div className="text-right">
          <div className="text-[9px] tracking-[.3em] text-gold mb-1">
            GROOM&apos;S PARENTS
          </div>
          <div className="text-[12px] text-fg/70">
            {WEDDING.groom.father} · {WEDDING.groom.mother}
          </div>
          <div className="font-serif text-[18px] italic mt-1 text-fg">
            의 아들 <span className="text-gold">{WEDDING.groom.name.slice(1)}</span>
          </div>
        </div>

        {/* & */}
        <div className="font-serif text-[28px] italic text-gold">&amp;</div>

        {/* 신부측 */}
        <div className="text-left">
          <div className="text-[9px] tracking-[.3em] text-gold mb-1">
            BRIDE&apos;S PARENTS
          </div>
          <div className="text-[12px] text-fg/70">
            {WEDDING.bride.father} · {WEDDING.bride.mother}
          </div>
          <div className="font-serif text-[18px] italic mt-1 text-fg">
            의 딸 <span className="text-gold">{WEDDING.bride.name.slice(1)}</span>
          </div>
        </div>
      </div>

      <div className="mt-[22px] text-center text-[10px] tracking-[.25em] text-fg/50">
        {WEDDING.dateText}
      </div>
      <div className="text-center text-[10px] tracking-[.2em] text-fg/40 mt-1">
        {WEDDING.venue.short}
      </div>
    </ChapterSection>
  );
}
