import { useState, useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

// Configuration for verified achievements, roles, and narrative
const HERO_CONFIG = {
  achievements: {
    internships: 3,
    publications: 1,
    certifications: 17,
  },
  roles: [
    "AI/ML Developer",
    "Full-Stack Developer",
    "Software Engineer",
    "Research Enthusiast",
  ],
  description:
    "I build AI-powered applications, intelligent systems and scalable software solutions that solve real-world problems.",
};

export function HeroSection({ scrollToSection }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 900px)").matches;
  });
  const videoRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Resolve base URL correctly for dev and production
  const base = import.meta.env.BASE_URL;
  const posterUrl = `${base}assets/hero/hero-poster.webp`;
  const desktopVideoUrl = `${base}assets/hero/hero.mp4`;
  const mobileVideoUrl = `${base}assets/hero/hero1.mp4`;

  // Detect mobile/tablet (<= 900px)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 900px)");
    const update = (e) => setIsMobile(e.matches);

    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Video playback control (active on both desktop and mobile)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (shouldReduceMotion) {
      video.pause();
    } else {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Handled gracefully if browser policies restrict immediate autoplay
        });
      }
    }
  }, [isMobile, shouldReduceMotion]);

  // High-End Typing Animation for Role Rotation
  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayText(HERO_CONFIG.roles[0]);
      return;
    }

    let timer;
    const currentRole = HERO_CONFIG.roles[roleIndex];

    if (!isDeleting) {
      // Smooth forward typing
      if (displayText.length < currentRole.length) {
        timer = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        }, 75);
      } else {
        // Full role displayed -> pause comfortably before deleting
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    } else {
      // Smooth backspacing deletion
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 35);
      } else {
        // Finished deleting -> brief pause before typing next role
        timer = setTimeout(() => {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % HERO_CONFIG.roles.length);
        }, 300);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex, shouldReduceMotion]);

  return (
    <section id="home" className="hero-section" aria-label="Hero Introduction">
      {/* ── CINEMATIC VIDEO BACKGROUND (Desktop: hero.mp4, Mobile: hero1.mp4) ── */}
      <div className="hero-media-wrapper" aria-hidden="true">
        <video
          ref={videoRef}
          key={isMobile ? "mobile-hero-video" : "desktop-hero-video"}
          className={`hero-video ${isMobile ? "hero-video-mobile" : "hero-video-desktop"}`}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={posterUrl}
        >
          <source src={isMobile ? mobileVideoUrl : desktopVideoUrl} type="video/mp4" />
        </video>
        <div className={isMobile ? "hero-mobile-gradient-overlay" : "hero-gradient-overlay"} />
        <div className="hero-bottom-gradient-overlay" />
      </div>

      {/* ── CONTENT ZONE ── */}
      <div className="hero-container">
        <div className="hero-content">
          {/* 1. Eyebrow: Fits on ONE line */}
          <p className="hero-label">
            AI Engineer · Full-Stack Developer · Researcher
          </p>

          {/* 2. Main Heading: Solid white, weight 600 */}
          <h1 className="hero-heading">
            Hi, I'm
            <br />
            Devakumar A.
          </h1>

          {/* 3. High-End Typing Role */}
          <div
            className="hero-role-wrapper"
            aria-label={`Current Role: ${HERO_CONFIG.roles[roleIndex]}`}
          >
            <span className="hero-role-text">
              {shouldReduceMotion ? HERO_CONFIG.roles[0] : displayText}
            </span>
            {!shouldReduceMotion && (
              <span className="hero-role-cursor" aria-hidden="true" />
            )}
          </div>

          {/* 4. Description */}
          <p className="hero-description">{HERO_CONFIG.description}</p>

          {/* 5. CTA Action Buttons: Side-by-side row */}
          <div className="hero-actions">
            <button
              onClick={() => scrollToSection && scrollToSection("projects")}
              className="hero-btn-primary"
              aria-label="Explore Projects"
            >
              Explore Projects
            </button>

            <button
              onClick={() => scrollToSection && scrollToSection("contact")}
              className="hero-btn-secondary"
              aria-label="Contact Me"
            >
              Contact Me
            </button>
          </div>

          {/* 6. Achievements: 3-column row with vertical dividers */}
          <div className="hero-achievements" aria-label="Key Achievements">
            <div className="hero-achievement-col">
              <span className="hero-achievement-num">
                {HERO_CONFIG.achievements.internships}
              </span>
              <span className="hero-achievement-txt">Internships</span>
            </div>

            <div className="hero-achievement-vdivider" aria-hidden="true" />

            <div className="hero-achievement-col">
              <span className="hero-achievement-num">
                {HERO_CONFIG.achievements.publications}
              </span>
              <span className="hero-achievement-txt desktop-only-label">
                Scopus-Indexed Publication
              </span>
              <span className="hero-achievement-txt mobile-only-label">
                Scopus Publication
              </span>
            </div>

            <div className="hero-achievement-vdivider" aria-hidden="true" />

            <div className="hero-achievement-col">
              <span className="hero-achievement-num">
                {HERO_CONFIG.achievements.certifications}
              </span>
              <span className="hero-achievement-txt">Certifications</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
