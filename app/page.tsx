"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCall } from "./context/Callcontext";

const ISLANDS = [
  { id: 1, name: "Mélé-Mélé",            src: "/ile1.png", top: "16.8%",  left: "20.7%", width: "27%",link:"/ile/mele-mele" },
  { id: 2, name: "Akala",              src: "/ile2.png", top: "18.1%",  left: "50.1%", width: "26.6%",link:"/ile/akala" },
  { id: 3, name: "Ula-Ula",            src: "/ile3.png", top: "41.5%", left: "63.8%",  width: "36.5%",link:"/ile/ula-ula" },
  { id: 4, name: "Poni",               src: "/ile4.png", top: "36.4%", left: "0.4%", width: "30.2%",link:"/ile/poni" },
  { id: 5, name: "Labo flottant",      src: "/ile5.png", top: "41.47%", left: "39%", width: "9.5%",link:"/ile/labo" },
];

export default function Home() {
  const { inCall, setInCall, playRing, stopRing } = useCall();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      setVisible(entry.contentRect.width >= 160);
    });
    if (sidebarRef.current) observer.observe(sidebarRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full h-full bg-[#07111f] flex gap-3 p-[8px] items-stretch px-15">

      {/* Colonne gauche — carte */}
      <div className="rounded-2xl border-2 border-[#1e4a8a] bg-[#0d2545] p-[8px] shrink-0">
        <div className="relative h-full">
          <img src="/alola.png" className="block rounded-xl h-full w-auto" />

          {ISLANDS.map((ile) => (
            <Link
              href = {ile.link}
              key={ile.id}
              onMouseEnter={() => setHovered(ile.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => console.log(ile.name)}
              className="absolute cursor-pointer bg-transparent border-none p-0 transition-all duration-200"
              style={{
                top: ile.top,
                left: ile.left,
                width: ile.width,
                filter: hovered === ile.id ? "brightness(0.5)" : "brightness(1)",
              }}
            >
              <img src={ile.src} className="w-full h-auto" draggable={false} />
            </Link>
          ))}
        </div>
      </div>

      {/* Colonne droite */}

      {inCall ? (
        <div className="rounded-2xl border-2 border-[#1e4a8a] bg-[#0d2545] grow overflow-hidden min-w-0 flex flex-col items-center justify-between p-4 relative">
          
          {/* Scan line animation */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
            <div className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, #00aaff 2px, #00aaff 3px)",
              }}
            />
          </div>

          {/* Header */}
          <div className="w-full z-10">
            <div className="flex justify-between items-center mb-1">
              <p className="text-[9px] text-emerald-400 uppercase tracking-widest font-mono animate-pulse">● CONNEXION SÉCURISÉE</p>
              <p className="text-[9px] text-[#3a6aaa] font-mono" id="timer">00:00</p>
            </div>
            <div className="border-t border-[#1a3a6a] mb-2" />
            <p className="text-[9px] text-[#3a6aaa] uppercase tracking-widest font-mono">Appel entrant</p>
            <p className="text-sm text-[#7dc8ff] font-mono font-bold">Pr. Chen</p>
            <p className="text-[9px] text-[#3a6aaa] font-mono">Laboratoire Pokémon — Bourg-Palette</p>
          </div>

          {/* Photo avec frame */}
          <div className="relative z-10 flex-1 flex items-center justify-center min-h-0">
          <div className="relative">
            <div className="absolute top-0.5 left-0.5 w-3 h-3 border-t-2 border-l-2 border-[#4a9eff] z-20" />
            <div className="absolute top-0.5 right-0.5 w-3 h-3 border-t-2 border-r-2 border-[#4a9eff] z-20" />
            <div className="absolute bottom-0.5 left-0.5 w-3 h-3 border-b-2 border-l-2 border-[#4a9eff] z-20" />
            <div className="absolute bottom-0.5 right-0.5 w-3 h-3 border-b-2 border-r-2 border-[#4a9eff] z-20" />
            <img src="/Chen.png" className="max-h-70 w-auto object-contain" />
          </div>
        </div>

          {/* Infos techniques */}
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

          {/* Boutons */}
          <div className="flex gap-6 z-10">
            <div className="flex flex-col items-center gap-1">
              <button
                onClick={() => console.log("décrocher")}
                className="w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-400 transition-all duration-200 hover:scale-110 flex items-center justify-center text-xl border-2 border-emerald-400"
              >
                📞
              </button>
              <span className="text-[8px] text-emerald-400 font-mono uppercase tracking-wider">Décrocher</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <button
                onClick={() =>{ setInCall(false);stopRing()}}
                className="w-12 h-12 rounded-full bg-red-700 hover:bg-red-500 transition-all duration-200 hover:scale-110 flex items-center justify-center text-xl border-2 border-red-500"
              >
                📵
              </button>
              <span className="text-[8px] text-red-400 font-mono uppercase tracking-wider">Raccrocher</span>
            </div>
          </div>

        </div>
      ) : (
      <div ref={sidebarRef} className="rounded-2xl border-2 border-[#1e4a8a] bg-[#0d2545] grow overflow-hidden min-w-0">
        {visible && (
          <div className="h-full w-full p-4 flex flex-col gap-4">
            <div>
              <p className="text-[9px] text-[#3a6aaa] uppercase tracking-widest font-mono mb-1">Région</p>
              <p className="text-sm text-[#7dc8ff] font-mono">Alola</p>
            </div>
            <div className="border-t border-[#1a3a6a]" />
            <div>
              <p className="text-[9px] text-[#3a6aaa] uppercase tracking-widest font-mono mb-2">Météo des îles</p>
              {[
                { name: "Mélé-Mélé", color: "#4ade80", icon: "🌤️", meteo: "Ensoleillé", temp: "28°C" },
                { name: "Akala",   color: "#fb923c", icon: "⛅",  meteo: "Nuageux",    temp: "25°C" },
                { name: "Ula-Ula", color: "#818cf8", icon: "🌧️", meteo: "Pluie",      temp: "21°C" },
                { name: "Poni",    color: "#f472b6", icon: "⛈️", meteo: "Orage",      temp: "19°C" },
              ].map((il) => (
                <div key={il.name} className="flex items-center gap-3 py-0.5">
                  <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: il.color }} />
                  <span className="text-[11px] text-[#5a8ac0] font-mono w-16 shrink-0">{il.name}</span>
                  <span className="text-base">{il.icon}</span>
                  <span className="text-[11px] text-[#7dc8ff] font-mono grow">{il.meteo}</span>
                  <span className="text-[11px] text-[#5a8ac0] font-mono">{il.temp}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-[#1a3a6a] mt-auto" />
            <div>
              <p className="text-[9px] text-[#3a6aaa] uppercase tracking-widest font-mono mb-2">Système</p>
              <div className="flex flex-col gap-1">
                <div className="flex justify-between">
                  <span className="text-[10px] text-[#3a6aaa] font-mono">ROTOM-DEX</span>
                  <span className="text-[10px] text-emerald-400 font-mono">● EN LIGNE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[10px] text-[#3a6aaa] font-mono">SYNC POKÉDEX</span>
                  <span className="text-[10px] text-[#7dc8ff] font-mono">v4.2.1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[10px] text-[#3a6aaa] font-mono">SIGNAL</span>
                  <span className="text-[10px] text-[#7dc8ff] font-mono">███░ 74%</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      )}
    </div>
  );
}