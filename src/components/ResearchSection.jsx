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

  // Responsive spring physics for smooth, non-laggy motion
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 32,
    restDelta: 0.001,
  });

  // Bi-directional fade-up entrance and exit (fade up on approach, fade up on departure)
  const headerY = useTransform(smoothProgress, [0, 0.18, 0.82, 1], [32, 0, 0, -25]);
  const headerOpacity = useTransform(smoothProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  const contentY = useTransform(smoothProgress, [0, 0.22, 0.8, 1], [45, 0, 0, -35]);
  const contentOpacity = useTransform(smoothProgress, [0, 0.18, 0.82, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={containerRef}
      id="research"
      className="rs"
      aria-labelledby="rs-title"
    >
      <div className="rs-in">
        {/* Header with scroll-reactive glide & fade up */}
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

        {/* Minimalist Monochrome Research Paper Card */}
        <motion.article
          className="rs-item"
          style={
            reduceMotion
              ? undefined
              : {
                  y: contentY,
                  opacity: contentOpacity,
                }
          }
          whileHover={reduceMotion ? undefined : { y: -3, transition: { duration: 0.2 } }}
        >
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
