export function useSound(src: string) {
  const audioRef = { current: null as HTMLAudioElement | null };

  const play = () => {
    audioRef.current = new Audio(src);
    audioRef.current.play();
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return { play, stop };
}