import { useEffect, useRef } from "react";
import { laneBuild, laneIntelligence } from "../../data/skills";
import "./SkillsMarquee.css";

const SETS = 4; // 4 identical sets; the track slides by exactly 2 sets (-50%) for a seamless loop

function Tile({ skill }) {
  const { name, tag, Icon, color } = skill;

  // Cursor-following spotlight, written straight to CSS variables (no React re-render).
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div className="sm-tile" style={{ "--brand": color }} onPointerMove={onMove}>
      <span className="sm-logo">
        <Icon aria-hidden="true" />
      </span>
      <span className="sm-text">
        <span className="sm-name">{name}</span>
        <span className="sm-tag">{tag}</span>
      </span>
    </div>
  );
}

function Lane({ label, items, direction, secondsPerTile = 3.4 }) {
  // Constant speed regardless of how many tiles a lane has.
  const duration = `${items.length * 2 * secondsPerTile}s`;

  return (
    <div className="sm-lane" data-direction={direction}>
      <p className="sm-lane-label">{label}</p>
      <div className="sm-viewport">
        <div className="sm-track" style={{ "--dur": duration }}>
          {Array.from({ length: SETS }).map((_, setIndex) => (
            <div className="sm-set" key={setIndex} aria-hidden={setIndex > 0 || undefined}>
              {items.map((s) => (
                <Tile key={s.name} skill={s} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SkillsMarquee({ id = "skills" }) {
  const ref = useRef(null);

  // Reveal once, and pause the animations while the section is off screen.
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      el?.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        el.classList.toggle("is-offscreen", !entry.isIntersecting);
        if (entry.isIntersecting) el.classList.add("is-in");
      },
      { threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} id={id} className="sm-section" aria-labelledby="sm-title">
      <div className="sm-bg" aria-hidden="true" />

      <header className="sm-header">
        <p className="sm-eyebrow">
          <span className="sm-eyebrow-line" aria-hidden="true" />
          Technical Skills
        </p>
        <h2 id="sm-title" className="sm-title">
          The stack behind <span className="sm-title-accent">the work.</span>
        </h2>
      </header>

      <Lane label="Languages · Web · Databases" items={laneBuild} direction="left" />
      <Lane label="AI / ML · Tools" items={laneIntelligence} direction="right" />
    </section>
  );
}
