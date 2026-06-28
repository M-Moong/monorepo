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

      <p className="mb-3 text-center font-serif text-lg leading-7 whitespace-pre-line text-fg">
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
          <span className="mb-1 text-3xs tracking-[0.2rem] text-gold">GROOM&apos;S PARENTS</span>
          <span className="text-xs">
            {WEDDING.groom.father.name} · {WEDDING.groom.mother.name}
          </span>
          <span className="mt-2 font-serif">
            <span className="text-sm">아들 </span>
            <span className="text-xl text-gold">{WEDDING.groom.name}</span>
          </span>
        </div>

        {/* & */}
        <span className="font-serif text-3xl text-gold">&amp;</span>

        {/* 신부측 */}
        <div className="flex flex-col items-start text-left">
          <span className="mb-1 text-3xs tracking-[0.2rem] text-gold">BRIDE&apos;S PARENTS</span>
          <span className="text-xs">
            {WEDDING.bride.father.name} · {WEDDING.bride.mother.name}
          </span>
          <span className="mt-2 font-serif">
            <span className="text-sm">딸 </span>
            <span className="text-xl text-gold">{WEDDING.bride.name}</span>
          </span>
        </div>
      </div>
    </ChapterSection>
  );
}
