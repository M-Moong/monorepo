import { QUIZ } from '@/data/quiz';

interface QuizIntroProps {
  onStart: () => void;
}

export function QuizIntro({ onStart }: QuizIntroProps) {
  return (
    <div className="flex flex-col items-center gap-14 pt-10">
      <span className="font-serif text-9xl leading-none text-gold">?</span>
      <div className="flex flex-col items-center gap-4 text-center">
        <span className="font-serif text-2xl font-light text-fg italic">총 {QUIZ.length}문제</span>
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
