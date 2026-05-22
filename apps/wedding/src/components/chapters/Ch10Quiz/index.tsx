'use client';

import { useState } from 'react';
import { ChapterSection } from '@/components/ui/ChapterSection';
import { ChHeader } from '@/components/ui/ChHeader';
import { QuizIntro } from './QuizIntro';
import { QuizQuestion } from './QuizQuestion';
import { QuizResult } from './QuizResult';
import { QUIZ } from '@/data/quiz';

type Step = 'intro' | 'playing' | 'result';

export function Ch10Quiz() {
  const [step, setStep] = useState<Step>('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const handleStart = () => {
    setCurrentQ(0);
    setAnswers([]);
    setStep('playing');
  };

  const handleNext = (selectedIndex: number) => {
    const next = [...answers, selectedIndex];
    setAnswers(next);
    if (currentQ < QUIZ.length - 1) {
      setCurrentQ((q) => q + 1);
    } else {
      setStep('result');
    }
  };

  const handleRetry = () => {
    setStep('intro');
  };

  return (
    <ChapterSection chIndex={9}>
      <ChHeader
        num={10}
        label="KNOW US?"
        title={
          <>
            우리를
            <br />
            얼마나 아세요?
          </>
        }
      />

      {step === 'intro' && <QuizIntro onStart={handleStart} />}

      {step === 'playing' && QUIZ[currentQ] && (
        <QuizQuestion
          question={QUIZ[currentQ]!}
          index={currentQ}
          total={QUIZ.length}
          onNext={handleNext}
        />
      )}

      {step === 'result' && <QuizResult answers={answers} onRetry={handleRetry} />}
    </ChapterSection>
  );
}
