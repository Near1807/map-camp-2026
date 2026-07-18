"use client";
import { useRef, useCallback } from "react";

export function useSound(src: string, onEnded?: () => void) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = useCallback(() => {
    audioRef.current = new Audio(src);
    if (onEnded) {
      // Se déclenche automatiquement quand la lecture arrive au bout du fichier
      // (ne se déclenche PAS si le son boucle, ni si stop() coupe avant la fin)
      audioRef.current.addEventListener("ended", onEnded);
    }
    audioRef.current.play();
  }, [src, onEnded]);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  return { play, stop };
}