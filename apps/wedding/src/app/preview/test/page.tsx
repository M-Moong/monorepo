'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MarriedScreen } from '@/components/ui/MarriedScreen';

// 접속(마운트)할 때마다 타깃을 "10초 뒤"로 새로 잡아서, D-day → 결혼 경과 전환 순간(confetti 포함)을
// 매번 다시 볼 수 있는 테스트 전용 경로. 실제 WEDDING.date 로직과 무관, 어디에도 링크 안 걸려있음.
export default function TestPreviewPage() {
  const router = useRouter();
  const [target] = useState(() => new Date(Date.now() + 10 * 1000));
  return <MarriedScreen target={target} onEnter={() => router.push('/')} />;
}
