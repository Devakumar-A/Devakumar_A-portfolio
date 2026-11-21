import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Brain,
  Code2,
  Layers,
  Cpu,
  Network,
  FlaskConical,
  BarChart3,
  Megaphone,
  PenTool,
  Users,
} from "lucide-react";

// Rolling Domains configuration (exact order specified)
const ROLLING_DOMAINS = [
  { name: "AI Research", icon: Brain },
  { name: "Software Engineering", icon: Code2 },
  { name: "Full-Stack Development", icon: Layers },
  { name: "Machine Learning", icon: Cpu },
  { name: "Deep Learning", icon: Network },
  { name: "Data Science", icon: FlaskConical },
  { name: "Data Analytics", icon: BarChart3 },
  { name: "Digital Marketing", icon: Megaphone, detail: "Meta Ads · Google Ads" },
  { name: "UI/UX Design", icon: PenTool },
  { name: "Leadership", icon: Users },
];

const getRowDistanceStyles = (distance) => {
  switch (distance) {
    case 0:
      return { opacity: 1, scale: 1 };
    case 1:
      return { opacity: 0.45, scale: 0.94 };
    case 2:
      return { opacity: 0, scale: 0.88 };
    default:
      return { opacity: 0, scale: 0.84 };
  }
};

/**
 * Lightweight canvas particle waves along bottom and right edges
 */
