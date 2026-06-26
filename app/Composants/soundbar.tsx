import { useRef, useState } from "react";

export function SoundBar({ label, src }: { label: string; src: string }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggle = () => {
    if (playing) {
      audioRef.current?.pause();
      if (audioRef.current) audioRef.current.currentTime = 0;
      setPlaying(false);
    } else {
      audioRef.current = new Audio(src);
      audioRef.current.play();
      audioRef.current.onended = () => setPlaying(false);
      setPlaying(true);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={toggle}
        className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] border transition-all shrink-0
          ${playing
            ? "bg-[#7dc8ff22] border-[#7dc8ff] text-[#7dc8ff]"
            : "bg-transparent border-[#1a3a6a] text-[#3a6aaa] hover:border-[#4a9eff] hover:text-[#4a9eff]"
          }`}
      >
        {playing ? "■" : "▶"}
      </button>
      <div className="flex-1 h-px bg-[#1a3a6a] relative overflow-hidden rounded-full">
        {playing && (
          <div className="absolute inset-y-0 left-0 bg-[#7dc8ff] animate-pulse" style={{ width: "60%" }} />
        )}
      </div>
      <span className="text-[10px] text-[#3a6aaa] font-mono shrink-0">{label}</span>
    </div>
  );
}