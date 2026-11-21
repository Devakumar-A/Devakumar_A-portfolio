import { useId } from "react";

/* Everything drawn on the device screens is original, 1-bit style artwork.
   Colours come from CSS (--ink on --lcd), so each colourway re-tints it. */

const Q = 4; // pixel grid

function stepped(seed, W = 960, period = 480) {
  const comps = [
    { k: 2 + (seed % 3), a: 15, p: seed * 1.3 },
    { k: 6 + (seed % 4), a: 8, p: seed * 0.7 },
    { k: 13 + (seed % 5), a: 3, p: seed * 2.1 },
  ];
  let d = "";
  for (let x = 0; x <= W; x += Q * 2) {
    const y = Math.round(comps.reduce((s, c) => s + c.a * Math.sin((2 * Math.PI * c.k * x) / period + c.p), 0) / Q) * Q;
    d += x === 0 ? `M${x} ${y}` : ` H${x} V${y}`;
  }
  return d;
}

function blob(cx, cy, r, s) {
  let d = "";
  for (let a = 0; a <= 360; a += 10) {
    const t = (a * Math.PI) / 180;
    const rr = r * (1 + 0.13 * Math.sin(3 * t + s) + 0.07 * Math.sin(5 * t + 2 * s));
    d += `${a === 0 ? "M" : "L"}${(cx + rr * Math.cos(t)).toFixed(1)} ${(cy + rr * Math.sin(t) * 0.92).toFixed(1)} `;
  }
  return d + "Z";
}

function Dither({ id }) {
  return (
    <pattern id={id} width="4" height="4" patternUnits="userSpaceOnUse">
      <rect width="2" height="2" />
      <rect x="2" y="2" width="2" height="2" />
    </pattern>
  );
}

export function EegScreen() {
  const grid = useId();
  return (
    <div className="lcd-art">
      <svg viewBox="0 0 480 250" preserveAspectRatio="xMidYMid meet" shapeRendering="crispEdges" aria-hidden="true">
        <defs>
          <pattern id={grid} width="16" height="16" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="2" height="2" />
          </pattern>
        </defs>
        <rect width="480" height="250" fill={`url(#${grid})`} opacity="0.22" />
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(0 ${44 + i * 54})`}>
            <path className="lcd-trace" style={{ "--d": `${9 + i * 2.5}s` }} d={stepped(i + 2)} />
          </g>
        ))}
      </svg>
      <p className="lcd-tasks" aria-hidden="true">
        <span className="on">▸INTENT</span> <span>EMOTION</span> <span>PAIN</span>
        <i className="lcd-caret" />
      </p>
    </div>
  );
}

export function AquaScreen() {
  const dith = useId();
  const markers = [
    { x: 92, y: 62, t: "CROP" },
    { x: 214, y: 70, t: "YIELD" },
    { x: 78, y: 176, t: "IRRIG" },
    { x: 206, y: 184, t: "RISK" },
  ];
  return (
    <div className="lcd-art">
      <svg viewBox="0 0 480 250" preserveAspectRatio="xMidYMid meet" shapeRendering="crispEdges" aria-hidden="true">
        <defs><Dither id={dith} /></defs>
        {[100, 78, 56, 34].map((r, i) => (
          <path key={r} d={blob(150, 125, r, i * 0.9)} fill={i === 3 ? `url(#${dith})` : "none"} className="lcd-line" strokeWidth={i === 0 ? 3 : 2} />
        ))}
        {markers.map((m, i) => (
          <g key={m.t}>
            <path className="lcd-flow" d={`M${m.x + 5} ${m.y + 5} L300 125`} style={{ "--i": i }} />
            <rect x={m.x} y={m.y} width="10" height="10" className="lcd-solid" />
            <text x={m.x + 15} y={m.y + 10} className="lcd-text">{m.t}</text>
          </g>
        ))}
        <rect x="300" y="100" width="62" height="50" className="lcd-line" strokeWidth="3" fill="none" />
        <text x="331" y="131" textAnchor="middle" className="lcd-text big">API</text>
        <path className="lcd-flow" d="M362 125 L412 125" />
        <rect x="412" y="100" width="58" height="50" className="lcd-solid" />
        <text x="441" y="131" textAnchor="middle" className="lcd-text big inv">UI</text>
      </svg>
    </div>
  );
}

export function MovieScreen() {
  const dith = useId();
  return (
    <div className="lcd-art">
      <svg viewBox="0 0 480 250" preserveAspectRatio="xMidYMid meet" shapeRendering="crispEdges" aria-hidden="true">
        <defs><Dither id={dith} /></defs>
        <rect x="0" y="62" width="480" height="116" className="lcd-solid" />
        <g className="lcd-sprocket">
          {Array.from({ length: 40 }).map((_, i) => (
            <g key={i}>
              <rect x={i * 24 + 6} y="68" width="10" height="8" className="lcd-hole" />
              <rect x={i * 24 + 6} y="164" width="10" height="8" className="lcd-hole" />
            </g>
          ))}
        </g>
        {/* frame 1: plot text */}
        <rect x="22" y="84" width="130" height="72" className="lcd-hole" />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x="32" y={94 + i * 12} width={[96, 84, 98, 62, 78][i]} height="5" className="lcd-solid" />
        ))}
        {/* frame 2: poster */}
        <rect x="175" y="84" width="130" height="72" className="lcd-hole" />
        <rect x="185" y="92" width="110" height="56" fill={`url(#${dith})`} />
        <circle cx="262" cy="108" r="9" className="lcd-hole" />
        <path d="M185 148 L218 114 L242 134 L262 120 L295 148 Z" className="lcd-solid" />
        {/* frame 3: genre confidence */}
        <rect x="328" y="84" width="130" height="72" className="lcd-hole" />
        {[96, 70, 46, 24].map((w, i) => (
          <rect key={i} x="338" y={94 + i * 15} width={w} height="9" className="lcd-solid" style={i === 0 ? { animation: "lcd-bar 2.4s steps(6) infinite" } : undefined} />
        ))}
        <text x="22" y="204" className="lcd-text">PLOT</text>
        <text x="175" y="204" className="lcd-text">POSTER</text>
        <text x="328" y="204" className="lcd-text">GENRES</text>
        <text x="22" y="226" className="lcd-text dim">BERT</text>
        <text x="175" y="226" className="lcd-text dim">RESNET50</text>
        <text x="328" y="226" className="lcd-text dim">CONFIDENCE</text>
      </svg>
    </div>
  );
}

export const screens = { eeg: EegScreen, aqua: AquaScreen, movie: MovieScreen };

export function SpecsScreen({ items }) {
  return (
    <ul className="lcd-list lcd-specs">
      {items.map((t) => (<li key={t}><b>▸</b>{t}</li>))}
    </ul>
  );
}

export function StackScreen({ items }) {
  return (
    <ul className="lcd-list lcd-stack">
      {items.map((t, i) => (<li key={t}><b>{String(i + 1).padStart(2, "0")}</b>{t}</li>))}
      <li className="lcd-end" aria-hidden="true"><i className="lcd-caret" /></li>
    </ul>
  );
}
