"use client"

import { GROUP_LEVEL } from "../config";
import { useCall } from "../context/Callcontext";

function Rivet({ style }: { style?: React.CSSProperties }) {
  return (
    <div style={{
      position: 'absolute',
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: 'radial-gradient(circle at 35% 30%, #ffdddd, #990000 60%, #550000 100%)',
      boxShadow: 'inset -1px -1px 1px rgba(0,0,0,0.6), 0 1px 1px rgba(0,0,0,0.4)',
      ...style,
    }} />
  );
}

export function PokedexHeader() {
  const { inCall, setInCall, playRing, stopRing } = useCall();
  return (
    <header style={{
      zIndex: 100,
      background: `
        linear-gradient(180deg, #ff3333 0%, #dd1111 8%, #cc0000 45%, #a80000 85%, #8f0000 100%),
        radial-gradient(ellipse 120% 60% at 30% -10%, rgba(255,180,180,0.35), transparent 60%)
      `,
      height: '60px',
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 26% 100%, 24% 65%, 0 65%)',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      padding: '0 16px',
      paddingBottom: '20px',
      gap: '10px',
      boxShadow: `
        inset 0 2px 0 rgba(255,255,255,0.25),
        inset 0 -6px 10px rgba(0,0,0,0.35),
        0 3px 8px rgba(0,0,0,0.4)
      `,
      overflow: 'hidden',
    }}>

      {/* Ligne de trim horizontale claire, juste sous le bord supérieur */}
      <div style={{
        position: 'absolute', top: 4, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5) 15%, rgba(255,255,255,0.5) 85%, transparent)',
      }} />

      {/* Ligne de trim horizontale sombre, plus bas — sépare "bandeau haut" du corps */}
      <div style={{
        position: 'absolute', top: 14, left: 0, right: 0, height: 2,
        background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.4) 10%, rgba(0,0,0,0.4) 90%, transparent)',
        boxShadow: '0 1px 0 rgba(255,255,255,0.15)',
      }} />

      {/* Séparateur vertical après la bille de niveau */}
      <div style={{
        position: 'absolute', top: 18, bottom: 22, left: 54, width: 2,
        background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.35) 20%, rgba(0,0,0,0.35) 80%, transparent)',
        boxShadow: '1px 0 0 rgba(255,255,255,0.15)',
      }} />

      {/* Séparateur vertical avant le groupe de lumières */}
      <div style={{
        position: 'absolute', top: 18, bottom: 22, right: 76, width: 2,
        background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.35) 20%, rgba(0,0,0,0.35) 80%, transparent)',
        boxShadow: '1px 0 0 rgba(255,255,255,0.15)',
      }} />

      {/* Rivets dans les coins / points d'ancrage du panneau */}
      <Rivet style={{ top: 6, left: 10 }} />
      <Rivet style={{ top: 6, right: 10 }} />
      <Rivet style={{ bottom: 8, left: 65 }} />

      <div style={{
          width: 28,
          height: 28,
          borderRadius: '50%',
          background: 'radial-gradient(circle at 32% 28%, #a8d4ff, #60aaff 35%, #0055cc 75%, #003399 100%)',
          border: '3px solid #002266',
          boxShadow: `
            inset -2px -2px 3px rgba(0,0,0,0.4),
            inset 2px 2px 3px rgba(255,255,255,0.5),
            0 2px 4px rgba(0,0,0,0.5)
          `,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#eaf2ff',
          fontSize: '20px',
          fontWeight: 'bold',
          textShadow: '0 1px 2px rgba(0,0,0,0.5)',
          paddingTop:'2px',
          flexShrink: 0,
          zIndex: 2,
        }}>
        {GROUP_LEVEL}
      </div>

      <div style={{ flex: 1 }} />

      {[
        { color: '#ff5555', dark: '#a80000', onClick: undefined },
        { color: '#ffdd44', dark: '#a87700', onClick: () => {
          if (inCall) {
            setInCall(false);
            stopRing();
          } else {
            setInCall(true);
            playRing();
          }
        }},
        { color: '#55dd55', dark: '#0a7a0a', onClick: undefined },
      ].map(({ color, dark, onClick }, i) => (
        <div key={i} onClick={onClick} style={{
          width: 12, height: 12, borderRadius: '50%',
          background: `radial-gradient(circle at 32% 28%, #fff, ${color} 40%, ${dark} 100%)`,
          boxShadow: `
            inset -1px -1px 2px rgba(0,0,0,0.4),
            0 1px 2px rgba(0,0,0,0.5)
          `,
          cursor: onClick ? 'pointer' : 'default',
          zIndex: 2,
        }} />
      ))}
    </header>
  );
}

export function PokedexFooter() {
  return (
    <footer style={{
      zIndex: 100,
      background: `
        linear-gradient(180deg, #8f0000 0%, #a80000 15%, #cc0000 55%, #dd1111 92%, #ff3333 100%),
        radial-gradient(ellipse 120% 60% at 70% 110%, rgba(255,180,180,0.25), transparent 60%)
      `,
      height: '52px',
      clipPath: 'polygon(0 0, 0 100%, 100% 100%, 100% 0, 62% 0, 60% 25%, 40% 25%, 38% 0)',
      position: 'relative',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      gap: '12px',
      padding: '0 24px 8px',
      boxShadow: `
        inset 0 -2px 0 rgba(0,0,0,0.3),
        inset 0 6px 10px rgba(0,0,0,0.3),
        0 -3px 8px rgba(0,0,0,0.35)
      `,
      overflow: 'hidden',
    }}>

      {/* Ligne de trim horizontale sombre juste au-dessus du bord bas */}
      <div style={{
        position: 'absolute', bottom: 4, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35) 15%, rgba(255,255,255,0.35) 85%, transparent)',
      }} />

      {/* Ligne de trim sombre, séparant le corps du bandeau bas */}
      <div style={{
        position: 'absolute', bottom: 12, left: 0, right: 0, height: 2,
        background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.35) 10%, rgba(0,0,0,0.35) 90%, transparent)',
      }} />

      {/* Rivets */}
      <Rivet style={{ bottom: 6, left: 14 }} />
      <Rivet style={{ bottom: 6, right: 14 }} />

    </footer>
  );
}