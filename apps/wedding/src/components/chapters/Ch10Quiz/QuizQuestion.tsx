'use client';

import { useState, useEffect } from 'react';
import type { QuizQuestion as Q } from '@/data/quiz';

type Phase = 'choosing' | 'feedback' | 'reveal';

interface QuizQuestionProps {
  question: Q;
  index: number;
  total: number;
  onNext: (selectedIndex: number) => void;
}

export function QuizQuestion({ question: q, index, total, onNext }: QuizQuestionProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [phase, setPhase] = useState<Phase>('choosing');

  // 문제 바뀔 때 초기화
  useEffect(() => {
    setSelected(null);
    setPhase('choosing');
  }, [q.id]);

  const choose = (i: number) => {
    if (phase !== 'choosing') return;
    setSelected(i);
    setPhase('feedback');
    setTimeout(() => setPhase('reveal'), 700);
  };

  const isCorrect = selected === q.answerIndex;

  return (
    <div className="flex flex-1 flex-col gap-4">
      {/* 진행 바 */}
      <div className="flex items-center gap-1">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`h-0.5 flex-1 transition-colors duration-300 ${i <= index ? 'bg-gold' : 'bg-fg/15'}`}
          />
        ))}
      </div>

      {/* 질문 */}
      <div>
        <div className="mb-1.5 text-2xs tracking-[0.3rem] text-gold">
          Q{index + 1} / {total}
        </div>
        <div className="font-serif text-[1.25rem] leading-[1.4] font-light text-fg italic">
          {q.question}
        </div>
      </div>

      {/* 선택지 2×2 */}
      <div className="grid grid-cols-2 gap-1.5">
        {q.choices.map((c, i) => {
          let cls = 'border border-fg/20 bg-transparent text-fg/80';
          if (phase === 'feedback' || phase === 'reveal') {
            if (i === q.answerIndex) {
              cls = 'border border-gold bg-gold/10 text-gold';
            } else if (i === selected) {
              cls = 'border border-red-400/60 bg-red-400/10 text-red-400/80';
            } else {
              cls = 'border border-fg/10 bg-transparent text-fg/30';
            }
          }
          return (
            <button
              key={i}
              onClick={() => choose(i)}
              className={`cursor-pointer px-3 py-3.5 text-left text-[0.75rem] leading-[1.4] tracking-[-0.01rem] transition-all duration-300 ${cls}`}
            >
              <span className="mr-1.5 font-serif text-2xs tracking-[0.15rem] opacity-60">
                {String.fromCharCode(65 + i)}
              </span>
              {c}
            </button>
          );
        })}
      </div>

      {/* reveal 카드 — 높이 고정해서 아래 버튼 밀지 않음 */}
      <div className="h-16 overflow-hidden">
        <div
          className={`h-full border border-fg/10 bg-fg/[0.03] px-4 py-3 transition-opacity duration-500 ${phase === 'reveal' ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="mb-0.5 text-2xs tracking-[0.25rem] text-gold">
            {isCorrect ? '✓ 정답' : '✗ 오답'}
          </div>
          <div className="line-clamp-2 text-xs3 leading-[1.5] text-fg/70">
            {q.reveal.caption}
          </div>
        </div>
      </div>

      {/* 다음 버튼 — mt-auto로 하단 고정 */}
      <button
        onClick={() => selected !== null && onNext(selected)}
        className={`mt-auto w-full cursor-pointer border-0 py-4 text-xs3 font-bold tracking-[0.3rem] transition-all duration-500 ${phase === 'reveal' ? 'bg-gold text-bg' : 'bg-fg/10 text-fg/30'}`}
        disabled={phase !== 'reveal'}
      >
        {index < total - 1 ? '다음 문제 →' : '결과 보기 →'}
      </button>
    </div>
  );
}
