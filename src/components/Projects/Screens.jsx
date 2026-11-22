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

/* ---------- 15 additional screens ---------- */
function S({ children, defs }) {
  return (
    <div className="lcd-art">
      <svg viewBox="0 0 480 250" preserveAspectRatio="xMidYMid meet" shapeRendering="crispEdges" aria-hidden="true">
        {defs && <defs>{defs}</defs>}
        {children}
      </svg>
    </div>
  );
}
const T = ({ x, y, children, cls = "", a }) => (<text x={x} y={y} textAnchor={a} className={`lcd-text ${cls}`}>{children}</text>);
const Bx = ({ x, y, w, h, sw = 3, ...r }) => (<rect x={x} y={y} width={w} height={h} className="lcd-line" fill="none" strokeWidth={sw} {...r} />);
const Ln = ({ d, sw = 2, flow, i = 0 }) => (<path d={d} className={flow ? "lcd-flow" : "lcd-line"} fill="none" strokeWidth={sw} style={flow ? { "--i": i } : undefined} />);

export function NeuroScreen() {
  return (
    <S>
      <g transform="translate(0 62)"><path className="lcd-trace" style={{ "--d": "8s" }} d={stepped(5)} /></g>
      <Ln d="M0 112 H480" sw={2} />
      {[["NEU", 70], ["SAD", 40], ["FEAR", 24], ["HAP", 58], ["ANX", 32]].map(([l, h], i) => (
        <g key={l}>
          <rect x={30 + i * 90} y={206 - h} width="58" height={h} className="lcd-solid" style={i === 3 ? { animation: "lcd-bar 2.4s steps(6) infinite" } : undefined} />
          <T x={59 + i * 90} y="232" a="middle">{l}</T>
        </g>
      ))}
      <T x="8" y="134" cls="dim">105 FEATURES</T>
      <T x="472" y="134" a="end" cls="dim">RESNET-MLP</T>
    </S>
  );
}

export function MudraScreen() {
  const fingers = [[150, 150, 112, 96, 96, 54], [168, 140, 160, 84, 156, 30], [186, 144, 200, 78, 206, 24], [202, 154, 238, 96, 254, 52], [138, 168, 92, 150, 60, 118]];
  return (
    <S>
      <path d="M130 214 L124 160 L212 160 L226 214 Z" className="lcd-line" fill="none" strokeWidth="3" />
      {fingers.map(([x1, y1, x2, y2, x3, y3], i) => (
        <g key={i}>
          <Ln d={`M${x1} ${y1} L${x2} ${y2} L${x3} ${y3}`} sw={3} />
          {[[x1, y1], [x2, y2], [x3, y3]].map(([x, y], j) => (<rect key={j} x={x - 4} y={y - 4} width="8" height="8" className="lcd-solid" />))}
        </g>
      ))}
      <Ln d="M254 52 L320 52" flow />
      <Bx x="320" y="30" w="148" h="64" />
      <T x="394" y="58" a="middle">HU x7</T>
      <T x="394" y="82" a="middle">+ 63 PTS</T>
      <Ln d="M394 94 L394 130" flow i={2} />
      <rect x="320" y="130" width="148" height="52" className="lcd-solid" />
      <T x="394" y="164" a="middle" cls="big inv">70-D</T>
      <T x="320" y="212">MUDRA</T><T x="320" y="234" cls="dim">SPOKEN MEANING</T>
    </S>
  );
}

