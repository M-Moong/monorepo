'use client';

import { QUIZ, tierFor } from '@/data/quiz';
import { useCopy } from '@/hooks/useCopy';
import { WEDDING } from '@/data/wedding';

interface QuizResultProps {
  answers: number[];
  onRetry: () => void;
}

export function QuizResult({ answers, onRetry }: QuizResultProps) {
  const score = answers.filter((a, i) => a === QUIZ[i]!.answerIndex).length;
  const tier = tierFor(score);
  const { copiedId, copy } = useCopy(1500);

  const share = () => {
    const text = `${tier.label} ${tier.title}\n"${tier.desc}"\n${score}/${QUIZ.length} 정답 · ${WEDDING.groom.initial}&${WEDDING.bride.initial} 퀴즈`;
    if (navigator.share) {
      navigator.share({ text }).catch(() => {});
    } else {
      copy('result', text);
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      {/* 점수 */}
      <div className="flex flex-col items-center gap-2.5 py-2">
        <span className="font-serif text-4xl leading-none tracking-[0.15rem] text-gold">
          {tier.label}
        </span>
        <div className="flex flex-col items-center text-center">
          <span className="mb-1 font-serif text-xl font-light text-fg italic">{tier.title}</span>
          <span className="text-xs leading-[1.6] text-fg/60">{tier.desc}</span>
        </div>
        <span className="text-3xs tracking-[0.3rem] text-fg/40">
          {score} / {QUIZ.length} 정답
        </span>
      </div>

      {/* 문제별 결과 — flex-1로 남은 공간 채우고 내부 스크롤 */}
      <div className="flex-1 overflow-y-auto overscroll-contain">
        <div className="space-y-1.5">
          {QUIZ.map((q, i) => {
            const correct = answers[i] === q.answerIndex;
            return (
              <div key={q.id} className="flex items-center gap-3 border border-fg/10 px-3 py-2.5">
                <span className={`shrink-0 text-2xs ${correct ? 'text-gold' : 'text-red-400/70'}`}>
                  {correct ? '✓' : '✗'}
                </span>
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-2xs text-fg/40">{q.question}</span>
                  <span className="text-2xs text-fg/80">{q.choices[q.answerIndex]}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 액션 버튼 */}
      <div className="grid grid-cols-2 gap-1.5">
        <button
          onClick={onRetry}
          className="flex cursor-pointer items-center justify-center border border-gold bg-transparent py-3.5 text-2xs tracking-[0.25rem] text-gold"
        >
          <span>↻ 다시하기</span>
        </button>
        <button
          onClick={share}
          className="flex cursor-pointer items-center justify-center border-0 bg-gold py-3.5 text-2xs font-bold tracking-[0.25rem] text-bg"
        >
          <span>{copiedId === 'result' ? '✓ 복사됨' : '↗ 공유하기'}</span>
        </button>
      </div>
    </div>
  );
}
