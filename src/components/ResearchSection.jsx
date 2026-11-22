import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight, Award, BookOpen, Sparkles } from "lucide-react";
import "./Research.css";

const DOI = "10.25258/ijddt.16.58s.21";

const PAPER = {
  year: "2026",
  title: "Deep Learning-Based EEG Communication Aid for Paralyzed Patients",
  authors: [
    "R. G. Suresh Kumar",
    "Devakumar A",
    "Roney Varughese Joseph",
    "Sivasubramanian J",
  ],
  me: "Devakumar A",
  journal: "International Journal of Drug Delivery Technology",
  detail: "Volume 16, Issue 58s, pp. 235–241",
};

export function ResearchSection() {
  const containerRef = useRef(null);
  const reduceMotion = useReducedMotion();

  // Scroll tracking across viewport for bidirectional up/down motion
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth physics spring for fluid scroll transitions
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 30,
    restDelta: 0.001,
  });

  // Bi-directional translation & opacity when scrolling down and up
  const contentY = useTransform(smoothProgress, [0, 0.35, 0.65, 1], [40, 0, 0, -40]);
  const contentOpacity = useTransform(smoothProgress, [0, 0.22, 0.78, 1], [0.2, 1, 1, 0.2]);
  const contentScale = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0.97, 1, 1, 0.97]);

  // Ambient backlight tracking with scroll
  const glowX = useTransform(smoothProgress, [0, 1], ["-15%", "15%"]);
  const glowOpacity = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0.15, 0.5, 0.5, 0.15]);

  // Header staggered entrance on scroll
  const headerY = useTransform(smoothProgress, [0, 0.3], [24, 0]);
  const headerOpacity = useTransform(smoothProgress, [0, 0.22], [0.25, 1]);

  return (
    <section
      ref={containerRef}
      id="research"
      className="rs"
      aria-labelledby="rs-title"
    >
      {/* Dynamic ambient backlight reacting to scroll */}
      <motion.div
        className="rs-glow-backlight"
        style={
          reduceMotion
            ? { opacity: 0.35 }
            : { x: glowX, opacity: glowOpacity }
        }
        aria-hidden="true"
      />

      <div className="rs-in">
        {/* Header with scroll-reactive glide */}
        <motion.div
          className="rs-header-wrap"
          style={reduceMotion ? undefined : { y: headerY, opacity: headerOpacity }}
        >
          <div className="rs-eyebrow">
            <span className="rs-eyebrow-dot" />
            <span className="rs-eyebrow-text">Scientific Research & Publications</span>
          </div>
          <h2 id="rs-title">Research</h2>
        </motion.div>

        {/* The Paper Entry with bidirectional scroll-down & scroll-up response */}
        <motion.article
          className="rs-item"
          style={
            reduceMotion
              ? undefined
              : {
                  y: contentY,
                  opacity: contentOpacity,
                  scale: contentScale,
                }
          }
          whileHover={reduceMotion ? undefined : { y: -4, transition: { duration: 0.25 } }}
        >
          {/* Subtle top reflection rim */}
          <div className="rs-item-rim" aria-hidden="true" />

          <div className="rs-side">
            <p className="rs-year">{PAPER.year}</p>
            <div className="rs-badge">
              <span className="rs-pulse-dot" aria-hidden="true" />
              <span>Scopus-indexed</span>
            </div>
            <div className="rs-peer-tag">
              <BookOpen size={13} aria-hidden="true" />
              <span>Peer-Reviewed</span>
            </div>
          </div>

          <div className="rs-main">
            <h3 className="rs-paper-title">{PAPER.title}</h3>

            <p className="rs-authors">
              {PAPER.authors.map((a, i) => (
                <span key={a} className={a === PAPER.me ? "rs-author-me" : "rs-author-co"}>
                  {a === PAPER.me ? (
                    <span className="rs-me-pill">
                      <b>{a}</b>
                      <span className="rs-me-tag">Contributing author</span>
                    </span>
                  ) : (
                    a
                  )}
                  {i < PAPER.authors.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>

            <div className="rs-journal-box">
              <div className="rs-journal-name">
                <Award size={16} className="rs-journal-icon" aria-hidden="true" />
                <span>{PAPER.journal}</span>
              </div>
              <span className="rs-journal-detail">{PAPER.detail}</span>
            </div>

            <div className="rs-actions">
              <a
                className="rs-link"
                href={`https://doi.org/${DOI}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View publication on doi.org (opens in a new tab)`}
              >
                <span>doi.org/{DOI}</span>
                <ArrowUpRight size={16} className="rs-link-arrow" aria-hidden="true" />
              </a>

              <span className="rs-metric-pill">
                <Sparkles size={13} aria-hidden="true" />
                <span>89% Overall Accuracy · 3 Tasks</span>
              </span>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}

export { ResearchSection as Research };
export default ResearchSection;
