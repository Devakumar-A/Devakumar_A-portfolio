import React from "react";
import "./Research.css";

const DOI = "10.25258/ijddt.16.58s.21";

const PAPER = {
  year: "2026",
  title: "Deep Learning-Based EEG Communication Aid for Paralyzed Patients",
  authors: ["R. G. Suresh Kumar", "Devakumar A", "Roney Varughese Joseph", "Sivasubramanian J"],
  me: "Devakumar A",
  journal: "International Journal of Drug Delivery Technology",
  detail: "Volume 16, Issue 58s, pp. 235–241",
};

export function ResearchSection() {
  return (
    <section id="research" className="rs" aria-labelledby="rs-title">
      <div className="rs-in">
        <h2 id="rs-title">Research</h2>

        <article className="rs-item">
          <div className="rs-side">
            <p className="rs-year">{PAPER.year}</p>
            <p className="rs-index">Scopus-indexed</p>
          </div>

          <div className="rs-main">
            <h3>{PAPER.title}</h3>

            <p className="rs-authors">
              {PAPER.authors.map((a, i) => (
                <span key={a}>
                  {a === PAPER.me ? <b>{a}</b> : a}
                  {i < PAPER.authors.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
            <p className="rs-role">Contributing author</p>

            <p className="rs-journal">
              {PAPER.journal}
              <span>{PAPER.detail}</span>
            </p>

            <a
              className="rs-link"
              href={`https://doi.org/${DOI}`}
              target="_blank"
              rel="noreferrer"
            >
              doi.org/{DOI} ↗
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}

export { ResearchSection as Research };
export default ResearchSection;
