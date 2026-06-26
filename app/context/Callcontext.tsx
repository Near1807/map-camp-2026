"use client";
import { createContext, useContext, useState, useRef } from "react";

const CallContext = createContext<{
  inCall: boolean;
  setInCall: (v: boolean) => void;
  playRing: () => void;
  stopRing: () => void;
  bypassedIles: string[];
  bypassWarning: (id: string) => void;
}>({ inCall: false, setInCall: () => {}, playRing: () => {}, stopRing: () => {}, bypassedIles: [], bypassWarning: () => {} });

export function CallProvider({ children }: { children: React.ReactNode }) {
  const [inCall, setInCall] = useState(false);
  const [bypassedIles, setBypassedIles] = useState<string[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playRing = () => {
    audioRef.current = new Audio("/china-ringing-phone.mp3");
    audioRef.current.loop = true;
    audioRef.current.play();
  };

  const stopRing = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const bypassWarning = (id: string) => {
    setBypassedIles(prev => [...prev, id]);
  };

  return (
    <CallContext.Provider value={{ inCall, setInCall, playRing, stopRing, bypassedIles, bypassWarning }}>
      {children}
    </CallContext.Provider>
  );
}

export const useCall = () => useContext(CallContext);