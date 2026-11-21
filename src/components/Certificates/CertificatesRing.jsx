import { useEffect, useRef, useState, useCallback } from "react";
import "./CertificatesRing.css";

const CERTIFICATES_DATA = [
  { title: "Deep Learning", issuer: "IIT Ropar", type: "ai", category: "AI and ML", badge: "93%" },
  { title: "Python for Data Science", issuer: "NPTEL", type: "data", category: "Data", badge: "81%" },
  { title: "OCI 2025 Generative AI Professional", issuer: "Oracle", type: "ai", category: "AI and ML" },
  { title: "OCI 2025 AI Foundations Associate", issuer: "Oracle", type: "ai", category: "AI and ML" },
  { title: "OCI 2025 Data Science Professional", issuer: "Oracle", type: "data", category: "Data" },
  { title: "Google Data Analytics", issuer: "Coursera", type: "data", category: "Data" },
  { title: "SQL (PostgreSQL)", issuer: "IBM", type: "data", category: "Data" },
  { title: "Introduction to Data Science", issuer: "Infosys Springboard", type: "data", category: "Data" },
  { title: "Data Analytics", issuer: "Novitech R&D", type: "data", category: "Data" },
  { title: "Excel for Beginners", issuer: "Great Learning", type: "data", category: "Data" },
  { title: "C++ Programming", issuer: "IIT Bombay", type: "web", category: "Software and web" },
  { title: "Career Essentials in Software Development", issuer: "Microsoft", type: "web", category: "Software and web" },
  { title: "Python Basics", issuer: "Infosys Springboard", type: "web", category: "Software and web" },
  { title: "Drupal", issuer: "IIT Bombay", type: "web", category: "Software and web" },
  { title: "Intro to Front-End Development", issuer: "Simplilearn", type: "web", category: "Software and web" },
  { title: "Website UI/UX Designing Using ChatGPT", issuer: "Simplilearn", type: "web", category: "Software and web" },
  { title: "Ethical Hacking: Cloud Computing Concepts", issuer: "Infosys Springboard", type: "sec", category: "Security" },
];

const GLOW_COLORS = {
  ai: "#3D5BFF",
  data: "#19D3BC",
  web: "#FF6A55",
  sec: "#7C8BE0",
};

