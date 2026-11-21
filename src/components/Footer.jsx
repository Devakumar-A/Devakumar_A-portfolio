import {
  ArrowUp,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  Globe,
} from "lucide-react";
import {
  SiGithub,
  SiOrcid,
  SiQuora,
  SiWhatsapp,
} from "react-icons/si";
import { LinkedinIcon } from "./SocialIcons";
import { personalInfo } from "../data/portfolioData";
import "../css/footer.css";

export function Footer({ scrollToSection }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "research", label: "Research" },
    { id: "certifications", label: "Certifications" },
    { id: "contact", label: "Contact" },
  ];

  const professionalNetworks = [
    {
      name: "GitHub",
      url: personalInfo.github,
      Icon: SiGithub,
    },
    {
      name: "LinkedIn",
      url: personalInfo.linkedin,
      Icon: LinkedinIcon,
    },
    {
      name: "ORCID",
      url: personalInfo.orcidUrl,
      Icon: SiOrcid,
    },
    {
      name: "Blog",
      url: personalInfo.blog,
      Icon: Globe,
    },
    {
      name: "Quora",
      url: personalInfo.quora,
      Icon: SiQuora,
    },
    {
      name: "WhatsApp",
      url: personalInfo.whatsapp,
      Icon: SiWhatsapp,
    },
  ];

  return (
    <footer className="prof-footer" aria-label="Professional Portfolio Footer">
      <div className="prof-container">
        {/* ================================================================
            1. THREE-COLUMN PROFESSIONAL CARDS SECTION
            ================================================================ */}
        <div className="prof-cards-grid">
          {/* Column 1: Background & Direct Channels */}
          <div className="prof-card">
            <div>
              <h3 className="prof-card-title">Professional Profile</h3>
              <p className="prof-summary-text">
                Computer Science &amp; Engineering graduate specializing in deep neural architectures,
                brain-computer interfaces, and modern scalable web engineering.
              </p>
            </div>

            <div className="prof-contact-details">
              <a href={`mailto:${personalInfo.email}`} className="prof-contact-item">
                <span className="prof-contact-icon"><Mail size={15} /></span>
                <span>{personalInfo.email}</span>
              </a>
              <a href={`tel:${personalInfo.phone}`} className="prof-contact-item">
                <span className="prof-contact-icon"><Phone size={15} /></span>
                <span>{personalInfo.phone}</span>
              </a>
              <div className="prof-contact-item">
                <span className="prof-contact-icon"><MapPin size={15} /></span>
                <span>{personalInfo.location}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Directory */}
          <div className="prof-card">
            <div>
              <h3 className="prof-card-title">Directory</h3>
              <div className="prof-nav-links">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      if (scrollToSection) scrollToSection(link.id);
                    }}
                    className="prof-nav-anchor"
                  >
                    <span>{link.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 3: Professional Networks */}
          <div className="prof-card">
            <div>
              <h3 className="prof-card-title">Professional Networks</h3>
              <div className="prof-networks-grid">
                {professionalNetworks.map(({ name, url, Icon }) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="prof-network-card"
                  >
                    <div className="prof-network-main">
                      <Icon size={15} />
                      <span>{name}</span>
                    </div>
                    <ExternalLink size={12} className="opacity-40" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================
            2. MONUMENTAL GOLD SIGNATURE (STARLIGHT REFERENCE STYLE)
            ================================================================ */}
        <div className="prof-gold-signature" aria-hidden="true">
          <h2 className="prof-gold-title">DEVAKUMAR A.</h2>
          <div className="prof-gold-subtitle-wrap">
            <span className="prof-gold-sub-line">COMPUTER SCIENCE &amp; ENGINEERING</span>
            <span className="prof-gold-sub-sep">·</span>
            <span className="prof-gold-sub-line">RESEARCH &amp; SOFTWARE</span>
          </div>
        </div>

        {/* ================================================================
            3. SUB-FOOTER BOTTOM UTILITY BAR
            ================================================================ */}
        <div className="prof-bottom-bar">
          <div className="prof-copyright-wrap">
            <span>© {new Date().getFullYear()} Devakumar A. All rights reserved.</span>
            <span className="prof-dot-sep">•</span>
            <span>Puducherry, India</span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="prof-back-to-top"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
