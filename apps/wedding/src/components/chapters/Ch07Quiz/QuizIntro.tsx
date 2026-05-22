import { QUIZ } from '@/data/quiz';

interface QuizIntroProps {
  onStart: () => void;
}

export function QuizIntro({ onStart }: QuizIntroProps) {
  return (
    <div className="flex flex-col items-center gap-8 pt-6">
      <div className="font-serif text-[6rem] leading-none text-gold/20">?</div>
      <div className="text-center">
        <div className="mb-2 font-serif text-[1.125rem] font-light text-fg italic">
          총 {QUIZ.length}문제
        </div>
        <p className="text-[0.75rem] leading-[1.8] text-fg/50">
          신랑신부를 얼마나 알고 있는지
          <br />
          지금 바로 확인해 보세요.
        </p>
      </div>

      <button
        onClick={onStart}
        className="w-full cursor-pointer border-0 bg-gold py-4 text-xs3 font-bold tracking-[0.3rem] text-bg"
      >
        퀴즈 풀기 →
      </button>
    </div>
  );
}
