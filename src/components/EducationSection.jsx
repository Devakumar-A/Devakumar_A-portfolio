import React, { useEffect, useRef, useState } from "react";
import { isLowPowerDevice } from "../utils/performance";
import "../css/education.css";

function hexToRgb(c) {
  c = c.trim().replace("#", "");
  if (c.length === 3) c = c.replace(/./g, "$&$&");
  const n = parseInt(c, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/**
 * Interactive Particle Canvas for Score / CGPA numbers.
 * Supports desktop mouse-move/click and mobile touch wipe / swipe with scatter physics.
 */
function ParticleCanvas({ value, label }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const [lowPower] = useState(() => isLowPowerDevice());

  useEffect(() => {
    if (lowPower) return;
    const wrap = wrapRef.current;
    const cv = canvasRef.current;
    if (!wrap || !cv) return;

    const ctx = cv.getContext("2d");
    if (!ctx) return;

    let P = [];
    let W = 0;
    let H = 0;
    let dpr = 1;
    let R = 60;
    let R2 = 3600;
    let visible = true;
    let raf = 0;
    let mouse = null;

    let lastX = null;
    let lastY = null;
    let lastT = 0;

    function build() {
      if (!wrap || !cv) return;
      const rect = wrap.getBoundingClientRect();
      W = Math.max(200, Math.round(rect.width));
      H = Math.round(W * 0.46);
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      cv.width = W * dpr;
      cv.height = H * dpr;
      cv.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      R = Math.max(45, W * 0.16);
      R2 = R * R;

      const off = document.createElement("canvas");
      off.width = W;
      off.height = H;
      const o = off.getContext("2d");
      const fam = '"Bricolage Grotesque", system-ui, -apple-system, sans-serif';
      o.font = `800 100px ${fam}`;
      const textMetrics = o.measureText(value);
      const textW = textMetrics.width || 120;
      const size = Math.min(H * 0.88, ((W * 0.90) / textW) * 100);
      o.font = `800 ${size}px ${fam}`;
      o.textAlign = "center";
      o.textBaseline = "middle";
      o.fillStyle = "#ffffff";
      o.fillText(value, W / 2, H * 0.54);
      const data = o.getImageData(0, 0, W, H).data;

      const sec = document.getElementById("education");
      const cs = sec ? getComputedStyle(sec) : null;
      const c1 = cs ? hexToRgb(cs.getPropertyValue("--a1") || "#ff3366") : [255, 51, 102];
      const c2 = cs ? hexToRgb(cs.getPropertyValue("--a2") || "#ff9900") : [255, 153, 0];

      const step = Math.max(3, Math.round(W / 110));
      const ps = step * 0.65;
      P = [];
      for (let y = 0; y < H; y += step) {
        for (let x = 0; x < W; x += step) {
          if (data[(y * W + x) * 4 + 3] < 128) continue;
          const k = x / W;
          const r = Math.round(c1[0] + (c2[0] - c1[0]) * k);
          const g = Math.round(c1[1] + (c2[1] - c1[1]) * k);
          const b = Math.round(c1[2] + (c2[2] - c1[2]) * k);
          P.push({
            tx: x,
            ty: y,
            x: x,
            y: y,
            vx: 0,
            vy: 0,
            col: `rgb(${r},${g},${b})`,
            size: ps,
          });
        }
      }
    }

    function tick() {
      raf = 0;
      if (!visible) return;
      ctx.clearRect(0, 0, W, H);

      let moving = false;
      const mx = mouse ? mouse.x : -9999;
      const my = mouse ? mouse.y : -9999;
      const mvx = mouse ? mouse.vx || 0 : 0;
      const mvy = mouse ? mouse.vy || 0 : 0;

      for (let i = 0; i < P.length; i++) {
        const p = P[i];
        const dx = p.x - mx;
        const dy = p.y - my;
        const d2 = dx * dx + dy * dy;

        if (d2 < R2) {
          const d = Math.max(1, Math.sqrt(d2));
          const force = (1 - d / R) * 14;
          const repX = (dx / d) * force;
          const repY = (dy / d) * force;
          p.vx += repX + mvx * 0.25;
          p.vy += repY + mvy * 0.25;
        }

        const homeX = p.tx - p.x;
        const homeY = p.ty - p.y;
        p.vx += homeX * 0.085;
        p.vy += homeY * 0.085;
        p.vx *= 0.82;
        p.vy *= 0.82;

        p.x += p.vx;
        p.y += p.vy;

        if (Math.abs(p.vx) > 0.04 || Math.abs(p.vy) > 0.04 || Math.abs(homeX) > 0.5 || Math.abs(homeY) > 0.5) {
          moving = true;
        }

        ctx.fillStyle = p.col;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      }

      if (moving || mouse) {
        raf = requestAnimationFrame(tick);
      }
    }

    function kick() {
      if (!raf && visible) raf = requestAnimationFrame(tick);
    }

    function updateTouchVelocity(cx, cy) {
      const now = performance.now();
      let vx = 0;
      let vy = 0;
      if (lastX !== null && lastY !== null && lastT > 0) {
        const dt = Math.max(10, now - lastT);
        vx = ((cx - lastX) / dt) * 16;
        vy = ((cy - lastY) / dt) * 16;
      }
      lastX = cx;
      lastY = cy;
      lastT = now;
      return { vx, vy };
    }

    function onPointerMove(e) {
      const rect = cv.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      const { vx, vy } = updateTouchVelocity(cx, cy);
      mouse = { x: cx, y: cy, vx, vy };
      kick();
    }

    function onPointerDown(e) {
      const rect = cv.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      lastX = cx;
      lastY = cy;
      lastT = performance.now();
      mouse = { x: cx, y: cy, vx: 0, vy: 0 };
      kick();
    }

    function onPointerLeave() {
      mouse = null;
      lastX = null;
      lastY = null;
      kick();
    }

    function onTouchMove(e) {
      if (!e.touches || e.touches.length === 0) return;
      const t = e.touches[0];
      const rect = cv.getBoundingClientRect();
      const cx = t.clientX - rect.left;
      const cy = t.clientY - rect.top;
      const { vx, vy } = updateTouchVelocity(cx, cy);
      mouse = { x: cx, y: cy, vx, vy };
      kick();
    }

    build();
    kick();

    cv.addEventListener("pointerdown", onPointerDown);
    cv.addEventListener("pointermove", onPointerMove);
    cv.addEventListener("pointerup", onPointerLeave);
    cv.addEventListener("pointerleave", onPointerLeave);
    cv.addEventListener("touchmove", onTouchMove, { passive: true });
    cv.addEventListener("touchstart", onPointerDown, { passive: true });
    cv.addEventListener("touchend", onPointerLeave, { passive: true });

    let ro = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => {
        build();
        kick();
      });
      ro.observe(wrap);
    }

    let io = null;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !raf) kick();
        else if (!visible && raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      }, { rootMargin: "150px" });
      io.observe(wrap);
    }

    return () => {
      cv.removeEventListener("pointerdown", onPointerDown);
      cv.removeEventListener("pointermove", onPointerMove);
      cv.removeEventListener("pointerup", onPointerLeave);
      cv.removeEventListener("pointerleave", onPointerLeave);
      cv.removeEventListener("touchmove", onTouchMove);
      cv.removeEventListener("touchstart", onPointerDown);
      cv.removeEventListener("touchend", onPointerLeave);
      if (ro) ro.disconnect();
      if (io) io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [value, lowPower]);

  if (lowPower) {
    return (
      <div className="cgpa cgpa-static-wrap" ref={wrapRef} data-value={value}>
        <span className="sr">{label || value}</span>
        <div className="cgpa-static-val" aria-hidden="true">
          {value}
        </div>
        {label && (
          <p className="cgpa-label" aria-hidden="true">
            {label}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="cgpa" ref={wrapRef} data-value={value}>
      <span className="sr">{label || value}</span>
      <canvas ref={canvasRef} aria-hidden="true" />
      {label && (
        <p className="cgpa-label" aria-hidden="true">
          {label}
        </p>
      )}
    </div>
  );
}

export function EducationSection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const sec = sectionRef.current;
    const track = trackRef.current;
    if (!sec || !track) return;

    let targetProgress = 0;
    let currentProgress = 0;
    let rafId = 0;

    function update() {
      const rect = sec.getBoundingClientRect();
      const maxScrollY = sec.offsetHeight - window.innerHeight;
      if (maxScrollY <= 0) return;

      // Exact 0..1 scroll progression along the runway
      const raw = Math.max(0, Math.min(1, -rect.top / maxScrollY));
      targetProgress = raw;

      const diff = targetProgress - currentProgress;
      const absDiff = Math.abs(diff);

      // Adaptive smoothing:
      // Gentle scroll -> silky lerp ~0.20
      // Fast scroll -> dynamically ramps up to 0.50 so it never lags behind fast flick/scroll gestures
      const factor = Math.min(0.50, 0.20 + absDiff * 0.40);
      currentProgress += diff * factor;

      if (absDiff < 0.0004) {
        currentProgress = targetProgress;
      }

      // Translate track smoothly by distance between Slide 1 and Slide 2
      const slides = track.querySelectorAll(".edu-slide");
      if (slides.length >= 2) {
        const dist = slides[1].offsetLeft - slides[0].offsetLeft;
        const x = -currentProgress * dist;
        track.style.transform = `translate3d(${x.toFixed(2)}px, 0, 0)`;
      }

      // Update bottom progress rail
      const pct = (currentProgress * 100).toFixed(1) + "%";
      sec.style.setProperty("--progress", pct);

      const slideIdx = currentProgress >= 0.5 ? 1 : 0;
      setActiveSlide((prev) => (prev !== slideIdx ? slideIdx : prev));

      if (Math.abs(targetProgress - currentProgress) > 0.0002) {
        rafId = requestAnimationFrame(update);
      } else {
        rafId = 0;
      }
    }

    function onScroll() {
      if (!rafId) {
        rafId = requestAnimationFrame(update);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const titleWord = "Education";

  return (
    <section id="education" ref={sectionRef} aria-labelledby="edu-title">
      <div className="edu-sticky-frame">
        {/* Top Header */}
        <div className="edu-header">
          <h2 className="edu-title" id="edu-title" aria-label={titleWord}>
            {titleWord.split("").map((ch, i) => (
              <span key={i} className="ch" aria-hidden="true" style={{ "--i": i }}>
                {ch}
              </span>
            ))}
          </h2>
          <div className="edu-counter-badge" aria-hidden="true">
            <span className="edu-counter-cur">0{activeSlide + 1}</span>
            <span>/</span>
            <span>02</span>
          </div>
        </div>

        {/* Horizontal Sliding Track */}
        <div className="edu-h-wrapper">
          <div className="edu-h-track" ref={trackRef}>
            {/* 1. DEGREE / B.TECH (FIRST) */}
            <article className={`edu-slide btech ${activeSlide === 0 ? "active" : ""}`} id="edu-btech">
              <div className="edu-main">
                <p className="edu-year">2022 – 2026</p>
                <h3>B.Tech, Computer Science and Engineering</h3>
                <p className="where">Rajiv Gandhi College of Engineering and Technology</p>
              </div>

              <ParticleCanvas value="8.04" label="CGPA, out of 10" />
            </article>

            {/* 2. HSC (SECOND) */}
            <article className={`edu-slide hsc ${activeSlide === 1 ? "active" : ""}`} id="edu-hsc">
              <div className="edu-main">
                <p className="edu-year">2022</p>
                <h3>Higher Secondary Certificate</h3>
                <p className="where">Amalorpavam Higher Secondary School</p>
              </div>

              <div className="edu-score" style={{ "--w": "82.8%" }}>
                <ParticleCanvas value="82.8%" label="Overall Score Percentage" />
                <div className="bar" aria-hidden="true">
                  <i />
                </div>
              </div>
            </article>
          </div>
        </div>

        {/* Bottom Horizontal Progress Rail */}
        <div className="edu-bottom-bar" aria-hidden="true">
          <div className="edu-h-line">
            <i />
            <b />
          </div>
          <span className="edu-scroll-hint">Scroll to explore</span>
        </div>
      </div>
    </section>
  );
}

export default EducationSection;
