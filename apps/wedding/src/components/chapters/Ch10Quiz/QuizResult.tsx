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
        <div className="font-serif text-[2.5rem] leading-none tracking-[0.15rem] text-gold">
          {tier.label}
        </div>
        <div className="text-center">
          <div className="mb-1 font-serif text-[1.25rem] font-light italic text-fg">
            {tier.title}
          </div>
          <div className="text-[0.75rem] leading-[1.6] text-fg/60">{tier.desc}</div>
        </div>
        <div className="text-2xs tracking-[0.3rem] text-fg/40">
          {score} / {QUIZ.length} 정답
        </div>
      </div>

      {/* 문제별 결과 — flex-1로 남은 공간 채우고 내부 스크롤 */}
      <div className="flex-1 overflow-y-auto overscroll-contain">
        <div className="space-y-1.5">
          {QUIZ.map((q, i) => {
            const correct = answers[i] === q.answerIndex;
            return (
              <div key={q.id} className="flex items-center gap-3 border border-fg/10 px-3 py-2.5">
                <span className={`shrink-0 text-xs2 ${correct ? 'text-gold' : 'text-red-400/70'}`}>
                  {correct ? '✓' : '✗'}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-xs2 text-fg/40">{q.question}</div>
                  <div className="text-xs3 text-fg/80">{q.choices[q.answerIndex]}</div>
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
          className="cursor-pointer border border-gold bg-transparent py-3.5 text-xs3 tracking-[0.25rem] text-gold"
        >
          ↻ 다시하기
        </button>
        <button
          onClick={share}
          className="cursor-pointer border-0 bg-gold py-3.5 text-xs3 font-bold tracking-[0.25rem] text-bg"
        >
          {copiedId === 'result' ? '✓ 복사됨' : '↗ 공유하기'}
        </button>
      </div>
    </div>
  );
}
