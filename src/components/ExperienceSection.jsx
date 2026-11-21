import React from "react";

export const ExperienceSection = React.memo(function ExperienceSection() {
  return (
    <section
      id="experience"
      style={{
        scrollMarginTop: "84px",
        padding: 0,
        margin: 0,
        background: "#000000",
        width: "100%",
        display: "block",
      }}
    >
      <iframe
        src={`${import.meta.env.BASE_URL}experience.html?v=6`}
        title="Experience"
        style={{
          width: "100%",
          height: "100svh",
          border: 0,
          display: "block",
          background: "#000000",
          margin: 0,
          padding: 0,
        }}
        loading="lazy"
      />
    </section>
  );
});

export default ExperienceSection;
