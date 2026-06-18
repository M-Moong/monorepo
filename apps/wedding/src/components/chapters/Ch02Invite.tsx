import { ChapterSection } from '@/components/ui/ChapterSection';
import { WEDDING } from '@/data/wedding';

export function Ch02Invite() {
  return (
    <ChapterSection
      chIndex={1}
      label="INVITATION"
      title={
        <>
          Will you
          <br />
          join us?
        </>
      }
    >
      <div className="my-3.5 border-t border-fg/20" />

      <p className="mb-6.5 text-center font-serif text-lg leading-7 whitespace-pre-line text-fg">
        {WEDDING.inviteLines.map((line, i, arr) => (
          <span key={i}>
            {'highlight' in line ? <span className="text-gold">{line.text}</span> : line.text}
            {i < arr.length - 1 && <br />}
          </span>
        ))}
      </p>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3.5 border-y border-fg/20 py-4.5">
        {/* 신랑측 */}
        <div className="flex flex-col items-end text-right">
          <span className="mb-1 text-3xs tracking-[0.3rem] text-gold">GROOM&apos;S PARENTS</span>
          <span className="text-xs text-fg/70">
            {WEDDING.groom.father.name} · {WEDDING.groom.mother.name}
          </span>
          <span className="mt-1 font-serif text-lg text-fg">
            아들 <span className="text-gold">{WEDDING.groom.name.slice(1)}</span>
          </span>
        </div>

        {/* & */}
        <span className="font-serif text-3xl text-gold">&amp;</span>

        {/* 신부측 */}
        <div className="flex flex-col items-start text-left">
          <span className="mb-1 text-3xs tracking-[0.3rem] text-gold">BRIDE&apos;S PARENTS</span>
          <span className="text-xs text-fg/70">
            {WEDDING.bride.father.name} · {WEDDING.bride.mother.name}
          </span>
          <span className="mt-1 font-serif text-lg text-fg">
            딸 <span className="text-gold">{WEDDING.bride.name.slice(1)}</span>
          </span>
        </div>
      </div>

      <div className="mt-5.5 flex flex-col items-center gap-1 text-center">
        <span className="text-2xs tracking-[0.25rem] text-fg/50">{WEDDING.dateText}</span>
        <span className="text-2xs tracking-[0.2rem] text-fg/40">{WEDDING.venue.short}</span>
      </div>
    </ChapterSection>
  );
}
