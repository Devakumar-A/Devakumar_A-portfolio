import { useCallback, useEffect, useRef, useState } from "react";
import "./Header.css";

const base = import.meta.env.BASE_URL || "/";

const DEFAULT_LINKS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Experience", id: "experience" },
  { label: "Education", id: "education" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Research", id: "research" },
  { label: "Certificates", id: "certifications" },
  { label: "Contact", id: "contact" },
];

const DEFAULT_SOCIALS = [
  { label: "GitHub", href: "https://github.com/Devakumar-A" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/devakumar-a-129561305" },
  { label: "Email", href: "mailto:devak9391@gmail.com" },
];

/* true only for mouse devices that have not asked for reduced motion */
function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const hover = window.matchMedia("(hover:hover) and (pointer:fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    setFine(hover.matches && !calm.matches);
  }, []);
  return fine;
}

const DownloadIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M8 2v8m0 0L4.5 6.5M8 10l3.5-3.5M3 13.5h10" />
  </svg>
);

/* Resume button with 3D tilt toward the cursor */
function Resume({ href, fine }) {
  const ref = useRef(null);
  const move = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--by", `${x * 24}deg`);
    el.style.setProperty("--bx", `${-y * 24}deg`);
  };
  const leave = () => {
    if (!ref.current) return;
    ref.current.style.setProperty("--bx", "0deg");
    ref.current.style.setProperty("--by", "0deg");
  };
  return (
    <a
      ref={ref}
      className="resume"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onPointerMove={fine ? move : undefined}
      onPointerLeave={fine ? leave : undefined}
    >
      Resume <DownloadIcon />
    </a>
  );
}

