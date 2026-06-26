"use client"

import { GROUP_LEVEL } from "../config";
import { useCall } from "../context/Callcontext";

export function PokedexHeader() {
  const { inCall, setInCall, playRing, stopRing } = useCall();
  return (
    <header style={{
      zIndex: 100,
      backgroundColor: '#CC0000',
      height: '60px',
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 26% 100%, 24% 65%, 0 65%)',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      padding: '0 16px',
      paddingBottom: '20px',
      gap: '10px',
    }}>
      <div style={{
          width: 28,
          height: 28,
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, #60aaff, #0055cc)',
          border: '3px solid #003399',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#CAD3E3',
          fontSize: '20px',
          fontWeight: 'bold',
          paddingTop:'2px',
          flexShrink: 0,
        }}>
        {GROUP_LEVEL}
      </div>
      {[
        { color: '#ff4444', onClick: undefined },
        { color: '#ffcc00', onClick: () => {
          if (inCall) {
            setInCall(false);
            stopRing();
          } else {
            setInCall(true);
            playRing();
          }
        }},
        { color: '#44cc44', onClick: undefined },
      ].map(({ color, onClick }, i) => (
        <div key={i} onClick={onClick} style={{
          width: 12, height: 12, borderRadius: '50%',
          backgroundColor: color,
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
      backgroundColor: '#CC0000',
      height: '52px',
      clipPath: 'polygon(0 0, 0 100%, 100% 100%, 100% 0, 62% 0, 60% 25%, 40% 25%, 38% 0)',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      gap: '12px',
      padding: '0 24px 8px',
    }}>
    </footer>
  );
}