export function ArcScreen() {
  const dith = useId();
  const cells = [["CCTV", 14, 14], ["DRONE", 248, 14], ["BODYCAM", 14, 130], ["UGV", 248, 130]];
  return (
    <S defs={<Dither id={dith} />}>
      {cells.map(([l, x, y], i) => (
        <g key={l}>
          <Bx x={x} y={y} w="216" h="104" />
          <rect x={x + 6} y={y + 6} width="204" height="92" fill={`url(#${dith})`} opacity="0.35" />
          <rect x={x} y={y + 90} width="216" height="14" className="lcd-solid" />
          <T x={x + 6} y={y + 102} cls="inv" >{l}</T>
        </g>
      ))}
      <Bx x="74" y="42" w="64" h="52" sw={3} />
      <rect x="74" y="28" width="70" height="15" className="lcd-solid" />
      <T x="78" y="41" cls="inv">GUN .70</T>
      <path className="lcd-flow" d="M300 40 V100 M270 70 H330" style={{ "--i": 1 }} />
      <Bx x="68" y="152" w="46" h="46" sw={2} />
      <T x="72" y="148" cls="dim">FACE .70</T>
    </S>
  );
}

export function FinbotScreen() {
  const n = [["SALES", 60, 54], ["KYC", 360, 54], ["RISK", 60, 176], ["SANCTION", 360, 176]];
  return (
    <S>
      {n.map(([l, x, y], i) => (
        <g key={l}>
          <Ln d={`M${x + 50} ${y + 22} L240 125`} flow i={i} />
          <Bx x={x} y={y} w={l === "SANCTION" ? 104 : 80} h="44" fill="var(--lcd)" />
          <T x={x + (l === "SANCTION" ? 52 : 40)} y={y + 29} a="middle">{l}</T>
        </g>
      ))}
      <rect x="190" y="98" width="100" height="54" className="lcd-solid" />
      <T x="240" y="133" a="middle" cls="big inv">MASTER</T>
      <T x="8" y="240" cls="dim">ENQUIRY</T><T x="472" y="240" a="end" cls="dim">PDF LETTER</T>
    </S>
  );
}

export function GazeScreen() {
  return (
    <S>
      <path d="M70 100 Q240 -4 410 100 Q240 204 70 100 Z" className="lcd-line" fill="none" strokeWidth="4" />
      <circle cx="240" cy="100" r="44" className="lcd-line" fill="none" strokeWidth="3" />
      <circle cx="240" cy="100" r="22" className="lcd-solid" />
      <rect x="248" y="90" width="8" height="8" className="lcd-hole" />
      <Ln d="M240 30 V170 M170 100 H310" sw={1} flow />
      {Array.from({ length: 10 }).map((_, i) => (<rect key={i} x={46 + i * 40} y="200" width="30" height="24" className={i === 4 ? "lcd-solid" : "lcd-line"} fill={i === 4 ? undefined : "none"} strokeWidth="2" />))}
      <T x="8" y="244" cls="dim">33 PT CALIBRATION</T><T x="472" y="244" a="end" cls="dim">DWELL TYPE</T>
    </S>
  );
}

export function ResumeScreen() {
  return (
    <S>
      {[[30, "RESUME"], [190, "JOB"]].map(([x, l], k) => (
        <g key={l}>
          <Bx x={x} y="40" w="110" h="140" />
          <T x={x + 8} y="64">{l}</T>
          {[0, 1, 2, 3, 4, 5].map((i) => (<rect key={i} x={x + 8} y={78 + i * 16} width={[90, 70, 84, 56, 76, 40][(i + k * 2) % 6]} height="5" className="lcd-solid" />))}
        </g>
      ))}
      <Ln d="M140 110 H190" flow /><Ln d="M300 110 H350" flow i={2} />
      <rect x="350" y="70" width="110" height="80" className="lcd-solid" />
      <T x="405" y="104" a="middle" cls="inv">COSINE</T>
      <T x="405" y="136" a="middle" cls="big inv">SCORE</T>
      {["HIGH", "MEDIUM", "LOW"].map((l, i) => (<g key={l}><Bx x={30 + i * 150} y="206" w="130" h="30" sw={2} /><T x={95 + i * 150} y="228" a="middle" cls={i ? "dim" : ""}>{l}</T></g>))}
    </S>
  );
}

