import {
  createRef,
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  animate,
  motion,
  useDragControls,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects, allProjectsHref } from "../../data/projects";
import { screens, SpecsScreen, StackScreen } from "./Screens";
import "./Projects.css";

const PAGES = ["View", "Specs", "Stack"];
const KNOB = [-52, 0, 52];

const COLORWAY_KEYS = {
  bone: "#e8452c",
  steel: "#2b5fd9",
  lilac: "#f0a800",
};

function useMedia(query) {
  const [m, setM] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setM(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return m;
}

/* ==============================================================================
   INDIVIDUAL PROJECT CARD (HARDWARE DEVICE)
   Preserves internal state (page, knob) across deck cycling
   ============================================================================== */
const ProjectCard = forwardRef(function ProjectCard(
  {
    project,
    index,
    depth,
    isFront,
    dragX,
    isMobile,
    reduceMotion,
    isSectionVisible,
    onFlyOut,
    onBringToFront,
    isAnimatingRef,
  },
  ref
) {
  const [page, setPage] = useState(0);
  const uid = useId();
  const Screen = screens[project.visual];
  const dragControls = useDragControls();

  const next = () => setPage((p) => (p + 1) % PAGES.length);

  const onKey = (e) => {
    const k = e.key;
    if (k === "ArrowRight" || k === "ArrowDown") {
      e.preventDefault();
      next();
    }
    if (k === "ArrowLeft" || k === "ArrowUp") {
      e.preventDefault();
      setPage((p) => (p + PAGES.length - 1) % PAGES.length);
    }
  };

  // Depth offsets
  const peek1 = isMobile ? 12 : 16;
  const peek2 = isMobile ? 24 : 32;

  const targetY = depth === 0 ? 0 : depth === 1 ? peek1 : peek2;
  const targetScale = depth === 0 ? 1 : depth === 1 ? 0.955 : 0.91;
  const targetZIndex = depth === 0 ? 3 : depth === 1 ? 2 : 1;
  const baseDim = depth === 0 ? 0 : depth === 1 ? 0.35 : 0.55;

  // Drag interaction mappings for front and depth-1 card
  const rotateFront = useTransform(dragX, (x) =>
    reduceMotion ? 0 : Math.min(8, Math.max(-8, x / 18))
  );

  // Depth 1 card dynamically rises towards front as front card drags away
  const depth1Y = useTransform(dragX, [-140, 0, 140], [peek1 * 0.35, peek1, peek1 * 0.35]);
  const depth1Scale = useTransform(dragX, [-140, 0, 140], [0.985, 0.955, 0.985]);
  const depth1Dim = useTransform(dragX, [-140, 0, 140], [0.12, 0.35, 0.12]);

  const handlePointerDown = (e) => {
    if (!isFront || isAnimatingRef.current) return;
    if (e.target.closest('a, button, [role="tab"], input, textarea')) return;
    dragControls.start(e);
  };

  const handleDragEnd = (_, info) => {
    if (!isFront || isAnimatingRef.current) return;
    const { offset, velocity } = info;
    if (Math.abs(offset.x) > 110 || Math.abs(velocity.x) > 500) {
      onFlyOut(offset.x > 0 ? 1 : -1);
    } else {
      animate(dragX, 0, {
        type: "spring",
        stiffness: 320,
        damping: 30,
      });
    }
  };

  // Pause screen animations on cards behind depth 0 or when section is off screen
  const isPaused = !isSectionVisible || depth !== 0;

  return (
    <li
      className="dv-card-wrap"
      style={{ zIndex: targetZIndex }}
    >
      <motion.article
        ref={ref}
        className={`dv ${isFront ? "is-front" : ""}`}
        data-cw={project.colorway}
        data-paused={isPaused}
        inert={depth > 0 ? "" : undefined}
        aria-hidden={depth > 0 ? "true" : undefined}
        role="group"
        aria-roledescription="slide"
        aria-label={`${depth + 1} of 3: ${project.title}`}
        aria-labelledby={`${uid}-t`}
        drag={isFront ? "x" : false}
        dragControls={dragControls}
        dragListener={false}
        dragDirectionLock
        dragElastic={0.2}
        onPointerDown={handlePointerDown}
        onDragEnd={handleDragEnd}
        animate={
          reduceMotion
            ? { opacity: 1, y: targetY, scale: targetScale }
            : depth === 0
            ? { y: 0, scale: 1 }
            : depth === 1
            ? undefined // Handled by Framer Motion motionValues depth1Y/depth1Scale
            : { y: targetY, scale: targetScale }
        }
        style={
          reduceMotion
            ? undefined
            : depth === 0
            ? { x: dragX, rotate: rotateFront }
            : depth === 1
            ? { y: depth1Y, scale: depth1Scale }
            : { y: targetY, scale: targetScale }
        }
        transition={
          reduceMotion
            ? { duration: 0.15 }
            : { type: "spring", stiffness: 300, damping: 32 }
        }
      >
        <i className="dv-screw a" aria-hidden="true" />
        <i className="dv-screw b" aria-hidden="true" />
        <i className="dv-screw c" aria-hidden="true" />
        <i className="dv-screw d" aria-hidden="true" />
        <i className="dv-vents" aria-hidden="true" />

        {/* ===== screen side ===== */}
        <div className="dv-left">
          <div className="dv-bezel">
            <div
              className="lcd"
              role="tabpanel"
              id={`${uid}-p`}
              aria-labelledby={`${uid}-k${page}`}
            >
              <div className="lcd-bar">
                <span>{project.short}</span>
                <span>
                  {PAGES[page].toUpperCase()} {page + 1}/{PAGES.length}
                </span>
              </div>
              <div className="lcd-body" key={page}>
                {page === 0 && <Screen />}
                {page === 1 && <SpecsScreen items={project.specs} />}
                {page === 2 && <StackScreen items={project.tech} />}
              </div>
              <i className="lcd-glass" aria-hidden="true" />
            </div>
          </div>

          <div
            className="dv-keys"
            role="tablist"
            aria-label={`${project.title} screen pages`}
            onKeyDown={onKey}
          >
            {PAGES.map((n, i) => (
              <button
                key={n}
                id={`${uid}-k${i}`}
                type="button"
                role="tab"
                aria-selected={page === i}
                aria-controls={`${uid}-p`}
                tabIndex={page === i && isFront ? 0 : -1}
                className="dv-key"
                onClick={() => setPage(i)}
              >
                <i className="led" aria-hidden="true" />
                <span className="cap" aria-hidden="true" />
                <span className="lbl">{n}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ===== faceplate side ===== */}
        <div className="dv-right">
          <p className="dv-print">
            <span className="dv-model">{project.model}</span>
            <span className="dv-cat">
              <i className="led on" aria-hidden="true" />
              {project.category}
            </span>
          </p>

          <h3 id={`${uid}-t`} className="dv-title">
            {project.title}
          </h3>
          <p className="dv-sub">{project.subtitle}</p>
          <p className="dv-desc">{project.description}</p>

          <div
            className="dv-window"
            role="group"
            aria-label={`${project.metric.value} ${project.metric.label}`}
          >
            <strong>{project.metric.value}</strong>
            <span>
              <b>{project.metric.label}</b>
              <em>{project.metric.note}</em>
            </span>
          </div>

          <p className="dv-built">
            <span>Built with</span>
            {project.tech.join(" · ")}
          </p>

          <div className="dv-controls">
            <button
              type="button"
              className="dv-knob"
              onClick={next}
              tabIndex={isFront ? 0 : -1}
              aria-label={`Change screen page, now ${PAGES[page]}. Press to switch.`}
            >
              <span className="dv-knob-t l" aria-hidden="true">
                View
              </span>
              <span className="dv-knob-t m" aria-hidden="true">
                Specs
              </span>
              <span className="dv-knob-t r" aria-hidden="true">
                Stack
              </span>
              <span
                className="dv-knob-body"
                style={{ transform: `rotate(${KNOB[page]}deg)` }}
                aria-hidden="true"
              >
                <i />
              </span>
            </button>

            <div className="dv-btns">
              {project.links.map((l, i) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={isFront ? 0 : -1}
                  className={i === 0 ? "dv-btn main" : "dv-btn"}
                >
                  <span className="face">
                    {l.label}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Shading overlay for depth */}
        {depth > 0 && (
          <motion.div
            className="dv-dim"
            style={depth === 1 && !reduceMotion ? { opacity: depth1Dim } : { opacity: baseDim }}
            aria-hidden="true"
          />
        )}
      </motion.article>

      {/* Transparent overlay button over visible peeking bottom edge */}
      {depth > 0 && (
        <button
          type="button"
          tabIndex={-1}
          aria-label={`Show ${project.title}`}
          className="dv-peek-btn"
          onClick={() => onBringToFront(index)}
        />
      )}
    </li>
  );
});

/* ==============================================================================
   MAIN PROJECTS DECK COMPONENT
   ============================================================================== */
export default function Projects({ id = "projects" }) {
  const [order, setOrder] = useState([0, 1, 2]); // order[0] is front card
  const frontIndex = order[0];
  const frontProject = projects[frontIndex];

  const sectionRef = useRef(null);
  const deckRef = useRef(null);
  const cardRefs = useMemo(() => projects.map(() => createRef()), []);
  const isAnimatingRef = useRef(false);

  const dragX = useMotionValue(0);
  const reduceMotion = useReducedMotion();
  const isMobile = useMedia("(max-width: 520px)");

  // Pause animations when section is off screen
  const [isSectionVisible, setIsSectionVisible] = useState(true);
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setIsSectionVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Swiping next
  const next = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    if (reduceMotion) {
      setOrder((prev) => [prev[1], prev[2], prev[0]]);
      isAnimatingRef.current = false;
      return;
    }

    const cardEl = cardRefs[frontIndex]?.current;
    const width = cardEl ? cardEl.offsetWidth : 800;

    animate(dragX, width * 1.25, {
      duration: 0.35,
      ease: [0.32, 0, 0.67, 0], // easeIn
    }).then(() => {
      setOrder((prev) => [prev[1], prev[2], prev[0]]);
      dragX.set(0);
      isAnimatingRef.current = false;
    });
  }, [cardRefs, dragX, frontIndex, reduceMotion]);

  // Swiping previous
  const prev = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    if (reduceMotion) {
      setOrder((prev) => [prev[2], prev[0], prev[1]]);
      isAnimatingRef.current = false;
      return;
    }

    const lastIdx = order[2];
    const cardEl = cardRefs[lastIdx]?.current;
    const width = cardEl ? cardEl.offsetWidth : 800;

    // Last card springs into view from left
    dragX.set(-width * 0.9);
    setOrder((prev) => [prev[2], prev[0], prev[1]]);

    animate(dragX, 0, {
      type: "spring",
      stiffness: 300,
      damping: 32,
    }).then(() => {
      isAnimatingRef.current = false;
    });
  }, [cardRefs, dragX, order, reduceMotion]);

  // Bring specific project index to front
  const bringToFront = useCallback(
    (targetProjectIndex) => {
      if (isAnimatingRef.current) return;
      const curDepth = order.indexOf(targetProjectIndex);
      if (curDepth === 0) return;
      if (curDepth === 1) next();
      else if (curDepth === 2) prev();
    },
    [next, prev, order]
  );

  // Keyboard navigation on deck wrapper
  const handleDeckKeyDown = (e) => {
    if (e.target !== deckRef.current) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "Home") {
      e.preventDefault();
      bringToFront(0);
    } else if (e.key === "End") {
      e.preventDefault();
      bringToFront(projects.length - 1);
    }
  };

  const activeKeyColor = COLORWAY_KEYS[frontProject.colorway] || "#e8452c";

  return (
    <section
      ref={sectionRef}
      id={id}
      className="dv-section"
      aria-labelledby="dv-h2"
    >
      <header className="dv-header">
        <p className="dv-eyebrow">Selected projects</p>
        <h2 id="dv-h2" className="dv-h2">
          Ideas that became working systems.
        </h2>
      </header>

      {/* Screen reader live region */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {`Showing project ${frontIndex + 1} of ${projects.length}: ${frontProject.title}`}
      </div>

      <div
        ref={deckRef}
        className="dv-deck-wrap"
        tabIndex={0}
        onKeyDown={handleDeckKeyDown}
        role="group"
        aria-roledescription="carousel"
        aria-label="Projects"
        style={{ "--active-key": activeKeyColor }}
      >
        <ul className="dv-deck">
          {projects.map((p, i) => {
            const depth = order.indexOf(i);
            return (
              <ProjectCard
                key={p.id}
                ref={cardRefs[i]}
                project={p}
                index={i}
                depth={depth}
                isFront={depth === 0}
                dragX={dragX}
                isMobile={isMobile}
                reduceMotion={reduceMotion}
                isSectionVisible={isSectionVisible}
                onFlyOut={next}
                onBringToFront={bringToFront}
                isAnimatingRef={isAnimatingRef}
              />
            );
          })}
        </ul>

        {/* Deck controls directly under the device stack */}
        <div className="dv-deck-controls" aria-label="Deck controls">
          <div className="dv-deck-counter" aria-hidden="true">
            {String(frontIndex + 1).padStart(2, "0")} /{" "}
            {String(projects.length).padStart(2, "0")}
          </div>

          <div className="dv-deck-leds" role="tablist" aria-label="Project selection LEDs">
            {projects.map((p, i) => {
              const isActive = i === frontIndex;
              return (
                <button
                  key={p.id}
                  type="button"
                  className={`dv-deck-led-btn ${isActive ? "is-active" : ""}`}
                  aria-label={`Show project ${i + 1}: ${p.title}`}
                  aria-pressed={isActive}
                  style={isActive ? { color: COLORWAY_KEYS[p.colorway] } : undefined}
                  onClick={() => bringToFront(i)}
                >
                  <i className="led" aria-hidden="true" />
                </button>
              );
            })}
          </div>

          <div className="dv-deck-nav">
            <button
              type="button"
              className="dv-deck-nav-btn"
              onClick={prev}
              aria-label="Previous project"
            >
              <span className="face" aria-hidden="true">
                ◀
              </span>
            </button>
            <button
              type="button"
              className="dv-deck-nav-btn"
              onClick={next}
              aria-label="Next project"
            >
              <span className="face" aria-hidden="true">
                ▶
              </span>
            </button>
          </div>
        </div>

        <p className="dv-deck-hint" aria-hidden="true">
          <span className="dv-hint-desktop">Swipe or use arrow keys</span>
          <span className="dv-hint-touch">Swipe the card</span>
        </p>
      </div>

      <p className="dv-foot">
        <a href={allProjectsHref} target="_blank" rel="noopener noreferrer">
          More on GitHub <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </p>
    </section>
  );
}
