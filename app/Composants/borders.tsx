"use client"

import { GROUP_LEVEL } from "../config";
import { useCall } from "../context/Callcontext";

// Petit rivet plat — anneau métallique fin, pas de sphère
function Rivet({ style }: { style?: React.CSSProperties }) {
  return (
    <div style={{
      position: 'absolute',
      width: 5,
      height: 5,
      borderRadius: '50%',
      background: '#7a0000',
      border: '1px solid #440000',
      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.15)',
      ...style,
    }} />
  );
}

// Petite grille de ventilation — traits fins groupés
function VentGrille({ style, count = 4 }: { style?: React.CSSProperties; count?: number }) {
  return (
    <div style={{ position: 'absolute', display: 'flex', gap: 2, ...style }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{
          width: 1.5,
          height: 14,
          background: 'rgba(0,0,0,0.3)',
          boxShadow: '1px 0 0 rgba(255,255,255,0.12)',
        }} />
      ))}
    </div>
  );
}

export function PokedexHeader() {
  const { inCall, setInCall, playRing, stopRing } = useCall();
  return (
    <header style={{
      zIndex: 100,
      background: '#c40000',
      height: '60px',
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 26% 100%, 24% 65%, 0 65%)',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      padding: '0 16px',
      paddingBottom: '20px',
      gap: '10px',
      overflow: 'hidden',
    }}>

      {/* Trace de biseau — chaque bord a sa propre ligne selon l'orientation de la lumière */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* bord haut — clair, la lumière tombe dessus */}
        <line x1="0" y1="0" x2="100" y2="0" stroke="rgba(255,220,220,0.65)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        {/* bord droit — mi-clair */}
        <line x1="100" y1="0" x2="100" y2="100" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        {/* bord bas — sombre, en creux */}
        <line x1="100" y1="100" x2="26" y2="100" stroke="rgba(0,0,0,0.5)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        {/* biseau de l'encoche */}
        <line x1="26" y1="100" x2="24" y2="65" stroke="rgba(0,0,0,0.45)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        <line x1="24" y1="65" x2="0" y2="65" stroke="rgba(0,0,0,0.5)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        {/* bord gauche — mi-clair */}
        <line x1="0" y1="65" x2="0" y2="0" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />

        {/* Ligne de séparation interne — sépare le bandeau du corps */}
        <line x1="4" y1="18" x2="96" y2="18" stroke="rgba(0,0,0,0.3)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <line x1="4" y1="19.5" x2="96" y2="19.5" stroke="rgba(255,255,255,0.12)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>

      <Rivet style={{ top: 6, left: 8 }} />
      <Rivet style={{ top: 6, right: 8 }} />
      <Rivet style={{ top: 24, left: 8 }} />

      <div style={{
          width: 26,
          height: 26,
          borderRadius: '50%',
          background: '#0055cc',
          border: '2px solid #002266',
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#eaf2ff',
          fontSize: '18px',
          fontWeight: 'bold',
          paddingTop: '1px',
          flexShrink: 0,
          zIndex: 2,
        }}>
        {GROUP_LEVEL}
      </div>

      <VentGrille style={{ top: 22, left: 62 }} count={3} />

      <div style={{ flex: 1 }} />

      {[
        { color: '#ff4444', ring: '#7a0000' },
        { color: '#ffcc00', ring: '#7a5500' },
        { color: '#44cc44', ring: '#0a5a0a' },
      ].map(({ color, ring }, i) => {
        const isYellow = color === '#ffcc00';
        return (
          <div
            key={i}
            onClick={isYellow ? () => {
              if (inCall) { setInCall(false); stopRing(); }
              else { setInCall(true); playRing(); }
            } : undefined}
            style={{
              position: 'relative',
              width: 12, height: 12, borderRadius: '50%',
              background: color,
              border: `1.5px solid ${ring}`,
              cursor: isYellow ? 'pointer' : 'default',
              zIndex: 2,
            }}
          >
            <div style={{
              position: 'absolute', top: 2, left: 2,
              width: 3, height: 3, borderRadius: '50%',
              background: 'rgba(255,255,255,0.7)',
            }} />
          </div>
        );
      })}
    </header>
  );
}

export function PokedexFooter() {
  return (
    <footer style={{
      zIndex: 100,
      background: '#c40000',
      height: '52px',
      clipPath: 'polygon(0 0, 0 100%, 100% 100%, 100% 0, 62% 0, 60% 25%, 40% 25%, 38% 0)',
      position: 'relative',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      gap: '12px',
      padding: '0 24px 8px',
      overflow: 'hidden',
    }}>

      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* bord gauche — mi-clair */}
        <line x1="0" y1="0" x2="0" y2="100" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        {/* bord bas — sombre */}
        <line x1="0" y1="100" x2="100" y2="100" stroke="rgba(0,0,0,0.5)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        {/* bord droit — mi-clair */}
        <line x1="100" y1="100" x2="100" y2="0" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        {/* biseau de l'encoche */}
        <line x1="100" y1="0" x2="62" y2="0" stroke="rgba(255,220,220,0.5)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        <line x1="62" y1="0" x2="60" y2="25" stroke="rgba(0,0,0,0.4)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        <line x1="60" y1="25" x2="40" y2="25" stroke="rgba(0,0,0,0.45)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        <line x1="40" y1="25" x2="38" y2="0" stroke="rgba(0,0,0,0.4)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        <line x1="38" y1="0" x2="0" y2="0" stroke="rgba(255,220,220,0.5)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />

        {/* Ligne de séparation interne — proche du bord bas */}
        <line x1="4" y1="82" x2="96" y2="82" stroke="rgba(0,0,0,0.3)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <line x1="4" y1="80.5" x2="96" y2="80.5" stroke="rgba(255,255,255,0.1)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>

      <Rivet style={{ bottom: 6, left: 10 }} />
      <Rivet style={{ bottom: 6, right: 10 }} />
      <VentGrille style={{ bottom: 8, left: '50%', transform: 'translateX(-50%)' }} count={5} />

    </footer>
  );
}