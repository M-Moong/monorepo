import { QUIZ } from '@/data/quiz';

interface QuizIntroProps {
  onStart: () => void;
}

export function QuizIntro({ onStart }: QuizIntroProps) {
  return (
    <div className="flex flex-col items-center gap-8 pt-6">
      <span className="font-serif text-[6rem] leading-none text-gold/20">?</span>
      <div className="flex flex-col items-center text-center">
        <span className="mb-2 font-serif text-lg font-light text-fg italic">
          총 {QUIZ.length}문제
        </span>
        <p className="text-xs leading-[1.8] text-fg/50">
          신랑신부를 얼마나 알고 있는지
          <br />
          지금 바로 확인해 보세요.
        </p>
      </div>

      <button
        onClick={onStart}
        className="flex w-full cursor-pointer items-center justify-center border-0 bg-gold py-4 text-2xs font-bold tracking-[0.3rem] text-bg"
      >
        <span>퀴즈 풀기 →</span>
      </button>
    </div>
  );
}
