'use client';

import { QUIZ, tierFor } from '@/data/quiz';
import { useCopy } from '@/hooks/useCopy';
import { WEDDING } from '@/data/wedding';
import { RotateCcw, Share2, Check } from 'lucide-react';

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
      </div>

      {/* 문제별 결과 */}
      <div className="flex-1">
        <div className="space-y-1.5">
          {QUIZ.map((q, i) => {
            const correct = answers[i] === q.answerIndex;
            return (
              <div key={q.id} className="flex items-center gap-3 border border-fg/10 px-3 py-2.5">
                <span className="w-5 shrink-0 text-center text-sm font-bold text-fg/30">
                  {i + 1}
                </span>
                <span
                  className={`shrink-0 text-sm font-bold ${correct ? 'text-gold' : 'text-red-400/70'}`}
                >
                  {correct ? 'O' : 'X'}
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
          className="flex cursor-pointer items-center justify-center gap-2 border border-gold bg-transparent py-4 text-xs tracking-[0.2rem] text-gold"
        >
          <RotateCcw size={14} />
          <span>다시하기</span>
        </button>
        <button
          onClick={share}
          className="flex cursor-pointer items-center justify-center gap-2 border-0 bg-gold py-4 text-xs font-bold tracking-[0.2rem] text-bg"
        >
          {copiedId === 'result' ? <Check size={14} /> : <Share2 size={14} />}
          <span>{copiedId === 'result' ? '복사됨' : '공유하기'}</span>
        </button>
      </div>
    </div>
  );
}