export function QuantScreen() {
  const pts = [190, 176, 182, 160, 168, 140, 150, 118, 130, 104, 112, 86, 96, 70];
  const d = pts.map((y, i) => `${i ? "H" : "M"}${i * 34 + 20} ${i ? "V" : ""}${y}`.replace("M", "M").replace("H", "H")).join(" ");
  return (
    <S>
      <path d="M20 20 V222 H470" className="lcd-line" fill="none" strokeWidth="2" />
      <path d={pts.map((y, i) => `${i ? "H" : "M"}${i * 34 + 20}${i ? " V" + y : " " + y}`).join(" ")} className="lcd-line" fill="none" strokeWidth="3" />
      <path d="M20 196 L460 74" className="lcd-flow" style={{ "--i": 1 }} />
      <rect x="300" y="40" width="12" height="12" className="lcd-solid" /><T x="318" y="52">LSTM</T>
      <path d="M368 46 H384" className="lcd-flow" /><T x="392" y="52">LINEAR</T>
      {[0, 1, 2, 3, 4, 5].map((i) => (<rect key={i} x={34 + i * 70} y={206 - [10, 18, 8, 24, 14, 28][i]} width="18" height={[10, 18, 8, 24, 14, 28][i]} className="lcd-solid" />))}
      <T x="472" y="244" a="end" cls="dim">60-DAY WINDOW</T>
    </S>
  );
}

export function SentinelScreen() {
  const pings = [[170, 80], [260, 150], [320, 100], [200, 170]];
  return (
    <S>
      <circle cx="240" cy="125" r="100" className="lcd-line" fill="none" strokeWidth="4" />
      <ellipse cx="240" cy="125" rx="44" ry="100" className="lcd-line" fill="none" strokeWidth="2" />
      <ellipse cx="240" cy="125" rx="100" ry="40" className="lcd-line" fill="none" strokeWidth="2" />
      <Ln d="M140 125 H340 M240 25 V225" sw={1} />
      {pings.map(([x, y], i) => (<g key={i}><rect x={x - 5} y={y - 5} width="10" height="10" className="lcd-solid" /><circle cx={x} cy={y} r="14" className="lcd-line" fill="none" strokeWidth="2" style={{ animation: `lcd-blink ${1 + i * 0.3}s steps(2, jump-none) infinite` }} /></g>))}
      <T x="8" y="40">CITIZEN</T><T x="8" y="62" cls="dim">SOS</T>
      <T x="472" y="40" a="end">AUTHORITY</T><T x="472" y="62" a="end" cls="dim">TRIAGE</T>
      <T x="472" y="226" a="end">VOLUNTEER</T><T x="472" y="244" a="end" cls="dim">ROUTING</T>
    </S>
  );
}

export function StarlightScreen() {
  return (
    <S>
      <path d="M380 30 a28 28 0 1 0 22 46 a22 22 0 1 1 -22 -46 Z" className="lcd-solid" />
      {[[60, 30], [120, 54], [300, 36], [440, 120], [30, 100]].map(([x, y], i) => (<rect key={i} x={x} y={y} width="6" height="6" className="lcd-solid" style={{ animation: `lcd-blink ${1.4 + i * 0.4}s steps(2, jump-none) infinite` }} />))}
      <rect x="110" y="84" width="260" height="140" className="lcd-solid" />
      <rect x="226" y="60" width="28" height="24" className="lcd-solid" />
      <Ln d="M240 40 V60" sw={3} />
      {[0, 1, 2, 3].map((c) => [0, 1, 2].map((r) => (<rect key={`${c}${r}`} x={128 + c * 58} y={98 + r * 36} width="26" height="22" className={(c + r) % 3 === 0 ? "lcd-hole" : "lcd-line"} fill={(c + r) % 3 === 0 ? undefined : "none"} strokeWidth="2" style={(c + r) % 3 === 0 ? undefined : { stroke: "var(--lcd)" }} />)))}
      <rect x="222" y="192" width="36" height="32" className="lcd-hole" />
      <path d="M0 224 H480" className="lcd-line" strokeWidth="3" />
      <T x="8" y="244" cls="dim">DIRECT BOOKING</T><T x="472" y="244" a="end" cls="dim">HOURLY STAYS</T>
    </S>
  );
}

