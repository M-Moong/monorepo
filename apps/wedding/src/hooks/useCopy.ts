'use client';

import { useState, useCallback } from 'react';

export function useCopy(timeout = 1600) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copy = useCallback(
    (id: string, text: string) => {
      navigator.clipboard?.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), timeout);
    },
    [timeout]
  );

  return { copiedId, copy };
}
