import HeroSection from "./HeroSection";
import ProjectMarquee from "./ProjectMarquee";
import AboutSection from "./AboutSection";
import ExperienceSection from "./ExperienceSection";
import EducationSection from "./EducationSection";
import SkillsSection from "./SkillsSection";
import ProjectsSection from "./ProjectsSection";
import ResearchSection from "./ResearchSection";
import CertificatesSection from "./CertificatesSection";
import ContactSection from "./ContactSection";
import Footer from "./Footer";

export function MainPage({ setCurrentPage, scrollToSection }) {
  const handleScroll = (id) => {
    if (scrollToSection) {
      scrollToSection(id);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="main-cinematic-flow">
      {/* 01. HERO MASTER SECTION */}
      <HeroSection scrollToSection={handleScroll} />

      {/* TWO-RIBBON PROJECT MARQUEE */}
      <ProjectMarquee />

      {/* 02. EDITORIAL ABOUT SECTION */}
      <AboutSection />

      {/* 03. INTERACTIVE PROFESSIONAL EXPERIENCE */}
      <ExperienceSection />

      {/* 04. ACADEMIC EDUCATION SECTION */}
      <EducationSection />

      {/* 05. INTERACTIVE TECHNOLOGY ECOSYSTEM (SKILLS) */}
      <SkillsSection />

      {/* 06. PRODUCTION SYSTEMS (PROJECTS) */}
      <ProjectsSection />

      {/* 07. SCIENTIFIC RESEARCH & PUBLICATIONS */}
      <ResearchSection />

      {/* 08. CERTIFICATIONS & INDUSTRY CREDENTIALS */}
      <CertificatesSection setCurrentPage={setCurrentPage} />

      {/* 09. CINEMATIC CONTACT EXPERIENCE */}
      <ContactSection />

      {/* 10. EDITORIAL FOOTER */}
      <Footer scrollToSection={handleScroll} />
    </div>
  );
}

export default MainPage;
