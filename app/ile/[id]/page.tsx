"use client";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useCall } from "../../context/Callcontext";
import { LevelWarning } from "../../Composants/warning";
import { useSound } from "../../hooks/useSound";
import { ILES } from "../../data/iles";
import { SoundBar } from "@/app/Composants/soundbar";
import { GROUP_LEVEL } from "@/app/config";

export default function IlePage() {
  const { id } = useParams();
  const ile = ILES.find(i => i.id === id);
  const pickup = useSound(ile?.pickupSon ?? "/pickup-default.mp3");
  const { inCall, setInCall, stopRing } = useCall();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      setVisible(entry.contentRect.width >= 160);
    });
    if (sidebarRef.current) observer.observe(sidebarRef.current);
    return () => observer.disconnect();
  }, []);

  if (!ile) return (
    <div className="w-full h-full bg-[#07111f] flex items-center justify-center">
      <p className="text-[#3a6aaa] font-mono">Île introuvable</p>
    </div>
  );


    console.log("levelMin:", ile.levelMin);
    console.log("level:", Number(process.env.NEXT_PUBLIC_Group_Level));
    console.log("should show:", Number(process.env.NEXT_PUBLIC_Group_Level) < ile.levelMin);

  return (
    <div className="relative w-full h-full bg-[#07111f] flex gap-3 p-[8px] items-stretch">
      {GROUP_LEVEL < ile.levelMin && <LevelWarning />}

      {inCall ? (
        <div className="rounded-2xl border-2 border-[#1e4a8a] bg-[#0d2545] grow overflow-hidden min-w-0 flex flex-col items-center justify-between p-4 relative">

          <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
            <div className="absolute inset-0 opacity-5"
              style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, #00aaff 2px, #00aaff 3px)" }}
            />
          </div>

          <div className="w-full z-10">
            <div className="flex justify-between items-center mb-1">
              <p className="text-[9px] text-emerald-400 uppercase tracking-widest font-mono animate-pulse">● CONNEXION SÉCURISÉE</p>
              <p className="text-[9px] text-[#3a6aaa] font-mono">00:00</p>
            </div>
            <div className="border-t border-[#1a3a6a] mb-2" />
            <p className="text-[9px] text-[#3a6aaa] uppercase tracking-widest font-mono">Appel entrant</p>
            <p className="text-sm text-[#7dc8ff] font-mono font-bold">Pr. Chen</p>
            <p className="text-[9px] text-[#3a6aaa] font-mono">Laboratoire Pokémon — Bourg-Palette</p>
          </div>

          <div className="relative z-10 flex-1 flex items-center justify-center min-h-0">
            <div className="relative p-3">
              <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#4a9eff] z-20" />
              <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[#4a9eff] z-20" />
              <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-[#4a9eff] z-20" />
              <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-[#4a9eff] z-20" />
              <img src="/Chen.png" className="max-h-64 w-auto object-contain" />
            </div>
          </div>

          <div className="w-full z-10 flex flex-col gap-1">
            <div className="flex justify-between">
              <span className="text-[9px] text-[#3a6aaa] font-mono">SIGNAL</span>
              <span className="text-[9px] text-emerald-400 font-mono">████ 98%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[9px] text-[#3a6aaa] font-mono">CRYPTAGE</span>
              <span className="text-[9px] text-[#7dc8ff] font-mono">AES-256</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[9px] text-[#3a6aaa] font-mono">PROTOCOLE</span>
              <span className="text-[9px] text-[#7dc8ff] font-mono">ROTOM-NET v3</span>
            </div>
          </div>

          <div className="flex gap-6 z-10">
            <div className="flex flex-col items-center gap-1">
              <button
                onClick={() => { pickup.play(); stopRing(); }}
                className="w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-400 transition-all duration-200 hover:scale-110 flex items-center justify-center text-xl border-2 border-emerald-400"
              >📞</button>
              <span className="text-[8px] text-emerald-400 font-mono uppercase tracking-wider">Décrocher</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <button
                onClick={() => { setInCall(false); stopRing(); pickup.stop(); }}
                className="w-12 h-12 rounded-full bg-red-700 hover:bg-red-500 transition-all duration-200 hover:scale-110 flex items-center justify-center text-xl border-2 border-red-500"
              >📵</button>
              <span className="text-[8px] text-red-400 font-mono uppercase tracking-wider">Raccrocher</span>
            </div>
          </div>

        </div>
      ) : (
        <div ref={sidebarRef} className="rounded-2xl border-2 border-[#1e4a8a] bg-[#0d2545] grow overflow-hidden min-w-0">
          {visible && (
            <div className="h-full w-full p-4 flex flex-col gap-4">

              <Link href="/" className="text-[#3a6aaa] hover:text-[#7dc8ff] font-mono text-[10px] uppercase tracking-widest transition-colors" onClick={() => { setInCall(false); stopRing(); pickup.stop(); }}>
                ← Carte
              </Link>

              <div className="border-t border-[#1a3a6a]" />

              <div>
                <p className="text-[9px] text-[#3a6aaa] uppercase tracking-widest font-mono mb-1">Île</p>
                <p className="text-2xl text-[#7dc8ff] font-mono font-bold">{ile.nom}</p>
                <p className="text-[11px] text-[#3a6aaa] font-mono mt-1">{ile.numero}</p>
              </div>

              <div className="border-t border-[#1a3a6a]" />

              <div>
                <p className="text-[9px] text-[#3a6aaa] uppercase tracking-widest font-mono mb-2">Description</p>
                <p className="text-[11px] text-[#5a8ac0] font-mono leading-relaxed">{ile.description}</p>
              </div>

              <div className="border-t border-[#1a3a6a]" />

              <div>
                <p className="text-[9px] text-[#3a6aaa] uppercase tracking-widest font-mono mb-2">Infos</p>
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between">
                    <span className="text-[10px] text-[#3a6aaa] font-mono">Terrain</span>
                    <span className="text-[10px] text-[#7dc8ff] font-mono">{ile.terrain}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[10px] text-[#3a6aaa] font-mono">Météo</span>
                    <span className="text-[10px] text-[#7dc8ff] font-mono">{ile.meteo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[10px] text-[#3a6aaa] font-mono">Difficulté</span>
                    <span className={`text-[10px] font-mono ${ile.difficulteColor}`}>{ile.difficulte}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[10px] text-[#3a6aaa] font-mono">Niveau Recommandé</span>
                    <span className="text-[10px] text-[#7dc8ff] font-mono">{ile.niveau}</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#1a3a6a] mt-auto" />

              <div>
                <p className="text-[9px] text-[#3a6aaa] uppercase tracking-widest font-mono mb-2">Pokémon locaux</p>
                <div className="flex flex-wrap gap-2">
                  {ile.pokemons.map((p) => (
                    <span key={p} className="text-[10px] font-mono text-[#5a8ac0] border border-[#1a3a6a] rounded px-2 py-0.5">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
              <div className="border-t border-[#1a3a6a]" />

                <div>
                <p className="text-[9px] text-[#3a6aaa] uppercase tracking-widest font-mono mb-2">Écouter</p>
                <div className="flex flex-col gap-2">
                    {[
                    { label: "Terrain",       src: ile.sons.terrain },
                    { label: "Faune",         src: ile.sons.faune },
                    { label: "Culture locale",src: ile.sons.culture },
                    ].map(({ label, src }) => (
                    <SoundBar key={label} label={label} src={src} />
                    ))}
                </div>
                </div>

            </div>
          )}
        </div>
      )}

      <div className="rounded-2xl border-2 border-[#1e4a8a] bg-[#0d2545] p-[8px] shrink-0">
        <img src={ile.image} className="block rounded-xl h-full w-auto" />
      </div>

    </div>
  );
}