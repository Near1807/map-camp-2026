"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCall } from "./context/Callcontext";
import { GROUP_LEVEL } from "./config";
import { useSound } from "./hooks/useSound";

// Îles simples — un seul bouton, un seul id
const ISLANDS = [
  { id: 1, name: "Ile de la Moria",       src: "/ile1.png", top: "16.8%",  left: "20.7%", width: "27%",   link: "/ile/mele-mele" },
  { id: 6, name: "Marécages Empoisonés ???",            src: "/crado.png", top: "36.4%", left: "0.4%",  width: "30.2%", link: "/ile/poni" },
  { id: 7, name: "Ile de la Fortune", src: "/casino.png", top: "41.47%", left: "39%", width: "9.5%", link: "/ile/labo" },
];

// 👉 Mets à false quand t'as fini d'ajuster les polygones, pour les rendre invisibles
const DEBUG_POLYGONS = false;
const DEBUG_COLORS = ["#ff4444", "#44cc44", "#4488ff", "#ffcc00", "#ff44cc"];

// Convertit une liste de points [x%, y%] en clip-path CSS.
// 👉 C'EST ICI QUE TU AJUSTES LA FORME DE CHAQUE ZONE. Chaque point est en
// pourcentage (0-100) de la largeur/hauteur du conteneur du groupe. Ajoute
// autant de points que nécessaire pour épouser le contour que tu veux.
const toPolygon = (points: [number, number][]) =>
  `polygon(${points.map(([x, y]) => `${x}% ${y}%`).join(", ")})`;

// Îles scindées — plusieurs images empilées au même endroit (transparence),
// avec une zone de survol/clic définie par un polygone (clip-path) par sous-île.
// 👉 zIndex : évite qu'un groupe voisin ne "vole" le survol dans une zone où
// leurs boîtes (top/left/width) se chevauchent en pixels réels.
const ISLAND_GROUPS = [
  {
    groupId: "akala",
    top: "11.7%",
    left: "47.4%",
    width: "30.5%",
    zIndex: 20,
    zones: [
      {
        id: 2, name: "Ile des Combattant", src: "/olympique_Isolée.png", link: "/ile/akala-olympique",
        points: [[60, 20],[80, 20],[80, 30],[95, 55],[75,70],[55,70],[47,85],[30,85],[17,73],[20, 65],[40, 60],[55, 50], [50, 40],[70, 40]] as [number, number][],
      },
      {
        id: 3, name: "Ile de la Gourmandise", src: "/Concu_Isolée.png", link: "/ile/akala-gourmandise",
        points: [[15, 20], [60, 20],[70, 40], [50, 40],[55, 50],[40, 60],[20, 65]] as [number, number][],
      },
    ],
  },
  {
    groupId: "ula-ula",
    top: "31.5%",
    left: "55%",
    width: "55.3%",
    zIndex: 10,
    zones: [
      {
        id: 4, name: "Mont Argenté", src: "/normale_Isolée.png", link: "/ile/ula-ula-montagne",
        points:[[43, 20], [75, 30], [80, 50],[65, 68], [38, 57]]as [number, number][],
      },
      {
        id: 5, name: "Terres Sauvages", src: "/Marche_Isolée.png", link: "/ile/ula-ula-hike",
        points:  [[30, 17], [43, 20], [38, 57] ,[65, 68],[63, 82],[35, 83], [18,60]] as [number, number][],
      },
    ],
  },
];

const CALL_SOUNDS: Record<number, string> = {
  1: "/Appels Chen/Veillée part 1.wav",
  2: "/Appels Chen/Veillée suite.wav",
};



