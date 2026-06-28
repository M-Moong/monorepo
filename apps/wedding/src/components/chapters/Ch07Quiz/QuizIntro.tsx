import Image from 'next/image';
import { QUIZ } from '@/data/quiz';

interface QuizIntroProps {
  onStart: () => void;
}

const GROOM_QUIZ_PHOTO = '/photos/07.webp';
const BRIDE_QUIZ_PHOTO = '/photos/03.webp';

export function QuizIntro({ onStart }: QuizIntroProps) {
  return (
    <div className="flex flex-col items-center gap-10 pt-5">
      <div className="flex w-full items-center justify-center gap-2">
        <div className="relative aspect-3/4 w-28 origin-bottom -rotate-6 overflow-hidden rounded-t-full border border-gold/40 bg-warm p-1">
          <div className="relative size-full overflow-hidden rounded-t-full">
            <Image
              src={BRIDE_QUIZ_PHOTO}
              alt="퀴즈 신부 사진"
              fill
              sizes="112px"
              className="object-cover object-[72%_center]"
            />
          </div>
        </div>

        <span className="relative z-10 -mx-3 font-serif text-9xl leading-none text-gold">?</span>

        <div className="relative aspect-3/4 w-28 origin-bottom rotate-6 overflow-hidden rounded-t-full border border-gold/40 bg-warm p-1">
          <div className="relative size-full overflow-hidden rounded-t-full">
            <Image
              src={GROOM_QUIZ_PHOTO}
              alt="퀴즈 신랑 사진"
              fill
              sizes="112px"
              className="object-cover object-[28%_center]"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 text-center">
        <span className="font-serif text-2xl font-light text-fg">총 {QUIZ.length}문제</span>
        <p className="text-sm leading-relaxed text-fg/50">
          신랑신부를 얼마나 알고 있는지
          <br />
          지금 바로 확인해 보세요.
        </p>
      </div>

      <button
        onClick={onStart}
        className="flex w-full cursor-pointer items-center justify-center border-0 bg-gold py-5 text-xs font-bold tracking-[0.3rem] text-bg"
      >
        <span>퀴즈 풀기 →</span>
      </button>
    </div>
  );
}
