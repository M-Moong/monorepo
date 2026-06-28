'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { QuizQuestion as Q } from '@/data/quiz';

type Phase = 'choosing' | 'feedback' | 'reveal';
const QUESTION_EXIT_MS = 320;

interface QuizQuestionProps {
  question: Q;
  index: number;
  total: number;
  onNext: (selectedIndex: number) => void;
}

export function QuizQuestion({ question: q, index, total, onNext }: QuizQuestionProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [phase, setPhase] = useState<Phase>('choosing');
  const [isLeaving, setIsLeaving] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const choose = (i: number) => {
    if (phase !== 'choosing') return;
    setSelected(i);
    setPhase('feedback');
    setTimeout(() => setPhase('reveal'), 700);
  };

  const isCorrect = selected === q.answerIndex;
  const transition = prefersReducedMotion
    ? undefined
    : isLeaving
      ? {
          x: { duration: QUESTION_EXIT_MS / 1000, ease: [0.4, 0, 0.2, 1] as const },
          opacity: { duration: 0.24, ease: 'easeOut' as const },
        }
      : {
          x: { type: 'spring' as const, stiffness: 220, damping: 24, mass: 0.9 },
          opacity: { duration: 0.28, ease: 'easeOut' as const },
        };

  const handleNext = () => {
    if (selected === null || phase !== 'reveal' || isLeaving) return;
    if (prefersReducedMotion) {
      onNext(selected);
      return;
    }

    setIsLeaving(true);
    window.setTimeout(() => onNext(selected), QUESTION_EXIT_MS);
  };

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, x: 20 }}
      animate={
        prefersReducedMotion
          ? { opacity: 1 }
          : isLeaving
            ? { opacity: 0, x: -12 }
            : { opacity: 1, x: 0 }
      }
      transition={transition}
      className="mt-4 flex flex-1 flex-col self-stretch"
    >
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
        <div className="flex flex-col">
          <span className="mb-1.5 text-xs tracking-[0.2rem] text-gold">
            Q.{'  '}
            {index + 1} / {total}
          </span>
          <span className="font-serif text-xl leading-[1.4] font-light text-fg">{q.question}</span>
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
                className={`flex cursor-pointer items-start gap-1.5 px-3 py-3.5 text-left text-xs leading-[1.4] transition-all duration-300 ${cls}`}
              >
                <span className="shrink-0 font-serif text-3xs tracking-[0.15rem] opacity-60">
                  {String.fromCharCode(65 + i)}
                </span>
                <span>{c}</span>
              </button>
            );
          })}
        </div>

        {/* reveal 카드 */}
        <div className="h-20 overflow-hidden">
          <div
            className={`h-full rounded-md border border-fg/10 bg-fg/3 px-3 py-2 ${phase === 'reveal' ? 'opacity-100 transition-opacity duration-500' : 'opacity-0'}`}
          >
            <div
              className={`mb-2 text-sm font-bold tracking-[0.2rem] ${isCorrect ? 'text-gold' : 'text-red-400'}`}
            >
              {isCorrect ? '정답 O' : '오답 X'}
            </div>
            <div className="line-clamp-2 pl-1 text-xs text-fg">{q.reveal.caption}</div>
          </div>
        </div>
      </div>

      {/* 다음 버튼 */}
      <button
        onClick={handleNext}
        className={`mt-4 mb-2 flex w-full cursor-pointer items-center justify-center border-0 py-4 text-xs font-bold tracking-[0.3rem] transition-all duration-500 ${phase === 'reveal' ? 'bg-gold text-bg' : 'bg-fg/10 text-fg/30'}`}
        disabled={phase !== 'reveal' || isLeaving}
      >
        <span>{index < total - 1 ? '다음 문제 →' : '결과 보기 →'}</span>
      </button>
    </motion.div>
  );
}