export default function Home() {
  const { inCall, setInCall, playRing, stopRing, callId } = useCall();
  const [answered, setAnswered] = useState(false);
  
  const pickup = useSound(CALL_SOUNDS[callId] ?? CALL_SOUNDS[1]);
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

          {/* Îles simples */}
          {ISLANDS.map((ile) => (
            <div key={ile.id} className="absolute" style={{ top: ile.top, left: ile.left, width: ile.width }}>
              <Link
                href={ile.link}
                onMouseEnter={() => setHovered(ile.id)}
                onMouseLeave={() => setHovered(null)}
                className="block cursor-pointer bg-transparent border-none p-0 transition-all duration-200"
                style={{
                  filter: hovered === ile.id ? "brightness(0.5)" : "brightness(1)",
                }}
              >
                <img src={ile.src} className="w-full h-auto" draggable={false} />
              </Link>

              <div
                className="absolute left-1/2 -translate-x-1/2 -top-4 -translate-y-full whitespace-nowrap rounded-xl border-2 border-[#4a9eff] bg-[#0d2545] px-4 py-2 pointer-events-none transition-opacity duration-200 shadow-lg shadow-black/50 z-30"
                style={{ opacity: hovered === ile.id ? 1 : 0 }}
              >
                <span className="text-lg text-[#7dc8ff] font-mono font-bold tracking-wide">{ile.name}</span>
              </div>
            </div>
          ))}

          {/* Îles scindées en sous-biomes */}
          {ISLAND_GROUPS.map((group) => (
            <div
              key={group.groupId}
              className="absolute"
              style={{ top: group.top, left: group.left, width: group.width, zIndex: group.zIndex }}
            >

              {/* Image de référence invisible — définit la hauteur du conteneur */}
              <img src={group.zones[0].src} className="w-full h-auto invisible" draggable={false} aria-hidden="true" />

              {/* Images empilées — chacune s'assombrit seulement si SA zone est survolée */}
              {group.zones.map((zone) => (
                <img
                  key={zone.id}
                  src={zone.src}
                  className="absolute inset-0 w-full h-full pointer-events-none transition-all duration-200"
                  style={{ filter: hovered === zone.id ? "brightness(0.5)" : "brightness(1)" }}
                  draggable={false}
                />
              ))}

              {/* Zones de survol/clic — forme définie par un polygone (clip-path), éditable dans zone.points */}
              {group.zones.map((zone) => (
                <Link
                  key={zone.id}
                  href={zone.link}
                  onMouseEnter={() => setHovered(zone.id)}
                  onMouseLeave={() => setHovered(null)}
                  className="absolute inset-0"
                  style={{
                    clipPath: toPolygon(zone.points),
                    WebkitClipPath: toPolygon(zone.points),
                  }}
                />
              ))}

              {/* 🐞 Calque de debug — montre visuellement la forme exacte de chaque polygone */}
              {DEBUG_POLYGONS && group.zones.map((zone, i) => (
                <div
                  key={`debug-${zone.id}`}
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    clipPath: toPolygon(zone.points),
                    WebkitClipPath: toPolygon(zone.points),
                    backgroundColor: DEBUG_COLORS[i % DEBUG_COLORS.length],
                    opacity: 0.35,
                    outline: `2px dashed ${DEBUG_COLORS[i % DEBUG_COLORS.length]}`,
                    zIndex: 40,
                  }}
                />
              ))}

              {/* Tooltips */}
              {group.zones.map((zone) => (
                <div
                  key={zone.id}
                  className="absolute left-1/2 -translate-x-1/2 -top-4 -translate-y-full whitespace-nowrap rounded-xl border-2 border-[#4a9eff] bg-[#0d2545] px-4 py-2 pointer-events-none transition-opacity duration-200 shadow-lg shadow-black/50 z-30"
                  style={{ opacity: hovered === zone.id ? 1 : 0 }}
                >
                  <span className="text-lg text-[#7dc8ff] font-mono font-bold tracking-wide">{zone.name}</span>
                </div>
              ))}
            </div>
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
            {!answered && (
                <div className="flex flex-col items-center gap-1">
                  <button
                    onClick={() => { pickup.play(); setAnswered(true); stopRing(); }}
                    className="w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-400 transition-all duration-200 hover:scale-110 flex items-center justify-center text-xl border-2 border-emerald-400"
                  >
                    📞
                  </button>
                  <span className="text-[8px] text-emerald-400 font-mono uppercase tracking-wider">Décrocher</span>
                </div>
              )}
            <div className="flex flex-col items-center gap-1">
              <button
                onClick={() =>{ setInCall(false);stopRing();pickup.stop();setAnswered(false);}}
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



            <div className="border-t border-[#1a3a6a]" />
              <div>
                <p className="text-[9px] text-[#3a6aaa] uppercase tracking-widest font-mono mb-2">Niveau du groupe</p>

                <div className="relative rounded-xl border-2 border-[#4a9eff] bg-gradient-to-br from-[#0d2545] to-[#122f5c] px-4 py-3 overflow-hidden shadow-lg shadow-black/40">
                  {/* Motif scanline en fond */}
                  <div
                    className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 4px, #4a9eff 4px, #4a9eff 5px)" }}
                  />

                  <div className="relative flex items-center justify-between">
                    <div>
                      <p className="text-[9px] text-[#5a8ac0] font-mono uppercase tracking-widest">LVL</p>
                      <p className="text-4xl text-[#7dc8ff] font-mono font-bold leading-none tracking-wider">{GROUP_LEVEL}</p>
                    </div>

                    <div className="flex flex-col items-end gap-1.5">
                      <span className="text-[9px] text-emerald-400 font-mono animate-pulse">● SYNC</span>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            className="w-1.5 h-4 rounded-sm"
                            style={{ background: i < Math.ceil(GROUP_LEVEL / 20) ? "#4a9eff" : "#1a3a6a" }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
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