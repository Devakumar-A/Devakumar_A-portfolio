import { useEffect } from "react";
import { X, ExternalLink, BookOpen } from "lucide-react";
import { GithubIcon } from "./SocialIcons";

export function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="project-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div 
        className="project-modal-dialog glass-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close project modal"
        >
          <X size={20} />
        </button>

        {/* Modal Banner Image */}
        <div className="modal-banner-image-wrap">
          <img 
            src={project.image} 
            alt={project.title}
            className="modal-banner-img"
          />
          <div className="modal-banner-overlay" />
          <div className="modal-banner-content">
            <span className="modal-category-chip">{project.category}</span>
            <h2 className="modal-project-title">{project.title}</h2>
            <p className="modal-subtitle">{project.subtitle}</p>
          </div>
        </div>

        {/* Modal Body Details */}
        <div className="modal-body-scrollable">
          {/* Quick Action Links Bar */}
          <div className="modal-action-bar">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-modal-action"
              >
                <GithubIcon size={16} />
                <span>View GitHub Repository</span>
              </a>
            )}
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-modal-action primary"
              >
                <ExternalLink size={16} />
                <span>Live Project Demo</span>
              </a>
            )}
            {project.publication && (
              <a
                href={`https://doi.org/${project.publication.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-modal-action accent"
              >
                <BookOpen size={16} />
                <span>Published Scopus Paper (DOI)</span>
              </a>
            )}
          </div>

          {/* Results Metric Pills */}
          {project.results && project.results.length > 0 && (
            <div className="modal-results-grid">
              {project.results.map((res, idx) => (
                <div key={idx} className="modal-metric-card">
                  <span className="metric-val">{res.value}</span>
                  <span className="metric-lbl">{res.metric}</span>
                </div>
              ))}
            </div>
          )}

          {/* Problem & Solution Breakdown */}
          <div className="modal-text-sections">
            <div className="modal-text-block">
              <h3 className="modal-block-heading">
                <span className="heading-line" />
                <span>Problem Statement</span>
              </h3>
              <p className="modal-para">{project.problem}</p>
            </div>

            <div className="modal-text-block">
              <h3 className="modal-block-heading">
                <span className="heading-line" />
                <span>Engineering Solution</span>
              </h3>
              <p className="modal-para">{project.solution}</p>
            </div>

            {project.architecture && (
              <div className="modal-text-block">
                <h3 className="modal-block-heading">
                  <span className="heading-line" />
                  <span>Pipeline & System Architecture</span>
                </h3>
                <div className="architecture-flow-box">
                  <code>{project.architecture}</code>
                </div>
              </div>
            )}
          </div>

          {/* Technology Stack Tags */}
          <div className="modal-tech-stack-wrap">
            <h4 className="tech-stack-heading">Technologies Deployed</h4>
            <div className="tech-tags-cloud">
              {project.techStack.map((tech) => (
                <span key={tech} className="tech-cloud-tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;
