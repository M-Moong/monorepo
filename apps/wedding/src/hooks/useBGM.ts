'use client';

import { useEffect, useRef } from 'react';

const BGM_SRC = '/audio/bgm_1.mp3';
const BGM_VOLUME = 0.15;

export function useBGM(enabled: boolean): void {
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

    void audio.play().catch(() => {});
  }, [enabled]);
}
