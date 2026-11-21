import { useEffect } from "react";
import CertificatesSection from "./CertificatesSection";

export function CertificatesPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="certificates-page-wrapper" style={{ paddingTop: "64px" }}>
      <CertificatesSection />
    </div>
  );
}

export default CertificatesPage;
