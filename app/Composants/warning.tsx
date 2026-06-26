"use client";
import Link from "next/link";
import { useState } from "react";

export function LevelWarning() {
  const [bypassed, setBypassed] = useState(false);

  if (bypassed) return null;

  return (
    <div className="absolute inset-0 z-50 bg-black/80 flex items-center justify-center">
      <div className="border-2 border-red-500 bg-[#1a0000] rounded-2xl p-8 flex flex-col items-center gap-4 max-w-sm w-full mx-4">
        
        <div className="text-red-500 text-5xl animate-pulse">⚠</div>
        
        <div className="text-center">
          <p className="text-[9px] text-red-700 uppercase tracking-widest font-mono mb-1">Accès refusé</p>
          <p className="text-xl text-red-400 font-mono font-bold">NIVEAU INSUFFISANT</p>
        </div>

        <div className="border-t border-red-900 w-full" />

        <p className="text-[11px] text-red-600 font-mono text-center leading-relaxed">
          Votre niveau est trop faible pour accéder à cette zone. Revenez lorsque vous serez plus expérimenté.
        </p>

        <div className="flex flex-col gap-1 w-full">
          <div className="flex justify-between">
            <span className="text-[9px] text-red-800 font-mono">AUTORISATION</span>
            <span className="text-[9px] text-red-500 font-mono">REFUSÉE</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[9px] text-red-800 font-mono">SÉCURITÉ</span>
            <span className="text-[9px] text-red-500 font-mono animate-pulse">● ACTIVE</span>
          </div>
        </div>

        <Link href="/" className="w-full text-center border border-red-700 hover:border-red-400 hover:text-red-400 text-red-700 font-mono text-[10px] uppercase tracking-widest px-4 py-2 rounded-lg transition-colors">
          ← Retourner en zone sûre
        </Link>

        <button
          onClick={() => setBypassed(true)}
          className="text-[9px] text-red-900 hover:text-red-700 font-mono uppercase tracking-widest transition-colors"
        >
          Ignorer l'avertissement →
        </button>

      </div>
    </div>
  );
}