import { useState, useEffect } from "react";
import Header from "./components/Header";
import MainPage from "./components/MainPage";
import CertificatesPage from "./components/CertificatesPage";
import FloatingActions from "./components/FloatingActions";

export function App() {
  const [currentPage, setCurrentPage] = useState("home"); // "home" or "certificates-museum"

  // Ensure page starts at top on initial mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Function to smoothly scroll to elements
  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavigate = (id) => {
    if (currentPage !== "home") {
      setCurrentPage("home");
      setTimeout(() => {
        scrollToSection(id);
      }, 100);
    } else {
      scrollToSection(id);
    }
  };

  return (
    <>
      {/* Premium Glass Header & Circular Reveal Mobile Menu */}
      <Header
        name="Devakumar A."
        resumeHref={`${import.meta.env.BASE_URL}assets/resume/Devakumar-A_Resume_Portfolio.pdf`}
        onNavigate={handleNavigate}
      />

      {/* Floating Buttons & Chatbot Panel */}
      <FloatingActions />

      <div className="portfolio-app animate-fadeIn">
        {/* Dynamic Main Views */}
        <main>
          {currentPage === "home" ? (
            <MainPage 
              setCurrentPage={setCurrentPage} 
              scrollToSection={scrollToSection}
            />
          ) : (
            <CertificatesPage />
          )}
        </main>
      </div>
    </>
  );
}

export default App;
