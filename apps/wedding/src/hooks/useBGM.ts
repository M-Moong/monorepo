"use client";

import { useEffect } from "react";

export function useBGM(enabled: boolean): void {
  useEffect(() => {
    if (!enabled) return;

    const AudioCtx =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    const gain = ctx.createGain();
    gain.gain.value = 0;
    gain.connect(ctx.destination);

    const freqs: [number, OscillatorType][] = [
      [110, "sine"],
      [165, "sine"],
      [220, "triangle"],
    ];

    const oscs = freqs.map(([freq, type]) => {
      const osc = ctx.createOscillator();
      osc.frequency.value = freq;
      osc.type = type;
      osc.connect(gain);
      osc.start();
      return osc;
    });

    gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 1);

    return () => {
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4);
      setTimeout(() => {
        oscs.forEach((o) => o.stop());
        ctx.close();
      }, 500);
    };
  }, [enabled]);
}
