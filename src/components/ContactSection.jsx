import { useEffect, useRef, useState } from "react";
import "./ContactSection.css";

const EMAIL = "devak9391@gmail.com";
const LINE1 = "devak9391";
const LINE2 = "@gmail.com";

export function ContactSection() {
  const sectionRef = useRef(null);
  const mailRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [clockTime, setClockTime] = useState("--:--");

  // Live Asia/Kolkata clock
  useEffect(() => {
    const updateClock = () => {
      try {
        const timeStr = new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Kolkata",
        }).format(new Date());
        setClockTime(timeStr);
      } catch {
        setClockTime("12:00");
      }
    };

    updateClock();
    const interval = setInterval(updateClock, 30000);
    return () => clearInterval(interval);
  }, []);

  // Copy to clipboard handler
  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(EMAIL);
    } catch {
      // Fallback
      const ta = document.createElement("textarea");
      ta.value = EMAIL;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // Proximity Typography & Glow Tracker
  useEffect(() => {
    const mail = mailRef.current;
    const sec = sectionRef.current;
    if (!mail || !sec) return;

    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lines = mail.querySelectorAll(".ln");
    const L = [];

    lines.forEach((ln) => {
      const s = ln.getAttribute("data-text") || ln.textContent;
      ln.textContent = "";
      ln.setAttribute("aria-hidden", "true");
      s.split("").forEach((ch) => {
        const c = document.createElement("span");
        c.className = "c";
        c.textContent = ch;
        ln.appendChild(c);
        L.push({ el: c, t: 0, s: "" });
      });
    });

    const W0 = 60,
      W1 = 112,
      H0 = 220,
      H1 = 900;

    const setLetter = (l, t) => {
      const w = Math.round((W0 + (W1 - W0) * t) * 10) / 10;
      const h = Math.round(H0 + (H1 - H0) * t);
      const s = `"wdth" ${w},"wght" ${h}`;
      if (s !== l.s) {
        l.s = s;
        l.el.style.fontVariationSettings = s;
      }
    };

    const fit = () => {
      if (!mail.parentNode) return;
      const avail = mail.parentNode.clientWidth;
      mail.style.fontSize = "100px";
      L.forEach((l) => setLetter(l, 1));
      let mx = 0;
      lines.forEach((ln) => {
        mx = Math.max(mx, ln.scrollWidth);
      });
      if (mx > 0) {
        mail.style.fontSize =
          Math.max(24, Math.floor((100 * avail) / mx * 0.985)) + "px";
      }
      L.forEach((l) => {
        l.s = "";
        setLetter(l, l.t);
      });
    };

    fit();
    window.addEventListener("resize", fit);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(fit);
    }

    let px = null,
      py = null,
      rel = 0;

    const move = (e) => {
      px = e.clientX;
      py = e.clientY;
      const rect = sec.getBoundingClientRect();
      const rx = px - rect.left;
      const ry = py - rect.top;
      sec.style.setProperty("--mx", `${rx}px`);
      sec.style.setProperty("--my", `${ry}px`);
      clearTimeout(rel);
      if (e.pointerType === "touch") {
        rel = setTimeout(() => {
          px = null;
        }, 900);
      }
    };

    const handleLeave = () => {
      px = null;
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", move, { passive: true });
    document.addEventListener("pointerleave", handleLeave);

    let rafId = 0;
    const frame = (ms) => {
      const time = ms / 1000;
      const fs = parseFloat(mail.style.fontSize) || 60;
      const R = Math.max(120, fs * 2.2);

      L.forEach((l, i) => {
        let tp = 0;
        if (px !== null) {
          const r = l.el.getBoundingClientRect();
          const d = Math.hypot(
            px - (r.left + r.width / 2),
            py - (r.top + r.height / 2)
          );
          tp = Math.pow(Math.max(0, 1 - d / R), 1.6);
        }
        const ti = calm
          ? 0.12
          : 0.1 + 0.3 * (0.5 + 0.5 * Math.sin(time * 1.3 - i * 0.5));
        l.t += (Math.max(tp, ti) - l.t) * 0.14;
        setLetter(l, l.t);
      });
      rafId = requestAnimationFrame(frame);
    };

    rafId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(rel);
      window.removeEventListener("resize", fit);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", move);
      document.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="ct-section" aria-label="Contact Section">
      {/* Soft radial cursor accent glow */}
      <div className="ct-glow-overlay" aria-hidden="true" />

      <main className="ct-main">
        {/* Top Status Bar */}
        <div className="ct-top">
          <span className="me">Devakumar A.</span>
          <span className="loc">
            <i aria-hidden="true" />
            Puducherry <span id="clk">{clockTime}</span>
          </span>
        </div>

        {/* Editorial Headline & Lede */}
        <div>
          <h1 className="ct-headline">Let’s build something impactful together.</h1>
          <p className="ct-lede">
            Open to engineering roles, AI research and high-performance web products. Replies within four hours.
          </p>
        </div>

        {/* Wordmark Hero Email with Proximity Typography */}
        <div className="ct-mid">
          <a
            className="ct-mail"
            id="mail"
            ref={mailRef}
            href={`mailto:${EMAIL}`}
            aria-label={`Email ${EMAIL}`}
          >
            <span className="ln" data-text={LINE1}>
              {LINE1}
            </span>
            <span className="ln" data-text={LINE2}>
              {LINE2}
            </span>
          </a>
          <button className="ct-copy" type="button" onClick={handleCopy} aria-label="Copy email address">
            {copied ? "Copied" : "Copy address"}
          </button>
        </div>

        {/* Quick Contact Rows */}
        <nav className="ct-links" aria-label="Quick contact">
          <a
            href="https://wa.me/916383066764?text=Hi%20Devakumar!%20I%20came%20across%20your%20portfolio."
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>WhatsApp</span>
            <small>Message now</small>
          </a>
          <a href="tel:+916383066764">
            <span>Call</span>
            <small>+91 63830 66764</small>
          </a>
        </nav>

        {/* Footer Pill & External Profile Links */}
        <div className="ct-foot">
          <a
            className="cv"
            href={`${import.meta.env.BASE_URL}assets/resume/Devakumar-A_Resume_Portfolio.pdf`}
            download
          >
            Résumé
          </a>
          <a href="https://github.com/Devakumar-A" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/devakumar-a-129561305" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="https://orcid.org/0009-0003-8934-6744" target="_blank" rel="noopener noreferrer">
            ORCID
          </a>
          <a
            href="https://devakumar-a.blogspot.com/2026/06/devakumar-computer-science-engineer.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Blog
          </a>
          <a href="https://qr.ae/pFHgYY" target="_blank" rel="noopener noreferrer">
            Quora
          </a>
        </div>
      </main>
    </section>
  );
}

export default ContactSection;
