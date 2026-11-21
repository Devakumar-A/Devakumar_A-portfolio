import "./ProjectMarquee.css";

const projects = [
  "Deep Learning-Based EEG Communication Aid for Paralyzed Patients",
  "AquaCommandAI",
  "Automated Resume Relevance Check System",
  "MovieVerse AI",
  "QuantPulse",
  "LinguaAssist",
  "Mathoria Portal",
];

function ProjectGroup({ hidden = false }) {
  return (
    <div
      className="project-marquee__group"
      aria-hidden={hidden ? "true" : undefined}
    >
      {projects.map((project, index) => (
        <div className="project-marquee__item" key={`${index}-${hidden}`}>
          <span className="project-marquee__number">
            {String(index + 1).padStart(2, "0")}
          </span>

          <span className="project-marquee__name">
            {project}
          </span>

          <span className="project-marquee__separator">
            <span />
          </span>
        </div>
      ))}
    </div>
  );
}

export function ProjectMarquee() {
  return (
    <section className="project-marquee" aria-label="Featured projects">
      <div className="project-marquee__track">
        <ProjectGroup />
        <ProjectGroup hidden />
      </div>
    </section>
  );
}

export default ProjectMarquee;
