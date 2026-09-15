'use client';

import { useRouter } from 'next/navigation';
import { MarriedScreen } from '@/components/ui/MarriedScreen';

// 실제 날짜 로직과 무관한 전용 미리보기 경로. 어디에도 링크 안 걸려있음.
export default function MarriedPreviewPage() {
  const router = useRouter();
  return <MarriedScreen onEnter={() => router.push('/')} />;
}
