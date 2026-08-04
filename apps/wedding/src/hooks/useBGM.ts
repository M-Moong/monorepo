'use client';

import { useCallback, useEffect, useRef } from 'react';

const BGM_SRC = '/audio/bgm_3.mp3';
const BGM_VOLUME = 0.1;

export function useBGM(enabled: boolean): () => void {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const retryPlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !enabled) return;
    void audio.play().catch(() => {});
  }, [enabled]);

  useEffect(() => {
    const audio = new Audio(BGM_SRC);
    audio.loop = true;
    audio.preload = 'none';
    audio.volume = BGM_VOLUME;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!enabled) {
      audio.pause();
      return;
    }

    retryPlay();
  }, [enabled, retryPlay]);

  useEffect(() => {
    if (!enabled) return;

    window.addEventListener('pointerdown', retryPlay, { once: true });
    return () => window.removeEventListener('pointerdown', retryPlay);
  }, [enabled, retryPlay]);

  return retryPlay;
}
