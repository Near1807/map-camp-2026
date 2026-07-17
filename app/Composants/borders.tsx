"use client"

import { GROUP_LEVEL } from "../config";
import { useCall } from "../context/Callcontext";

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
    }}>
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
        }}>
        {GROUP_LEVEL}
      </div>
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
    }}>
    </footer>
  );
}