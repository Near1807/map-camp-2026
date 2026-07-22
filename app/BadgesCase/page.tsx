"use client";
import { useState } from "react";
import Link from "next/link";
import { badges } from "../data/badges";
import { useRouter } from "next/navigation";

// 👉 Même convention que dans le header : chemin des icônes de type + fallback "non obtenu"
const BADGE_PATH = "/pokemon_types/";
const UNKNOWN_ICON = "unknown.png";

// Nombre d'emplacements dans le boîtier (mousse alvéolée) — fixe, comme un vrai
// badge case physique. Les emplacements au-delà de tes badges réels restent vides.
const TOTAL_SLOTS = 20;

// ============================================================================
// 🎛️ TOUTES LES TAILLES/AJUSTEMENTS VISUELS SONT ICI — change les valeurs et
// recharge la page. Rien d'autre dans le fichier n'a besoin d'être touché.
// ============================================================================
const SIZES = {
  // --- Emplacements du boîtier ---
  slotSize: "clamp(70px, 9vw, 110px)", // taille de chaque rond (min, idéal en % de la largeur d'écran, max)
  slotGap:35,                        // espace entre les ronds, en px
  slotsPerRow: 5,                     // nombre de colonnes de la grille
  badgeFillRatio: 0.7,               // icône = % de la taille du rond (0.5 = petite icône, 0.9 = grande)

  // --- Le boîtier lui-même ---
  casePadding: 20,     // marge intérieure du boîtier, en px
  caseRadius: 28,      // arrondi des coins du boîtier, en px
  caseBorderWidth: 4,  // épaisseur du cadre du boîtier, en px

  // --- Étiquette du dessus ("Badge Case") ---
  labelFontSize: 14,     // taille du texte de l'étiquette, en px
  labelPaddingX: 24,     // marge horizontale de l'étiquette, en px
  labelPaddingY: 6,      // marge verticale de l'étiquette, en px

  // --- Overlay de zoom (quand on clique un badge) ---
  zoomCircleSize: 224,   // diamètre du cercle de zoom, en px
  zoomIconRatio: 0.64,   // icône = % de la taille du cercle de zoom
  zoomNameFontSize: 18,  // taille du texte du nom, en px

  // --- Effets ---
  glowIntensity: 0.5,       // force du halo doré sur un badge obtenu (0 = aucun, 1 = max)
  unknownOpacity: 0.3,      // opacité d'un badge non obtenu (0 = invisible, 1 = pleine opacité)
  hoverScale: 1.1,           // grossissement au survol (1 = aucun effet, 1.3 = gros zoom)
};
// ============================================================================