export default function CertificatesRing({ id = "certifications" }) {
  const wrapRef = useRef(null);
  const skyRef = useRef(null);
  const glowRef = useRef(null);
  const floorRef = useRef(null);
  const stageRef = useRef(null);
  const ringRef = useRef(null);
  const cardRefs = useRef([]);
  const ticksRef = useRef([]);
  const animFrameRef = useRef(null);
  const liveRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  // Mutable animation state
  const state = useRef({
    N: CERTIFICATES_DATA.length,
    step: 360 / CERTIFICATES_DATA.length,
    R: 0,
    cw: 0,
    tilt: -6,
    rot: 210,
    prev: 210,
    target: 0,
    vel: 0,
    dragging: false,
    lastX: 0,
    moved: 0,
    lastIdx: -1,
    py: 0,
    ptx: 0,
    dirty: true,
    sway: 0,
    reduce: false,
  });

  const snap = useCallback((v) => {
    const s = state.current.step;
    return Math.round(v / s) * s;
  }, []);

  const goBy = useCallback((n) => {
    state.current.target = snap(state.current.target) + n * state.current.step;
    state.current.dirty = true;
  }, [snap]);

  // Starfield setup
  const starsRef = useRef([]);
  const skyDimensions = useRef({ width: 0, height: 0, dpr: 1 });

  useEffect(() => {
    // Generate 160 stars
    const stars = [];
    for (let s = 0; s < 160; s++) {
      stars.push({
        x: Math.random(),
        y: Math.random(),
        z: 0.2 + Math.random() * 0.8,
        p: Math.random() * 6.28,
      });
    }
    starsRef.current = stars;
  }, []);

  const sizeSky = useCallback(() => {
    const sky = skyRef.current;
    const wrap = wrapRef.current;
    if (!sky || !wrap) return;
    const r = wrap.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    skyDimensions.current = { width: r.width, height: r.height, dpr };
    sky.width = r.width * dpr;
    sky.height = r.height * dpr;
    const sx = sky.getContext("2d");
    sx?.setTransform(dpr, 0, 0, dpr, 0, 0);
  }, []);

  const layout = useCallback(() => {
    const s = state.current;
    if (!cardRefs.current[0]) return;
    s.cw = cardRefs.current[0].offsetWidth;
    s.R = (s.cw / 2) / Math.tan(Math.PI / s.N) * 1.06;
    sizeSky();
    s.dirty = true;
  }, [sizeSky]);

  useEffect(() => {
    const s = state.current;
    s.reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    s.rot = s.reduce ? 0 : 210;
    s.prev = s.rot;
    s.target = 0;

    layout();
    window.addEventListener("resize", layout);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(layout);
    }

    const render = () => {
      if (!ringRef.current) return;
      ringRef.current.style.transform = `rotateX(${s.tilt + s.py * -3}deg) translateZ(${-s.R}px) rotateZ(${s.sway.toFixed(2)}deg) rotateY(${s.rot}deg)`;
      const idx = (((Math.round(-s.rot / s.step) % s.N) + s.N) % s.N);

      for (let i = 0; i < s.N; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        const a = (((i * s.step + s.rot + 540) % 360) + 360) % 360 - 180;
        const k = Math.min(Math.abs(a) / 95, 1);
        const lift = Math.max(0, 1 - Math.abs(a) / s.step) * s.cw * 0.22;
        el.style.transform = `rotateY(${i * s.step}deg) translateZ(${(s.R + lift).toFixed(1)}px)`;
        el.style.setProperty("--d", (k * 0.7).toFixed(3));
        el.style.setProperty("--fx", `${(50 + a * 2.2 + s.ptx * 18).toFixed(1)}%`);
        el.style.setProperty("--fo", (0.65 - k * 0.5).toFixed(2));
      }

      if (idx !== s.lastIdx) {
        if (s.lastIdx >= 0) {
          cardRefs.current[s.lastIdx]?.classList.remove("is-active");
          ticksRef.current[s.lastIdx]?.classList.remove("is-active");
          if (!s.reduce && navigator.vibrate) {
            try { navigator.vibrate(6); } catch (_) {}
          }
        }
        s.lastIdx = idx;
        cardRefs.current[idx]?.classList.add("is-active");
        ticksRef.current[idx]?.classList.add("is-active");
        setCurrentIndex(idx);

        const activeCat = CERTIFICATES_DATA[idx].type;
        const activeColor = GLOW_COLORS[activeCat] || "#3D5BFF";
        if (wrapRef.current) {
          wrapRef.current.style.setProperty("--cr-g", activeColor);
        }

        if (liveRef.current) {
          liveRef.current.textContent = `${CERTIFICATES_DATA[idx].title}, ${CERTIFICATES_DATA[idx].issuer}`;
        }
      }
    };

    const drawStars = (t) => {
      const sky = skyRef.current;
      if (!sky) return;
      const sx = sky.getContext("2d");
      if (!sx) return;
      const { width: SW, height: SH } = skyDimensions.current;
      if (SW === 0 || SH === 0) return;

      sx.clearRect(0, 0, SW, SH);
      const dv = s.rot - s.prev;
      s.prev = s.rot;

      const stars = starsRef.current;
      for (let i = 0; i < stars.length; i++) {
        const o = stars[i];
        const x = (((o.x * SW + s.rot * o.z * 3.4 + (s.reduce ? 0 : t * 0.006 * o.z)) % SW) + SW) % SW;
        const y = o.y * SH;
        const a = (0.3 + 0.7 * o.z) * (0.65 + 0.35 * Math.sin(t * 0.002 + o.p));
        const len = Math.min(110, Math.abs(dv) * o.z * 9);

        sx.strokeStyle = `rgba(255, 255, 255, ${a.toFixed(2)})`;
        sx.lineWidth = o.z * 1.7;
        sx.lineCap = "round";
        sx.beginPath();
        sx.moveTo(x - (dv > 0 ? len : -len), y);
        sx.lineTo(x + 0.01, y);
        sx.stroke();
      }
    };

    const frame = (t) => {
      if (!s.dragging) {
        const diff = s.target - s.rot;
        if (Math.abs(diff) > 0.02) {
          s.rot += diff * (s.reduce ? 1 : 0.085);
          s.dirty = true;
        } else if (s.rot !== s.target) {
          s.rot = s.target;
          s.dirty = true;
        }
      }

      const sw = s.reduce ? 0 : Math.max(-5, Math.min(5, (s.target - s.rot) * 0.09 + (s.dragging ? s.vel * 0.5 : 0)));
      if (Math.abs(sw - s.sway) > 0.01) {
        s.sway += (sw - s.sway) * 0.2;
        s.dirty = true;
      }

      if (s.dirty) render();
      if (s.dirty || !s.reduce) {
        drawStars(t || 0);
      }
      s.dirty = false;
      animFrameRef.current = requestAnimationFrame(frame);
    };

    animFrameRef.current = requestAnimationFrame(frame);

    return () => {
      window.removeEventListener("resize", layout);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [layout]);

  // Pointer interactions
  const handlePointerDown = (e) => {
    const s = state.current;
    s.dragging = true;
    s.moved = 0;
    s.vel = 0;
    s.lastX = e.clientX;
    stageRef.current?.classList.add("is-dragging");
    try { stageRef.current?.setPointerCapture?.(e.pointerId); } catch (_) {}
  };

  const handlePointerMove = (e) => {
    const s = state.current;
    const stage = stageRef.current;
    if (!stage) return;
    if (e.pointerType === "mouse") {
      const r = stage.getBoundingClientRect();
      s.py = ((e.clientY - r.top) / r.height - 0.5) * 2;
      s.ptx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      s.dirty = true;
    }
    if (!s.dragging) return;
    const dx = e.clientX - s.lastX;
    s.lastX = e.clientX;
    s.moved += Math.abs(dx);
    const d = dx * (57.3 / s.R) * 1.25;
    s.rot += d;
    s.vel = s.vel * 0.6 + d * 0.4;
    s.target = s.rot;
    s.dirty = true;
  };

  const handlePointerUp = (e) => {
    const s = state.current;
    if (!s.dragging) return;
    s.dragging = false;
    stageRef.current?.classList.remove("is-dragging");

    if (s.moved < 6 && e?.target) {
      const card = e.target.closest?.(".cr-card");
      if (card) {
        const i = Number(card.dataset.index);
        const a = (((i * s.step + s.rot + 540) % 360) + 360) % 360 - 180;
        s.target = snap(s.rot - a);
        s.dirty = true;
        return;
      }
    }
    s.target = snap(s.rot + s.vel * 9);
    s.dirty = true;
  };

  const handlePointerLeave = () => {
    const s = state.current;
    s.py = 0;
    s.ptx = 0;
    s.dirty = true;
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      goBy(-1);
      e.preventDefault();
    } else if (e.key === "ArrowLeft") {
      goBy(1);
      e.preventDefault();
    }
  };

  const currentCert = CERTIFICATES_DATA[currentIndex];
  const numDisplay = (currentIndex + 1) < 10 ? `0${currentIndex + 1}` : `${currentIndex + 1}`;

  return (
    <section
      ref={wrapRef}
      id={id}
      className="cr-section"
      aria-label="Certifications & Technical Credentials"
    >
      <canvas ref={skyRef} id="cr-sky" aria-hidden="true" />
      <div ref={glowRef} className="cr-glow" aria-hidden="true" />

      <header className="cr-header">
        <h2 className="cr-title">Certifications</h2>
        <p className="cr-subtitle">Seventeen credentials. Drag to orbit.</p>
      </header>

      <div
        ref={stageRef}
        className="cr-stage"
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label="Certifications cylinder orbit, use arrow keys or drag"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => handlePointerUp(null)}
        onPointerLeave={handlePointerLeave}
        onKeyDown={handleKeyDown}
      >
        <div ref={floorRef} className="cr-floor" aria-hidden="true" />
        <div ref={ringRef} className="cr-ring">
          {CERTIFICATES_DATA.map((cert, i) => (
            <div
              key={cert.title + i}
              ref={(el) => (cardRefs.current[i] = el)}
              className={`cr-card ${cert.type}`}
              data-index={i}
            >
              <div className="cr-orb" aria-hidden="true">
                <i />
              </div>
              <span className="cr-card-iss">{cert.issuer}</span>
              {cert.badge && <span className="cr-card-bd">{cert.badge}</span>}
              <h3 className="cr-card-title">{cert.title}</h3>
              <small className="cr-card-cat">{cert.category}</small>
            </div>
          ))}
        </div>
      </div>

      <div className="cr-ctrl">
        <div className="cr-ticks" aria-hidden="true">
          {CERTIFICATES_DATA.map((_, i) => (
            <span
              key={i}
              ref={(el) => (ticksRef.current[i] = el)}
            />
          ))}
        </div>

        <div className="cr-row">
          <button
            onClick={() => goBy(1)}
            aria-label="Previous certificate"
            type="button"
          >
            <svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7" /></svg>
          </button>

          <div className="cr-mid">
            <div className="cr-pos">
              <b>{numDisplay}</b> / {CERTIFICATES_DATA.length}
            </div>
            <div className="cr-cat-name">
              {currentCert?.category}
            </div>
          </div>

          <button
            onClick={() => goBy(-1)}
            aria-label="Next certificate"
            type="button"
          >
            <svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>

      <div ref={liveRef} className="cr-sr" aria-live="polite" />
    </section>
  );
}