export function MathoriaScreen() {
  return (
    <S>
      <path d="M20 125 H460 M60 20 V230" className="lcd-line" fill="none" strokeWidth="2" />
      <path className="lcd-trace" style={{ "--d": "7s" }} d={stepped(2)} transform="translate(0 150)" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (<rect key={i} x={60 + i * 60} y="121" width="2" height="8" className="lcd-solid" />))}
      <T x="68" y="40" cls="big">y = sin x</T>
      <Bx x="318" y="146" w="136" h="76" sw={2} />
      <path d="M330 210 L386 156 L442 210 Z" className="lcd-line" fill="none" strokeWidth="2" />
      <Ln d="M386 156 V210" sw={1} flow />
      <T x="8" y="244" cls="dim">VISUALIZATION LAB</T><T x="472" y="244" a="end" cls="dim">600+ MEMBERS</T>
    </S>
  );
}

export function NagishScreen() {
  return (
    <S>
      <Bx x="196" y="14" w="88" h="170" sw={4} rx="8" />
      <Ln d="M226 24 H254" sw={3} />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (<rect key={i} x={208 + i * 9} y={116 - [10, 24, 14, 34, 20, 40, 12, 26][i] / 2} width="5" height={[10, 24, 14, 34, 20, 40, 12, 26][i]} className="lcd-solid" style={{ animation: `lcd-bar ${1.6 + i * 0.15}s steps(5) infinite` }} />))}
      <Bx x="204" y="146" w="72" h="28" sw={2} />
      <T x="240" y="166" a="middle">TEXT</T>
      <Ln d="M190 70 H100" flow /><Bx x="20" y="46" w="80" h="48" /><T x="60" y="76" a="middle">VOICE</T>
      <Ln d="M290 70 H380" flow i={2} /><rect x="380" y="46" width="80" height="48" className="lcd-solid" /><T x="420" y="76" a="middle" cls="inv">TEXT</T>
      <Ln d="M290 140 H380" flow i={3} /><Bx x="380" y="118" w="80" h="48" /><T x="420" y="148" a="middle">SPEECH</T>
      <T x="8" y="222">SPEECH TO TEXT</T><T x="8" y="244" cls="dim">SMART INDIA HACKATHON 2024</T>
    </S>
  );
}

export function KadalScreen() {
  return (
    <S>
      {[150, 178, 206].map((y, r) => (<path key={y} className="lcd-trace" style={{ "--d": `${6 + r * 2}s` }} d={stepped(r + 1)} transform={`translate(0 ${y - 125}) scale(1 .5)`} />))}
      <g transform="translate(180 70)">
        <path d="M0 40 H120 L100 70 H20 Z" className="lcd-solid" />
        <Ln d="M60 40 V-8 M60 -4 L100 30 H60" sw={3} />
      </g>
      <rect x="40" y="30" width="26" height="26" className="lcd-solid" /><Ln d="M53 30 V10 M45 20 H61" sw={2} />
      {[["SAFE", 20], ["CAUTION", 170], ["DANGER", 330]].map(([l, x], i) => (<g key={l}><rect x={x} y="206" width="130" height="30" className={i === 2 ? "lcd-solid" : "lcd-line"} fill={i === 2 ? undefined : i === 1 ? "none" : "none"} strokeWidth="2" /><T x={x + 65} y="228" a="middle" cls={i === 2 ? "inv" : ""}>{l}</T></g>))}
    </S>
  );
}

