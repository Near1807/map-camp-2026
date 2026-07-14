"use client";
import { useState, useEffect, useRef } from "react";

const LINES = [
  "> Initialisation ROTOM-NET v3...",
  "> Connexion au serveur Alola...",
  "> Authentification en cours...",
  "> Accès administrateur détecté...",
  "> Chargement des données secrètes...",
  "> ATTENTION: Intrusion détectée",
  "> Bypass sécurité niveau 5...",
  "> Accès GRANTED — entrez le mot de passe",
];

export function HackTerminal({ onClose, onSuccess }: { onClose: () => void; onSuccess?: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  let i = 0;
  let mounted = true;
  const interval = setInterval(() => {
    if (!mounted) return;
    if (i < LINES.length) {
      setLines(prev => [...prev, LINES[i]]);
      i++;
    } else {
    clearInterval(interval);
    if (mounted) setTimeout(() => setUnlocked(true), 100);
    }
  }, 400);
    return () => {
        mounted = false;
        clearInterval(interval);
    };
    }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const handleInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setLines(prev => [...prev, `> ${input}`]);
      if (input.toLowerCase() === "bypass") {
        setLines(prev => [...prev, "> Accès autorisé. Bienvenue."]);
        setTimeout(() => onSuccess?.(), 800);
      } else {
        setLines(prev => [...prev, "> Mot de passe incorrect. Réessayez."]);
      }
      setInput("");
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-[6000] bg-black/90 flex items-center justify-center">
      <div className="border border-green-500/50 bg-black rounded-lg w-full max-w-lg mx-4 overflow-hidden">
        
        <div className="flex items-center justify-between px-3 py-2 border-b border-green-500/30">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          </div>
          <p className="text-[10px] text-green-600 font-mono">ROTOM-TERMINAL — root@alola</p>
          <button onClick={onClose} className="text-[10px] text-green-800 hover:text-green-500 font-mono transition-colors">✕</button>
        </div>

        <div className="p-4 h-72 overflow-y-auto flex flex-col gap-1 font-mono text-[11px]">
          {lines.map((line, i) => (
            <p key={i} className={
              line.includes("GRANTED") || line.includes("autorisé") ? "text-green-400 font-bold" :
              line.includes("ATTENTION") || line.includes("incorrect") ? "text-red-400" :
              "text-green-600"
            }>
              {line}
            </p>
          ))}
          {unlocked && (
            <div className="flex items-center gap-1 mt-1">
              <span className="text-green-400">{">"}</span>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleInput}
                className="bg-transparent text-green-400 outline-none flex-1 caret-green-400"
                placeholder="mot de passe..."
              />
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="border-t border-green-500/30 px-4 py-2 flex justify-between">
          <span className="text-[9px] text-green-800 font-mono">SESSION ACTIVE</span>
          <span className="text-[9px] text-green-600 font-mono animate-pulse">● CONNECTÉ</span>
        </div>

      </div>
    </div>
  );
}