export default function Header({
  name = "Devakumar A.",
  links = DEFAULT_LINKS,
  socials = DEFAULT_SOCIALS,
  resumeHref = `${base}assets/resume/Devakumar-A_Resume_Portfolio.pdf`,
  onNavigate,
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(links[0].id);

  const barRef = useRef(null);
  const burgerRef = useRef(null);
  const sheetRef = useRef(null);
  const gliderRef = useRef(null);
  const linkEls = useRef([]);
  const wasOpen = useRef(false);
  const touchY = useRef(null);
  const fine = useFinePointer();

  const activeIndex = Math.max(0, links.findIndex((l) => l.id === active));

  /* sliding indicator */
  const moveTo = useCallback((i) => {
    const el = linkEls.current[i];
    const g = gliderRef.current;
    if (!el || !g) return;
    g.style.width = `${el.offsetWidth}px`;
    g.style.transform = `translate3d(${el.offsetLeft}px,0,14px)`;
    g.style.opacity = 1;
  }, []);

  useEffect(() => {
    moveTo(activeIndex);
    const refit = () => moveTo(activeIndex);
    window.addEventListener("resize", refit);
    if (document.fonts?.ready) document.fonts.ready.then(refit);
    return () => window.removeEventListener("resize", refit);
  }, [activeIndex, moveTo]);

  /* scroll-spy */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [links]);

  /* shrink on scroll + progress ring on the hamburger */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? Math.min(100, Math.max(0, (window.scrollY / h) * 100)) : 0;
      burgerRef.current?.style.setProperty("--p", p.toFixed(1));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* open / close the mobile menu */
  useEffect(() => {
    const root = document.documentElement;
    const sheet = sheetRef.current;
    const burger = burgerRef.current;
    const main = document.querySelector("main");
    let timer;

    if (!sheet || !burger) return;

    if (open) {
      const r = burger.getBoundingClientRect();
      sheet.style.setProperty("--ox", `${r.left + r.width / 2}px`);
      sheet.style.setProperty("--oy", `${r.top + r.height / 2}px`);
      void sheet.offsetWidth; // commit the reveal origin before the animation starts
      timer = setTimeout(() => sheet.querySelector("nav a")?.focus({ preventScroll: true }), 350);
    } else if (wasOpen.current) {
      burger.focus({ preventScroll: true });
    }
    sheet.inert = !open;
    if (main) main.inert = open;
    root.classList.toggle("menu-open", open);
    root.style.overflow = open ? "hidden" : "";
    wasOpen.current = open;

    return () => clearTimeout(timer);
  }, [open]);

  useEffect(
    () => () => {
      document.documentElement.classList.remove("menu-open");
      document.documentElement.style.overflow = "";
      const main = document.querySelector("main");
      if (main) main.inert = false;
    },
    []
  );

  /* Esc to close + keep Tab inside the menu */
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") return setOpen(false);
      if (e.key !== "Tab" || !sheetRef.current || !burgerRef.current) return;
      const f = [burgerRef.current, ...sheetRef.current.querySelectorAll("a")];
      const i = f.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0) {
        e.preventDefault();
        f[f.length - 1].focus();
      } else if (!e.shiftKey && i === f.length - 1) {
        e.preventDefault();
        burgerRef.current.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  /* close when the layout switches to desktop */
  useEffect(() => {
    const mq = window.matchMedia("(min-width:981px)");
    const onChange = (e) => e.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  /* 3D tilt of the bar + moving highlight */
  const onBarMove = (e) => {
    if (!fine) return;
    const bar = barRef.current;
    if (!bar) return;
    const r = bar.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    bar.style.setProperty("--ry", `${((x - 0.5) * 6).toFixed(2)}deg`);
    bar.style.setProperty("--rx", `${((0.5 - y) * 5).toFixed(2)}deg`);
    bar.style.setProperty("--mx", `${x * 100}%`);
    bar.style.setProperty("--my", `${y * 100}%`);
    bar.style.setProperty("--glow", 1);
  };
  const onBarLeave = () => {
    const bar = barRef.current;
    if (!bar) return;
    bar.style.setProperty("--rx", "0deg");
    bar.style.setProperty("--ry", "0deg");
    bar.style.setProperty("--glow", 0);
  };

  const handleLinkClick = (e, id) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(id);
      setOpen(false);
    }
  };

  return (
    <>
      <header className={`site-header${scrolled ? " scrolled" : ""}`}>
        <div className="bar" ref={barRef} onPointerMove={onBarMove} onPointerLeave={onBarLeave}>
          <a
            className="brand"
            href={`#${links[0].id}`}
            aria-label={`${name} home`}
            onClick={(e) => handleLinkClick(e, links[0].id)}
          >
            <img
              src={`${base}assets/logo/logo.png`}
              alt={name}
              className="brand-logo"
            />
          </a>

          <nav className="nav" aria-label="Primary" onMouseLeave={() => moveTo(activeIndex)}>
            <span className="glider" ref={gliderRef} aria-hidden="true" />
            {links.map((l, i) => (
              <a
                key={l.id}
                ref={(el) => (linkEls.current[i] = el)}
                href={`#${l.id}`}
                aria-current={active === l.id ? "true" : undefined}
                onMouseEnter={() => moveTo(i)}
                onFocus={() => moveTo(i)}
                onClick={(e) => handleLinkClick(e, l.id)}
              >
                <span className="roll">
                  <b>{l.label}</b>
                  <b aria-hidden="true">{l.label}</b>
                </span>
              </a>
            ))}
          </nav>

          <Resume href={resumeHref} fine={fine} />

          <button
            ref={burgerRef}
            className="burger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="sheet"
            onClick={() => setOpen((o) => !o)}
            style={{
              outline: "none",
              border: 0,
              borderRadius: "50%",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            <svg className="ring" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
              <circle className="trk" cx="24" cy="24" r="22.5" />
              <circle className="prog" cx="24" cy="24" r="22.5" pathLength="100" />
            </svg>
            <i />
            <i />
          </button>
        </div>
      </header>

      {/* Keep the sheet OUTSIDE the header: transforms/perspective on an ancestor break position:fixed */}
      <div
        className="sheet"
        id="sheet"
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        onClick={(e) => e.target.closest("a") && setOpen(false)}
        onTouchStart={(e) => (touchY.current = e.touches[0].clientY)}
        onTouchEnd={(e) => {
          const s = sheetRef.current;
          if (!s) return;
          const swipedUp = touchY.current !== null && touchY.current - e.changedTouches[0].clientY > 70;
          if (swipedUp && s.scrollHeight <= s.clientHeight) setOpen(false);
          touchY.current = null;
        }}
      >
        <span className="orb o1" aria-hidden="true" />
        <span className="orb o2" aria-hidden="true" />

        <nav aria-label="Mobile">
          {links.map((l, i) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              style={{ "--i": i }}
              aria-current={active === l.id ? "true" : undefined}
              onClick={(e) => handleLinkClick(e, l.id)}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="sheet-foot">
          <a className="resume" href={resumeHref} target="_blank" rel="noopener noreferrer">
            Resume <DownloadIcon />
          </a>
          <div className="social">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
