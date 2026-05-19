'use client';

import { useState, useEffect } from 'react';

interface CountdownResult {
  d: number;
  h: number;
  m: number;
  s: number;
  total: number;
  isPast: boolean;
}

export function useCountdown(target: Date): CountdownResult {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const total = target.getTime() - now;
  const abs = Math.abs(total);

  return {
    d: Math.floor(abs / 86_400_000),
    h: Math.floor((abs % 86_400_000) / 3_600_000),
    m: Math.floor((abs % 3_600_000) / 60_000),
    s: Math.floor((abs % 60_000) / 1_000),
    total,
    isPast: total < 0,
  };
}
