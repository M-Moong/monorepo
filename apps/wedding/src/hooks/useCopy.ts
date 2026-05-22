'use client';

import { useState, useCallback } from 'react';
import { toast } from 'sonner';

async function writeToClipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  // iOS Safari 구버전 폴백
  const el = document.createElement('textarea');
  el.value = text;
  el.style.cssText = 'position:fixed;opacity:0';
  document.body.appendChild(el);
  el.focus();
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

export function useCopy(timeout = 1600) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copy = useCallback(
    (id: string, text: string) => {
      writeToClipboard(text).then(() => {
        toast.success('복사가 완료되었습니다');
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), timeout);
      });
    },
    [timeout]
  );

  return { copiedId, copy };
}
