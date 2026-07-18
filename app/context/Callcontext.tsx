"use client";
import { createContext, useContext, useState, useRef } from "react";

const CallContext = createContext<{
  inCall: boolean;
  setInCall: (v: boolean) => void;
  playRing: () => void;
  stopRing: () => void;
  callId: number;
  setCallId: (v: number) => void;
}>({
  inCall: false,
  setInCall: () => {},
  playRing: () => {},
  stopRing: () => {},
  callId: 1,
  setCallId: () => {},
});

export function CallProvider({ children }: { children: React.ReactNode }) {
  const [callId, setCallId] = useState(1);
  const [inCall, setInCall] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playRing = () => {
    audioRef.current = new Audio("/sons/call.mp3");
    audioRef.current.loop = true;
    audioRef.current.play();
  };

  const stopRing = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <CallContext.Provider value={{ inCall, setInCall, playRing, stopRing, callId, setCallId }}>
      {children}
    </CallContext.Provider>
  );
}

export const useCall = () => useContext(CallContext);