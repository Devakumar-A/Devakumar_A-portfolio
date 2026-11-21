import CertificatesRing from "./Certificates/CertificatesRing";

// Helper for typographic issuer mark initials (retained for backward compatibility)
export function getIssuerInitials(issuer) {
  if (!issuer) return "CR";
  if (issuer.includes("IIT Ropar") || issuer.includes("NPTEL")) return "IIT";
  if (issuer.includes("IIT Bombay")) return "IIT";
  if (issuer.includes("Oracle")) return "ORA";
  if (issuer.includes("Google")) return "GOO";
  if (issuer.includes("IBM")) return "IBM";
  if (issuer.includes("Microsoft")) return "MS";
  if (issuer.includes("Infosys")) return "INF";
  if (issuer.includes("Novitech")) return "NOV";
  if (issuer.includes("Simplilearn")) return "SIM";
  if (issuer.includes("Great Learning")) return "GL";
  return issuer.split(" ").map((w) => w[0]).join("").slice(0, 3).toUpperCase();
}

export function IssuerMark({ issuer, className = "" }) {
  const initials = getIssuerInitials(issuer);
  return (
    <div className={`issuer-mark ${className}`}>
      <span className="issuer-circle" aria-hidden="true">
        {initials}
      </span>
      <span className="issuer-name">{issuer}</span>
    </div>
  );
}

export function CertificatesSection({ setCurrentPage, theme = "blue" }) {
  return (
    <CertificatesRing
      id="certifications"
      theme={theme}
    />
  );
}

export default CertificatesSection;
