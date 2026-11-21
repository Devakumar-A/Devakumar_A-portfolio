import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export function Navbar({ currentPage, setCurrentPage, scrollToSection }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const base = import.meta.env.BASE_URL;
  const logoUrl = `${base}assets/logo/logo.png`;
  const resumeUrl = `${base}assets/resume/Devakumar-A_Resume_Portfolio.pdf`;

  // Passive scroll listener for background opacity refinement
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver for scroll spy across all 9 sections
  useEffect(() => {
    if (currentPage && currentPage !== "home") {
      const timer = setTimeout(() => {
        setActiveSection("certifications");
      }, 0);
      return () => clearTimeout(timer);
    }

    const sectionIds = [
      "home",
      "about",
      "experience",
      "education",
      "skills",
      "projects",
      "research",
      "certifications",
      "contact",
    ];

    const inViewSet = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            inViewSet.add(entry.target.id);
          } else {
            inViewSet.delete(entry.target.id);
          }
        });

        const active = sectionIds.filter((id) => inViewSet.has(id)).pop() || "home";
        setActiveSection(active);
      },
      {
        rootMargin: "0px 0px -60% 0px",
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [currentPage]);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "research", label: "Research" },
    { id: "certifications", label: "Certificates" },
    { id: "contact", label: "Contact" },
  ];

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (currentPage && currentPage !== "home") {
      if (setCurrentPage) setCurrentPage("home");
      setTimeout(() => {
        if (scrollToSection) scrollToSection(id);
      }, 100);
    } else {
      if (scrollToSection) scrollToSection(id);
    }
  };

  return (
    <header className={`site-navbar ${isScrolled ? "is-scrolled" : ""}`}>
      <div className="site-navbar-container">
        {/* Left: Logo Image + Name */}
        <a
          href="#home"
          className="navbar-brand"
          onClick={(e) => handleLinkClick(e, "home")}
          aria-label="Devakumar A. Portfolio"
        >
          <img
            src={logoUrl}
            alt="Devakumar A. logo"
            className="navbar-logo-img"
            width="38"
            height="38"
          />
          <span className="navbar-name">Devakumar A.</span>
        </a>

        {/* Center: Desktop Navigation Links with subtle active underline */}
        <nav className="navbar-links" aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`navbar-link ${isActive ? "active" : ""}`}
                onClick={(e) => handleLinkClick(e, item.id)}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right: Plain Outlined Resume Button + Mobile Toggle */}
        <div className="navbar-actions">
          <a
            href={resumeUrl}
            download="Devakumar-A_Resume_Portfolio.pdf"
            className="navbar-resume-btn"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download Devakumar's Resume"
          >
            Resume
          </a>

          <button
            className="navbar-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="navbar-mobile-drawer">
          <nav className="navbar-mobile-links">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={`mobile-${item.id}`}
                  href={`#${item.id}`}
                  className={`navbar-mobile-link ${isActive ? "active" : ""}`}
                  onClick={(e) => handleLinkClick(e, item.id)}
                >
                  {item.label}
                </a>
              );
            })}
            <a
              href={resumeUrl}
              download="Devakumar-A_Resume_Portfolio.pdf"
              className="navbar-mobile-resume"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
            >
              Resume (PDF)
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
