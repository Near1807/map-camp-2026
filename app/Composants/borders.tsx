"use client"

import { GROUP_LEVEL } from "../config";
import { useCall } from "../context/Callcontext";

// Shape geometry lives in one place so the DOM clip-path and the SVG
// bevel/rivet overlay stay perfectly aligned (same coordinate space).
const HEADER_POINTS = [
  [0, 0], [100, 0], [100, 100], [26, 100], [24, 65], [0, 65],
];
const FOOTER_POINTS = [
  [0, 0], [0, 100], [100, 100], [100, 0], [62, 0], [60, 25], [40, 25], [38, 0],
];

const toClipPath = (pts: number[][]) =>
  `polygon(${pts.map(([x, y]) => `${x}% ${y}%`).join(", ")})`;

const toSvgPoints = (pts: number[][]) => pts.map(([x, y]) => `${x},${y}`).join(" ");

const HEADER_CLIP = toClipPath(HEADER_POINTS);
const FOOTER_CLIP = toClipPath(FOOTER_POINTS);

// Reusable "riveted metal plate" — draws the polygon fill, a bevel
// highlight/shadow stroke pair, and a rivet at every structural vertex.
function MetalPlate({
  points,
  id,
  cable = false,
}: {
  points: number[][];
  id: string;
  cable?: boolean;
}) {
  const svgPoints = toSvgPoints(points);
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }}
    >
      <defs>
        {/* mottled red plating, not a flat fill — light "raking" across the metal */}
        <linearGradient id={`plate-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8c0000" />
          <stop offset="28%" stopColor="#d40000" />
          <stop offset="52%" stopColor="#a30000" />
          <stop offset="66%" stopColor="#ff3535" />
          <stop offset="100%" stopColor="#650000" />
        </linearGradient>
        <radialGradient id={`rivet-${id}`} cx="35%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#f4dca0" />
          <stop offset="55%" stopColor="#b8863a" />
          <stop offset="100%" stopColor="#5c3d16" />
        </radialGradient>
        <clipPath id={`clip-${id}`}>
          <polygon points={svgPoints} />
        </clipPath>
      </defs>

      {/* base plate */}
      <polygon points={svgPoints} fill={`url(#plate-${id})`} />

      {/* faint machined seam lines, confined to the plate */}
      <g clipPath={`url(#clip-${id})`} opacity={0.12}>
        {Array.from({ length: 14 }).map((_, i) => (
          <line key={i} x1={-20 + i * 10} y1="0" x2={-40 + i * 10} y2="100" stroke="#000" strokeWidth="0.6" />
        ))}
      </g>

      {/* bevel: highlight on the "lit" edge, shadow to give it thickness */}
      <polygon points={svgPoints} fill="none" stroke="rgba(255,140,140,0.55)" strokeWidth="0.8" />
      <polygon
        points={svgPoints}
        fill="none"
        stroke="rgba(0,0,0,0.55)"
        strokeWidth="1.6"
        transform="translate(0.6,0.9)"
        clipPath={`url(#clip-${id})`}
      />

      {/* rivets on every structural vertex, not scattered at random */}
      {points.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={1.4} fill={`url(#rivet-${id})`} stroke="#2b1a05" strokeWidth={0.25} />
      ))}

      {/* one organic detail to break the rigid geometry, like the coiled
          hose on the reference border */}
      {cable && (
        <path
          d="M 4,8 C 10,4 8,14 14,10 C 20,6 18,16 24,12"
          fill="none"
          stroke="#c99a4a"
          strokeWidth="1.1"
          strokeLinecap="round"
          opacity={0.8}
        />
      )}
    </svg>
  );
}

function Rivet({ size = 8 }: { size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "radial-gradient(circle at 35% 35%, #f4dca0, #8a6a2a)",
        boxShadow: "inset 0 0 1px rgba(0,0,0,0.6)",
        flexShrink: 0,
      }}
    />
  );
}

export function PokedexHeader() {
  const { inCall, setInCall, playRing, stopRing } = useCall();
  return (
    <header
      style={{
        zIndex: 100,
        height: "60px",
        clipPath: HEADER_CLIP,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <MetalPlate points={HEADER_POINTS} id="header" cable />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          paddingBottom: "20px",
          gap: "10px",
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: "radial-gradient(circle at 35% 35%, #60aaff, #0055cc)",
            border: "3px solid #003399",
            boxShadow: "0 0 0 2px #8a6a2a, 0 1px 2px rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#CAD3E3",
            fontSize: "20px",
            fontWeight: "bold",
            paddingTop: "2px",
            flexShrink: 0,
          }}
        >
          {GROUP_LEVEL}
        </div>

        {[
          { color: "#ff4444", onClick: undefined },
          {
            color: "#ffcc00",
            onClick: () => {
              if (inCall) {
                setInCall(false);
                stopRing();
              } else {
                setInCall(true);
                playRing();
              }
            },
          },
          { color: "#44cc44", onClick: undefined },
        ].map(({ color, onClick }, i) => (
          <div
            key={i}
            onClick={onClick}
            style={{
              width: 16,
              height: 16,
              borderRadius: "50%",
              backgroundColor: color,
              boxShadow: "inset 0 0 2px rgba(0,0,0,0.6), 0 0 0 2px #5c3d16",
              cursor: onClick ? "pointer" : "default",
            }}
          />
        ))}
      </div>
    </header>
  );
}

export function PokedexFooter() {
  return (
    <footer
      style={{
        zIndex: 100,
        height: "52px",
        clipPath: FOOTER_CLIP,
        position: "relative",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        gap: "12px",
        padding: "0 24px 8px",
        overflow: "hidden",
      }}
    >
      <MetalPlate points={FOOTER_POINTS} id="footer" />
    </footer>
  );
}