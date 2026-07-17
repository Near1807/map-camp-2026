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

const STYLE = {
  // Taille des labels/titres de section (ex: "Île", "Météo", "Infos")
  labelSize: "text-[11px]",
  // Taille des valeurs dans les lignes d'info (ex: "Volcanique", "28°C")
  valueSize: "text-[13px]",
  // Taille du titre principal de l'île
  titleSize: "text-2xl",
  // Taille du sous-titre (ex: "Île n°1 — Alola")
  subtitleSize: "text-[13px]",
  // Taille du corps de texte (description)
  bodySize: "text-[11px]",
  // Police — font-mono pour le look terminal, font-sans pour plus lisible
  font: "font-mono",
  // Couleur des labels/titres de section (bleu foncé discret)
  labelColor: "text-[#3a6aaa]",
  // Couleur des valeurs principales (bleu clair lumineux)
  valueColor: "text-[#7dc8ff]",
  // Couleur du texte secondaire (description, pokémon, etc.)
  mutedColor: "text-[#5a8ac0]",
};

export default function IlePage() {
  const { id } = useParams();
  const ile = ILES.find(i => i.id === id);
  const pickup = useSound(ile?.pickupSon ?? "/pickup-default.mp3");
  const warningSound = useSound("/sons/warning.mp3"); // 👈 add this
  const { inCall, setInCall, stopRing } = useCall();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  const showWarning = !!ile && GROUP_LEVEL < ile.levelMin; // 👈 add this

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      setVisible(entry.contentRect.width >= 160);
    });
    if (sidebarRef.current) observer.observe(sidebarRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => { // 👈 add this whole block
    if (showWarning) {
      warningSound.play();
    }
    return () => warningSound.stop();
  }, [showWarning, id]);

  if (!ile) return (
    <div className="w-full h-full bg-[#07111f] flex items-center justify-center">
      <p className={`${STYLE.labelColor} ${STYLE.font}`}>Île introuvable</p>
    </div>
  );

  return (
    <div className="relative w-full h-full bg-[#07111f] flex gap-3 p-[8px] items-stretch">
      {showWarning && <LevelWarning />}

      {inCall ? (
        <div className="rounded-2xl border-2 border-[#1e4a8a] bg-[#0d2545] grow overflow-hidden min-w-0 flex flex-col items-center justify-between p-4 relative">

          <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
            <div className="absolute inset-0 opacity-5"
              style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, #00aaff 2px, #00aaff 3px)" }}
            />
          </div>

          <div className="w-full z-10">
            <div className="flex justify-between items-center mb-1">
              <p className={`${STYLE.labelSize} text-emerald-400 uppercase tracking-widest ${STYLE.font} animate-pulse`}>● CONNEXION SÉCURISÉE</p>
              <p className={`${STYLE.labelSize} ${STYLE.labelColor} ${STYLE.font}`}>00:00</p>
            </div>
            <div className="border-t border-[#1a3a6a] mb-2" />
            <p className={`${STYLE.labelSize} ${STYLE.labelColor} uppercase tracking-widest ${STYLE.font}`}>Appel entrant</p>
            <p className={`text-sm ${STYLE.valueColor} ${STYLE.font} font-bold`}>Pr. Chen</p>
            <p className={`${STYLE.labelSize} ${STYLE.labelColor} ${STYLE.font}`}>Laboratoire Pokémon — Bourg-Palette</p>
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
              <span className={`${STYLE.labelSize} ${STYLE.labelColor} ${STYLE.font}`}>SIGNAL</span>
              <span className={`${STYLE.labelSize} text-emerald-400 ${STYLE.font}`}>████ 98%</span>
            </div>
            <div className="flex justify-between">
              <span className={`${STYLE.labelSize} ${STYLE.labelColor} ${STYLE.font}`}>CRYPTAGE</span>
              <span className={`${STYLE.labelSize} ${STYLE.valueColor} ${STYLE.font}`}>AES-256</span>
            </div>
            <div className="flex justify-between">
              <span className={`${STYLE.labelSize} ${STYLE.labelColor} ${STYLE.font}`}>PROTOCOLE</span>
              <span className={`${STYLE.labelSize} ${STYLE.valueColor} ${STYLE.font}`}>ROTOM-NET v3</span>
            </div>
          </div>

          <div className="flex gap-6 z-10">
            <div className="flex flex-col items-center gap-1">
              <button
                onClick={() => { pickup.play(); stopRing(); }}
                className="w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-400 transition-all duration-200 hover:scale-110 flex items-center justify-center text-xl border-2 border-emerald-400"
              >📞</button>
              <span className={`text-[8px] text-emerald-400 ${STYLE.font} uppercase tracking-wider`}>Décrocher</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <button
                onClick={() => { setInCall(false); stopRing(); pickup.stop(); }}
                className="w-12 h-12 rounded-full bg-red-700 hover:bg-red-500 transition-all duration-200 hover:scale-110 flex items-center justify-center text-xl border-2 border-red-500"
              >📵</button>
              <span className={`text-[8px] text-red-400 ${STYLE.font} uppercase tracking-wider`}>Raccrocher</span>
            </div>
          </div>

        </div>
      ) : (
        <div ref={sidebarRef} className="rounded-2xl border-2 border-[#1e4a8a] bg-[#0d2545] grow overflow-hidden min-w-0">
          {visible && (
            <div className="h-full w-full p-4 flex flex-col gap-4 overflow-y-auto overscroll-contain">

              <Link
                href="/"
                className={`${STYLE.labelColor} hover:${STYLE.valueColor} ${STYLE.font} ${STYLE.labelSize} uppercase tracking-widest transition-colors`}
                onClick={() => { setInCall(false); stopRing(); pickup.stop(); }}
              >
                ← Carte
              </Link>

              <div className="border-t border-[#1a3a6a]" />

              <div>
                <p className={`${STYLE.labelSize} ${STYLE.labelColor} uppercase tracking-widest ${STYLE.font} mb-1`}>Île</p>
                <p className={`${STYLE.titleSize} ${STYLE.valueColor} ${STYLE.font} font-bold`}>{ile.nom}</p>
                <p className={`${STYLE.subtitleSize} ${STYLE.labelColor} ${STYLE.font} mt-1`}>{ile.numero}</p>
              </div>

              <div className="border-t border-[#1a3a6a]" />

              <div>
                <p className={`${STYLE.labelSize} ${STYLE.labelColor} uppercase tracking-widest ${STYLE.font} mb-2`}>{ile.biome1}</p>
                <p className={`${STYLE.bodySize} ${STYLE.mutedColor} ${STYLE.font} leading-relaxed`}>{ile.description1}</p>
              </div>

              <div>
                <p className={`${STYLE.labelSize} ${STYLE.labelColor} uppercase tracking-widest ${STYLE.font} mb-2`}>{ile.biome2}</p>
                <p className={`${STYLE.bodySize} ${STYLE.mutedColor} ${STYLE.font} leading-relaxed`}>{ile.description2}</p>
              </div>

              <div className="border-t border-[#1a3a6a]" />

              <div>
                <p className={`${STYLE.labelSize} ${STYLE.labelColor} uppercase tracking-widest ${STYLE.font} mb-2`}>Infos</p>
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between">
                    <span className={`${STYLE.valueSize} ${STYLE.mutedColor} ${STYLE.font}`}>Terrain</span>
                    <span className={`${STYLE.valueSize} ${STYLE.valueColor} ${STYLE.font}`}>{ile.terrain}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`${STYLE.valueSize} ${STYLE.mutedColor} ${STYLE.font}`}>Météo</span>
                    <span className={`${STYLE.valueSize} ${STYLE.valueColor} ${STYLE.font}`}>{ile.meteo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`${STYLE.valueSize} ${STYLE.mutedColor} ${STYLE.font}`}>Difficulté</span>
                    <span className={`${STYLE.valueSize} ${STYLE.font} ${ile.difficulteColor}`}>{ile.difficulte}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`${STYLE.valueSize} ${STYLE.mutedColor} ${STYLE.font}`}>Niveau Recommandé</span>
                    <span className={`${STYLE.valueSize} ${STYLE.valueColor} ${STYLE.font}`}>{ile.niveau}</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#1a3a6a]" />
              <div>
                <p className={`${STYLE.labelSize} ${STYLE.labelColor} uppercase tracking-widest ${STYLE.font} mb-2`}>Biome</p>
                <div className="flex flex-col gap-3">
                  {[
                    { nom: ile.biome1, types: [ile.type1, ile.type2, ile.type3] },
                    { nom: ile.biome2, types: [ile.type4, ile.type5, ile.type6] },
                  ]
                    .filter((b) => b.nom && b.nom !== "pass")
                    .map((b, i) => (
                      <div
                        key={i}
                        className="flex flex-col items-start gap-1.5 border border-[#1a3a6a] rounded-lg px-3 py-2 bg-[#0a1d3d]"
                      >
                        <span className={`text-sm ${STYLE.valueColor} ${STYLE.font} font-bold uppercase tracking-wide`}>
                          {b.nom}
                        </span>
                        <div className="flex gap-1.5">
                          {b.types
                            .filter((t) => t && t !== "pass")
                            .map((t, j) => (
                              <img
                                key={j}
                                src={t.startsWith("/") ? t : `/${t}`}
                                alt=""
                                className="w-10 h-10"
                              />
                            ))}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="border-t border-[#1a3a6a]" />

              <div>
                <p className={`${STYLE.labelSize} ${STYLE.labelColor} uppercase tracking-widest ${STYLE.font} mb-2`}>Pokémon locaux</p>
                <div className="flex flex-wrap gap-2">
                  {ile.pokemons.map((p) => (
                    <span key={p} className={`${STYLE.valueSize} ${STYLE.font} ${STYLE.mutedColor} border border-[#1a3a6a] rounded px-2 py-0.5`}>
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#1a3a6a]" />

            </div>
          )}
        </div>
      )}

      <div className="rounded-2xl border-2 border-[#1e4a8a] bg-[#0d2545] p-[8px] shrink-0">
        <img src={ile.imagebig} className="block rounded-xl h-full w-auto" />
      </div>

    </div>
  );
}