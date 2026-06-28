'use client';

import { useEffect, useRef } from 'react';

const BGM_SRC = '/audio/bgm_3.mp3';
const BGM_VOLUME = 0.1;

export function useBGM(enabled: boolean): () => void {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const retryPlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    void audio.play().catch(() => {});
  };

  useEffect(() => {
    const audio = new Audio(BGM_SRC);
    audio.loop = true;
    audio.preload = 'auto';
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
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    window.addEventListener('pointerdown', retryPlay, { once: true });
    return () => window.removeEventListener('pointerdown', retryPlay);
  }, [enabled]);

  return retryPlay;
}