export function EcoScreen() {
  return (
    <S>
      <path d="M150 90 H330 L316 226 H164 Z" className="lcd-line" fill="none" strokeWidth="4" />
      <rect x="136" y="70" width="208" height="20" className="lcd-solid" />
      <rect x="226" y="56" width="28" height="14" className="lcd-solid" />
      <Ln d="M240 20 V56" flow />
      {["D", "W", "P", "M"].map((l, i) => (<g key={l}><Ln d={`M${195 + i * 30} 96 V226`} sw={1} /><T x={176 + i * 40} y="244" cls="dim" a="middle">{l}</T></g>))}
      <rect x="168" y={150} width="40" height="74" className="lcd-solid" style={{ animation: "lcd-bar 3s steps(6) infinite" }} />
      <Bx x="20" y="60" w="70" h="46" sw={2} /><T x="55" y="90" a="middle">CAM</T>
      <Bx x="390" y="60" w="70" h="46" sw={2} /><T x="425" y="90" a="middle">ESP32</T>
      <Ln d="M90 83 H136" flow /><Ln d="M344 83 H390" flow i={2} />
    </S>
  );
}

export function RentalScreen() {
  return (
    <S>
      <path d="M30 130 L110 60 L190 130 V210 H30 Z" className="lcd-line" fill="none" strokeWidth="4" />
      <rect x="86" y="164" width="48" height="46" className="lcd-solid" />
      <rect x="50" y="144" width="26" height="22" className="lcd-line" fill="none" strokeWidth="2" />
      {[18, 36, 58, 80, 62, 40, 22, 10].map((h, i) => (<rect key={i} x={240 + i * 28} y={210 - h * 1.7} width="22" height={h * 1.7} className="lcd-solid" style={i === 3 ? { animation: "lcd-bar 2.6s steps(6) infinite" } : undefined} />))}
      <Ln d="M236 210 H470" sw={2} />
      <T x="240" y="40">PRICE DISTRIBUTION</T>
      <T x="30" y="236" cls="dim">13 FEATURES</T><T x="472" y="236" a="end" cls="dim">RANDOM FOREST</T>
    </S>
  );
}

export function NsgScreen() {
  const dith = useId();
  const hubs = [[90, 60], [180, 110], [250, 54], [310, 140], [140, 170], [230, 190]];
  return (
    <S defs={<Dither id={dith} />}>
      <Bx x="14" y="14" w="310" h="196" />
      {[0, 1, 2, 3, 4, 5].map((i) => (<Ln key={i} d={`M${14 + i * 62} 14 V210`} sw={1} />))}
      {[0, 1, 2, 3].map((i) => (<Ln key={i} d={`M14 ${14 + i * 49} H324`} sw={1} />))}
      <path d={hubs.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ")} className="lcd-flow" />
      {hubs.map(([x, y], i) => (<rect key={i} x={x - 5} y={y - 5} width="10" height="10" className="lcd-solid" style={i === 2 ? { animation: "lcd-blink 1s steps(2, jump-none) infinite" } : undefined} />))}
      <Bx x="344" y="14" w="122" h="90" /><rect x="350" y="20" width="110" height="78" fill={`url(#${dith})`} opacity=".5" />
      <path d="M380 82 V46 M365 64 H395" className="lcd-line" strokeWidth="2" />
      <T x="344" y="128">OPT</T><T x="388" y="128" cls="dim">NVG</T><T x="434" y="128" cls="dim">FLIR</T>
      <rect x="344" y="146" width="122" height="64" className="lcd-solid" /><T x="405" y="186" a="middle" cls="inv big">SITREP</T>
      <T x="14" y="236" cls="dim">EDUCATIONAL SIMULATION</T>
    </S>
  );
}

export const screens = {
  eeg: EegScreen, aqua: AquaScreen, movie: MovieScreen,
  neurosense: NeuroScreen, mudra: MudraScreen, arc: ArcScreen, finbot: FinbotScreen, gaze: GazeScreen,
  resume: ResumeScreen, quant: QuantScreen, sentinel: SentinelScreen, starlight: StarlightScreen,
  mathoria: MathoriaScreen, nagish: NagishScreen, kadal: KadalScreen, eco: EcoScreen, rental: RentalScreen, nsg: NsgScreen,
};


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