export default function BadgeCasePage() {
  const [zoomedName, setZoomedName] = useState<string | null>(null);
  const zoomedBadge = badges.find((b) => b.name === zoomedName) ?? null;

  const slots = Array.from({ length: TOTAL_SLOTS }, (_, i) => badges[i] ?? null);

  return (
    <div className="relative min-h-screen w-full bg-[#07111f] flex flex-col items-center justify-center gap-6 p-8">
      <Link
        href="/"
        className="absolute top-6 left-6 text-[#5a8ac0] hover:text-[#7dc8ff] font-mono text-xs uppercase tracking-widest transition-colors"
      >
        ← Carte
      </Link>

      <div className="relative">
        {/* Étiquette du dessus, façon plaque gravée */}
        <div
          className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 rounded-full border-2 border-[#8a6a1f] shadow-lg"
          style={{
            background: "linear-gradient(180deg, #ecd08a, #c99a3d)",
            padding: `${SIZES.labelPaddingY}px ${SIZES.labelPaddingX}px`,
          }}
        >
          <span
            className="font-bold text-[#4a3410] uppercase tracking-widest"
            style={{ fontSize: SIZES.labelFontSize }}
          >
            Badge Case
          </span>
        </div>

        {/* Le boîtier */}
        <div
          className="relative shadow-2xl"
          style={{
            background: "linear-gradient(155deg, #2b2b2f, #1c1c1f 55%, #111113)",
            borderColor: "#3a3a3e",
            borderWidth: SIZES.caseBorderWidth,
            borderStyle: "solid",
            borderRadius: SIZES.caseRadius,
            padding: SIZES.casePadding,
            paddingTop: SIZES.casePadding + 12,
          }}
        >
          <div
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${SIZES.slotsPerRow}, ${SIZES.slotSize})`,
              gap: SIZES.slotGap,
            }}
          >
            {slots.map((badge, i) => {
              const obtained = badge?.obtention;
              return (
                <button
                  key={i}
                  disabled={!badge}
                  onClick={() => badge && setZoomedName(badge.name)}
                  className="group relative aspect-square rounded-full flex items-center justify-center transition-transform duration-300 disabled:cursor-default"
                  style={{
                    width: SIZES.slotSize,
                    background: "radial-gradient(circle at 35% 30%, #26262a, #0a0a0c 70%)",
                    boxShadow: "inset 0 6px 14px rgba(0,0,0,0.75), inset 0 -2px 4px rgba(255,255,255,0.04)",
                  }}
                  onMouseEnter={(e) => {
                    if (badge) e.currentTarget.style.transform = `scale(${SIZES.hoverScale})`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  {badge && (
                    <img
                      src={BADGE_PATH + (obtained ? badge.icon : UNKNOWN_ICON)}
                      alt={obtained ? badge.name : "badge non obtenu"}
                      className="object-contain transition-transform duration-300"
                      style={{
                        width: `${SIZES.badgeFillRatio * 100}%`,
                        height: `${SIZES.badgeFillRatio * 100}%`,
                        opacity: obtained ? 1 : SIZES.unknownOpacity,
                        filter: obtained ? "none" : "grayscale(1)",
                        ...(obtained
                          ? { filter: `drop-shadow(0 0 6px rgba(255,220,120,${SIZES.glowIntensity}))` }
                          : {}),
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <p className="font-mono text-[11px] text-[#3a6aaa] uppercase tracking-widest">
        {badges.filter((b) => b.obtention).length} / {badges.length} badges obtenus
      </p>

      {/* Overlay de zoom — clique sur un badge pour l'extraire du boîtier */}
      {zoomedBadge && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          style={{ animation: "badgeFadeIn 0.2s ease-out" }}
          onClick={() => setZoomedName(null)}
        >
          <div
            className="flex flex-col items-center gap-4"
            style={{ animation: "badgePopIn 0.35s cubic-bezier(0.34,1.56,0.64,1)" }}
          >
            <div
              className="rounded-full flex items-center justify-center"
              style={{
                width: SIZES.zoomCircleSize,
                height: SIZES.zoomCircleSize,
                background: "radial-gradient(circle at 35% 30%, #3a3a40, #101012 75%)",
                boxShadow: zoomedBadge.obtention
                  ? `0 0 60px rgba(255,220,120,${SIZES.glowIntensity * 0.9}), inset 0 6px 14px rgba(0,0,0,0.6)`
                  : "inset 0 6px 14px rgba(0,0,0,0.75)",
              }}
            >
              <img
                src={BADGE_PATH + (zoomedBadge.obtention ? zoomedBadge.icon : UNKNOWN_ICON)}
                alt={zoomedBadge.name}
                className="object-contain"
                style={{
                  width: `${SIZES.zoomIconRatio * 100}%`,
                  height: `${SIZES.zoomIconRatio * 100}%`,
                  opacity: zoomedBadge.obtention ? 1 : SIZES.unknownOpacity,
                  filter: zoomedBadge.obtention ? "none" : "grayscale(1)",
                }}
              />
            </div>
            <span
              className="font-mono font-bold text-[#e8c675] uppercase tracking-widest"
              style={{ fontSize: SIZES.zoomNameFontSize }}
            >
              {zoomedBadge.obtention ? zoomedBadge.name : "???"}
            </span>
            <span className="font-mono text-[10px] text-[#5a8ac0] uppercase tracking-widest">
              clique n'importe où pour refermer
            </span>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes badgeFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes badgePopIn {
          from { opacity: 0; transform: scale(0.6); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}