function AboutParticleWaves({ shouldReduceMotion }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId = null;
    let isVisible = false;
    let isScrolling = false;
    let scrollTimeout = null;
    let width = 0;
    let height = 0;

    const isMobile = window.innerWidth <= 768;
    const particleCount = isMobile ? 16 : 32;

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width;
      canvas.height = height;
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });

    // Smooth-scroll acceleration: pause canvas drawing during active scroll bursts
    const onScroll = () => {
      isScrolling = true;
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 80);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Initialize particles
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * (width || 1200),
      y: (height || 800) * 0.5 + Math.random() * ((height || 800) * 0.5),
      radius: Math.random() * 1.5 + 0.5,
      speedX: (Math.random() - 0.2) * 0.35,
      speedY: (Math.random() - 0.5) * 0.25,
      color: Math.random() > 0.45 ? "rgba(34, 211, 238, " : "rgba(168, 85, 247, ",
      alpha: Math.random() * 0.4 + 0.1,
      phase: Math.random() * Math.PI * 2,
    }));

    let step = 0;
    let lastTime = 0;

    const render = (time) => {
      if (!isVisible) return;

      // Throttle rendering to ~30fps for background atmospheric particles/waves
      if (time - lastTime >= 32 && !isScrolling) {
        lastTime = time;
        ctx.clearRect(0, 0, width, height);

        // Draw subtle wave guide lines along the bottom
        ctx.lineWidth = 1;
        for (let j = 0; j < 3; j++) {
          ctx.beginPath();
          const waveY = height * 0.78 + j * 32;
          ctx.strokeStyle =
            j === 0
              ? "rgba(34, 211, 238, 0.06)"
              : j === 1
                ? "rgba(168, 85, 247, 0.05)"
                : "rgba(34, 211, 238, 0.03)";

          for (let x = 0; x <= width; x += 28) {
            const y =
              waveY +
              Math.sin(x * 0.003 + step * 0.012 + j * 1.2) * 28 +
              Math.cos(x * 0.006 - step * 0.008) * 14;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }

        // Draw and drift particles
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.phase += 0.015;
          p.x += p.speedX;
          p.y += p.speedY + Math.sin(p.phase) * 0.15;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < height * 0.4) p.y = height;
          if (p.y > height) p.y = height * 0.4;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${p.alpha * 0.75})`;
          ctx.fill();
        }

        step++;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Pause canvas drawing when off screen completely
    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;
        if (isVisible && !wasVisible) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = requestAnimationFrame(render);
        } else if (!isVisible && wasVisible) {
          cancelAnimationFrame(animationFrameId);
        }
      },
      { threshold: 0.02 }
    );
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", onScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
      observer.disconnect();
    };
  }, [shouldReduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="about-particle-canvas"
      aria-hidden="true"
    />
  );
}

/**
 * Dual-depth orbital rings that seamlessly wrap behind and in front of the portrait,
 * featuring actively rotating photon satellites, streaming dashed energy streams, and 3D gyroscopic motion.
 */
function OrbitalRings({ shouldReduceMotion }) {
  return (
    <>
      {/* ── BACK RINGS (z-index: 1 - Behind portrait frame) ── */}
      <div className="about-rings-layer about-rings-back" aria-hidden="true">
        {/* Ring 1 (Cyan - tilted -18deg) */}
        <div
          className={`about-ring-wrapper ring-cyan ${shouldReduceMotion ? "static-ring" : "animated-ring-1"
            }`}
        >
          <svg
            className="about-ring-svg"
            viewBox="0 0 600 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="cyanRingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.3" />
              </linearGradient>
            </defs>

            {/* Back track */}
            <path
              d="M 30,160 A 270 95 0 0 1 570,160"
              stroke="url(#cyanRingGrad)"
              strokeWidth="1.5"
              className={shouldReduceMotion ? "" : "orbit-stream-cyan"}
              opacity="0.65"
            />

            {/* Orbiting Photon Satellite (Cyan - Traveling behind) */}
            {!shouldReduceMotion && (
              <g className="orbit-satellite">
                {/* Soft outer halo */}
                <circle r="8" fill="#22d3ee" opacity="0.25">
                  <animateMotion
                    path="M 30,160 A 270 95 0 0 1 570,160"
                    dur="5s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.25;0.25;0;0"
                    keyTimes="0;0.49;0.5;1"
                    dur="5s"
                    repeatCount="indefinite"
                  />
                </circle>
                {/* Radiant core */}
                <circle r="4.5" fill="#22d3ee" opacity="0.9">
                  <animateMotion
                    path="M 30,160 A 270 95 0 0 1 570,160"
                    dur="5s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.9;0.9;0;0"
                    keyTimes="0;0.49;0.5;1"
                    dur="5s"
                    repeatCount="indefinite"
                  />
                </circle>
                {/* Specular center */}
                <circle r="2" fill="#ffffff">
                  <animateMotion
                    path="M 30,160 A 270 95 0 0 1 570,160"
                    dur="5s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="1;1;0;0"
                    keyTimes="0;0.49;0.5;1"
                    dur="5s"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            )}
          </svg>
        </div>

        {/* Ring 2 (Violet - tilted +22deg) */}
        <div
          className={`about-ring-wrapper ring-violet ${shouldReduceMotion ? "static-ring" : "animated-ring-2"
            }`}
        >
          <svg
            className="about-ring-svg"
            viewBox="0 0 620 330"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="violetRingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#c084fc" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.3" />
              </linearGradient>
            </defs>

            {/* Back track */}
            <path
              d="M 25,165 A 285 100 0 0 1 595,165"
              stroke="url(#violetRingGrad)"
              strokeWidth="1.5"
              className={shouldReduceMotion ? "" : "orbit-stream-violet"}
              opacity="0.55"
            />

            {/* Orbiting Photon Satellite (Violet - Traveling behind) */}
            {!shouldReduceMotion && (
              <g className="orbit-satellite">
                {/* Soft outer halo */}
                <circle r="8" fill="#c084fc" opacity="0.25">
                  <animateMotion
                    path="M 25,165 A 285 100 0 0 1 595,165"
                    dur="6.4s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.25;0.25;0;0"
                    keyTimes="0;0.49;0.5;1"
                    dur="6.4s"
                    repeatCount="indefinite"
                  />
                </circle>
                {/* Radiant core */}
                <circle r="4.5" fill="#c084fc" opacity="0.9">
                  <animateMotion
                    path="M 25,165 A 285 100 0 0 1 595,165"
                    dur="6.4s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.9;0.9;0;0"
                    keyTimes="0;0.49;0.5;1"
                    dur="6.4s"
                    repeatCount="indefinite"
                  />
                </circle>
                {/* Specular center */}
                <circle r="2" fill="#ffffff">
                  <animateMotion
                    path="M 25,165 A 285 100 0 0 1 595,165"
                    dur="6.4s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="1;1;0;0"
                    keyTimes="0;0.49;0.5;1"
                    dur="6.4s"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            )}
          </svg>
        </div>
      </div>

      {/* ── FRONT RINGS (z-index: 4 - In front of portrait frame) ── */}
      <div className="about-rings-layer about-rings-front" aria-hidden="true">
        {/* Ring 1 Front half (Cyan) */}
        <div
          className={`about-ring-wrapper ring-cyan ${shouldReduceMotion ? "static-ring" : "animated-ring-1"
            }`}
        >
          <svg
            className="about-ring-svg"
            viewBox="0 0 600 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="cyanRingFrontGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#22d3ee" stopOpacity="1" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.3" />
              </linearGradient>
            </defs>

            {/* Front track */}
            <path
              d="M 570,160 A 270 95 0 0 1 30,160"
              stroke="url(#cyanRingFrontGrad)"
              strokeWidth="1.5"
              className={shouldReduceMotion ? "" : "orbit-stream-cyan"}
              opacity="0.8"
            />

            {/* Orbiting Photon Satellite (Cyan - Traveling in front) */}
            {!shouldReduceMotion && (
              <g className="orbit-satellite">
                {/* Soft outer halo */}
                <circle r="9" fill="#22d3ee" opacity="0.3">
                  <animateMotion
                    path="M 570,160 A 270 95 0 0 1 30,160"
                    dur="5s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0;0;0.3;0.3"
                    keyTimes="0;0.49;0.5;1"
                    dur="5s"
                    repeatCount="indefinite"
                  />
                </circle>
                {/* Radiant core */}
                <circle r="5" fill="#22d3ee" opacity="0.95">
                  <animateMotion
                    path="M 570,160 A 270 95 0 0 1 30,160"
                    dur="5s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0;0;0.95;0.95"
                    keyTimes="0;0.49;0.5;1"
                    dur="5s"
                    repeatCount="indefinite"
                  />
                </circle>
                {/* Specular center */}
                <circle r="2.5" fill="#ffffff">
                  <animateMotion
                    path="M 570,160 A 270 95 0 0 1 30,160"
                    dur="5s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0;0;1;1"
                    keyTimes="0;0.49;0.5;1"
                    dur="5s"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            )}
          </svg>
        </div>

        {/* Ring 2 Front half (Violet) */}
        <div
          className={`about-ring-wrapper ring-violet ${shouldReduceMotion ? "static-ring" : "animated-ring-2"
            }`}
        >
          <svg
            className="about-ring-svg"
            viewBox="0 0 620 330"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="violetRingFrontGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#c084fc" stopOpacity="1" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
              </linearGradient>
            </defs>

            {/* Front track */}
            <path
              d="M 595,165 A 285 100 0 0 1 25,165"
              stroke="url(#violetRingFrontGrad)"
              strokeWidth="1.5"
              className={shouldReduceMotion ? "" : "orbit-stream-violet"}
              opacity="0.75"
            />

            {/* Orbiting Photon Satellite (Violet - Traveling in front) */}
            {!shouldReduceMotion && (
              <g className="orbit-satellite">
                {/* Soft outer halo */}
                <circle r="9" fill="#c084fc" opacity="0.3">
                  <animateMotion
                    path="M 595,165 A 285 100 0 0 1 25,165"
                    dur="6.4s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0;0;0.3;0.3"
                    keyTimes="0;0.49;0.5;1"
                    dur="6.4s"
                    repeatCount="indefinite"
                  />
                </circle>
                {/* Radiant core */}
                <circle r="5" fill="#c084fc" opacity="0.95">
                  <animateMotion
                    path="M 595,165 A 285 100 0 0 1 25,165"
                    dur="6.4s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0;0;0.95;0.95"
                    keyTimes="0;0.49;0.5;1"
                    dur="6.4s"
                    repeatCount="indefinite"
                  />
                </circle>
                {/* Specular center */}
                <circle r="2.5" fill="#ffffff">
                  <animateMotion
                    path="M 595,165 A 285 100 0 0 1 25,165"
                    dur="6.4s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0;0;1;1"
                    keyTimes="0;0.49;0.5;1"
                    dur="6.4s"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            )}
          </svg>
        </div>
      </div>
    </>
  );
}

export function AboutSection() {
  const shouldReduceMotion = useReducedMotion();

  const base = import.meta.env.BASE_URL;
  const portraitSrc = `${base}assets/images/profile/Profile.png`;

  // Vertical Rolling Word List state (2200ms per row)
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isSectionVisible, setIsSectionVisible] = useState(true);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth <= 768;
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Track tab visibility (pause when tab hidden)
  useEffect(() => {
    const handleVisibility = () => setIsTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  // Track section visibility via IntersectionObserver (pause when off-screen)
  useEffect(() => {
    const section = document.getElementById("about");
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Advance activeIndex every 2200ms
  useEffect(() => {
    if (
      shouldReduceMotion ||
      isHovered ||
      isFocused ||
      !isSectionVisible ||
      !isTabVisible
    ) {
      return;
    }
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % ROLLING_DOMAINS.length);
    }, 2200);
    return () => clearInterval(timer);
  }, [shouldReduceMotion, isHovered, isFocused, isSectionVisible, isTabVisible]);

  const rowHeight = isMobile ? 36 : 42;
  const offsets = [-2, -1, 0, 1, 2];

  // Words for staggered heading animation
  const headingWords = [
    { text: "Curious", gradient: false },
    { text: "by", gradient: false },
    { text: "nature.", gradient: false },
    { text: "Building", gradient: false, breakBefore: true },
    { text: "with", gradient: true },
    { text: "purpose.", gradient: true },
  ];

  return (
    <section
      id="about"
      className="about-cinematic-section"
      aria-labelledby="about-heading-title"
    >
      {/* Background canvas particle waves */}
      <AboutParticleWaves shouldReduceMotion={shouldReduceMotion} />

      {/* Ambient background glows */}
      <div className="about-ambient-glow glow-top-left" aria-hidden="true" />
      <div className="about-ambient-glow glow-bottom-right" aria-hidden="true" />

      <div className="about-cinematic-container">
        <div className="about-layout-grid">
          {/* ==========================================================
              LEFT COLUMN: PORTRAIT COMPOSITION (~42%)
          ========================================================== */}
          <motion.div
            className="about-portrait-column"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="about-portrait-stage">
              {/* Dual-depth orbital rings */}
              <OrbitalRings shouldReduceMotion={shouldReduceMotion} />

              {/* Translucent glass backing cards */}
              <div
                className="about-glass-backdrop backdrop-violet"
                aria-hidden="true"
              />
              <div
                className="about-glass-backdrop backdrop-cyan"
                aria-hidden="true"
              />

              {/* Main portrait frame with gradient border & glow */}
              <div className="about-frame-wrapper">
                <div className="about-frame-inner">
                  <img
                    src={portraitSrc}
                    alt="Portrait of Devakumar A."
                    className="about-portrait-img"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Identity card overlapping lower-right (Compositor GPU animated) */}
              <div className="about-identity-card">
                <div className="identity-card-badge" aria-hidden="true">
                  <Code2 size={16} className="identity-badge-icon" />
                </div>
                <div className="identity-card-meta">
                  <span className="identity-name">Devakumar A.</span>
                  <span className="identity-role">Developer · Researcher</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ==========================================================
              RIGHT COLUMN: EDITORIAL CONTENT (~58%)
          ========================================================== */}
          <div className="about-content-column">
            {/* 1. Eyebrow */}
            <motion.div
              className="about-eyebrow-wrapper"
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="about-eyebrow-line" aria-hidden="true" />
              <span className="about-eyebrow-text">A LITTLE ABOUT ME</span>
            </motion.div>

            {/* 2. Heading with staggered word reveal */}
            <h2 id="about-heading-title" className="about-heading-title">
              <span className="about-heading-line line-1">
                {headingWords.slice(0, 3).map((w, i) => (
                  <motion.span
                    key={i}
                    className="about-heading-word"
                    initial={
                      shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }
                    }
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      duration: 0.55,
                      delay: shouldReduceMotion ? 0 : i * 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {w.text}&nbsp;
                  </motion.span>
                ))}
              </span>
              <span className="about-heading-line line-2">
                {headingWords.slice(3).map((w, i) => (
                  <motion.span
                    key={i + 3}
                    className={`about-heading-word ${w.gradient ? "heading-gradient" : ""
                      }`}
                    initial={
                      shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }
                    }
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      duration: 0.55,
                      delay: shouldReduceMotion ? 0 : (i + 3) * 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {w.text}&nbsp;
                  </motion.span>
                ))}
              </span>
            </h2>

            {/* 3. Paragraphs */}
            <motion.div
              className="about-paragraphs-block"
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.65,
                delay: shouldReduceMotion ? 0 : 0.36,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <p className="about-paragraph">
                I'm a computer science developer with a strong interest in AI
                research, turning complex ideas into meaningful technology.
              </p>
              <p className="about-paragraph">
                I enjoy exploring intelligent systems, engineering software
                products and researching practical solutions.
              </p>
            </motion.div>

            {/* Visually hidden list for screen readers (WCAG AA Accessibility) */}
            <div className="sr-only">
              <p>I work across</p>
              <ul>
                {ROLLING_DOMAINS.map((item) => (
                  <li key={item.name}>
                    {item.name} {item.detail ? `(${item.detail})` : ""}
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. Vertical Rolling Word List */}
            {shouldReduceMotion ? (
              <div className="about-rolling-static-list">
                <span className="about-rolling-static">I work across</span>
                <ul className="about-rolling-reduced-items">
                  {ROLLING_DOMAINS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.name} className="about-rolling-reduced-item">
                        <span className="rolling-word-name">{item.name}</span>
                        {item.detail && (
                          <span className="rolling-word-detail">{item.detail}</span>
                        )}
                        <span className="rolling-word-icon" aria-hidden="true">
                          <Icon size={18} />
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : (
              <div
                className="about-rolling-wrapper"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                tabIndex={0}
                aria-hidden="true"
              >
                <span className="about-rolling-static">I work across</span>
                <div className="about-rolling-wheel">
                  {offsets.map((o) => {
                    const itemIndex =
                      ((activeIndex + o) % ROLLING_DOMAINS.length +
                        ROLLING_DOMAINS.length) %
                      ROLLING_DOMAINS.length;
                    const item = ROLLING_DOMAINS[itemIndex];
                    const IconComponent = item.icon;
                    const distance = Math.abs(o);
                    const { opacity, scale } = getRowDistanceStyles(distance);

                    return (
                      <motion.div
                        key={itemIndex}
                        className={`rolling-word-row ${distance === 0 ? "is-active" : ""
                          }`}
                        animate={{
                          y: o * rowHeight,
                          opacity,
                          scale,
                        }}
                        transition={{
                          duration: 0.6,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <span className="rolling-word-name">{item.name}</span>
                        {distance === 0 && item.detail && (
                          <span className="rolling-word-detail">{item.detail}</span>
                        )}
                        <span className="rolling-word-icon" aria-hidden="true">
                          <IconComponent size={18} />
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ==========================================================
            SIGNATURE (Bottom-Left of the section)
        ========================================================== */}
        <motion.div
          className="about-signature-block"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            duration: 0.65,
            delay: shouldReduceMotion ? 0 : 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div className="signature-dot-wrapper" aria-hidden="true">
            <span className="signature-dot-outer" />
            <span className="signature-dot-inner" />
          </div>
          <span className="signature-connector-line" aria-hidden="true" />
          <span className="signature-text">
            THINK&nbsp;&nbsp;•&nbsp;&nbsp;BUILD&nbsp;&nbsp;•&nbsp;&nbsp;RESEARCH&nbsp;&nbsp;•&nbsp;&nbsp;LEAD
          </span>
        </motion.div>
      </div>
    </section>
  );
}

export default AboutSection;
