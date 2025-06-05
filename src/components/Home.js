import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { educationData } from "./educationData";
import { experienceData } from "./experienceData";
import { projectsData } from "./projectsData";
import CareerNarrative from "./CareerNarrative";
import About from "./About";
import { skillsByCategory } from "./skillsByCategory";
import SkillsAccordion from "./SkillsAccordion";

// Styles (reuse or adjust as needed)
const imageWrapperStyle = (hovered) => ({
  width: "100px",
  height: "100px",
  borderRadius: "50%",
  overflow: "hidden",
  marginBottom: "1rem",
  border: hovered ? "3px solid #ff3333" : "3px solid transparent",
  transition: "border 0.3s cubic-bezier(.25,.8,.25,1)"
});

const cardImageStyle = (hovered) => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "50%",
  transition: "transform 0.3s cubic-bezier(.25,.8,.25,1)",
  transform: hovered ? "scale(1.12)" : "scale(1)"
});

const cardContainerStyle = (hovered) => ({
  minWidth: "320px",
  background: "#222",
  borderRadius: "16px",
  boxShadow: hovered ? "0 8px 32px #ff333380" : "0 2px 12px #0008",
  padding: "1.2rem",
  flex: "0 0 320px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  cursor: "pointer",
  transition: "box-shadow 0.3s cubic-bezier(.25,.8,.25,1), transform 0.3s cubic-bezier(.25,.8,.25,1)"
});

const Home = () => {
  const navigate = useNavigate();
  const experienceScrollRef = useRef(null);
  const projectsScrollRef = useRef(null);
  const careerRef = useRef(null);

  // Hover states
  const [eduHover, setEduHover] = useState(null);
  const [expHover, setExpHover] = useState(null);
  const [projHover, setProjHover] = useState(null);

  // Scroll handlers for Experience and Projects sections
  const scrollExperience = (direction) => {
    const container = experienceScrollRef.current;
    if (!container) return;
    const scrollAmount = 340 + 32;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth"
    });
  };

  const scrollProjects = (direction) => {
    const container = projectsScrollRef.current;
    if (!container) return;
    const scrollAmount = 320 + 32;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth"
    });
  };

  // Listen for custom event to scroll to CareerNarrative
  useEffect(() => {
    const handler = () => {
      if (careerRef.current) {
        careerRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };
    window.addEventListener("scrollToCareer", handler);
    return () => window.removeEventListener("scrollToCareer", handler);
  }, []);

  return (
    <div style={{ color: "#fff", padding: "0", background: "#111" }}>
      {/* Smooth scroll CSS */}
      <style>{`html { scroll-behavior: smooth; }`}</style>

      {/* About Section */}
      <div>
        <About />
      </div>

      {/* Career Narrative Section */}
      <div
        id="about"
        ref={careerRef}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          marginTop: "2rem",
          textAlign: "center",
          scrollMarginTop: "80px"
        }}
      >
        <CareerNarrative />
      </div>

      {/* Education Section */}
      <div
        id="education"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          marginTop: "2rem",
          scrollMarginTop: "80px"
        }}
      >
        <h2
          style={{
            marginBottom: "1rem",
            fontWeight: "bold",
            fontSize: "2rem",
            color: "#ff3333",
            textAlign: "center"
          }}
        >
          Education
        </h2>
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <div
            style={{
              display: "flex",
              overflowX: "auto",
              gap: "2rem",
              paddingBottom: "2rem",
              scrollbarWidth: "thin",
              maxWidth: "1200px",
              margin: "0 auto"
            }}
          >
            {educationData.map((edu, idx) => (
              <div
                key={edu.slug}
                style={cardContainerStyle(eduHover === idx)}
                onClick={() => navigate(`/education/${edu.slug}`)}
                title="Click for more details"
                onMouseEnter={() => setEduHover(idx)}
                onMouseLeave={() => setEduHover(null)}
              >
                <div style={imageWrapperStyle(eduHover === idx)}>
                  <img
                    src={edu.image}
                    alt={edu.school}
                    style={cardImageStyle(eduHover === idx)}
                  />
                </div>
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    marginBottom: ".5rem",
                    textAlign: "center"
                  }}
                >
                  {edu.school}
                </div>
                <div
                  style={{
                    color: "#ff3333",
                    fontWeight: "bold",
                    marginBottom: ".3rem",
                    textAlign: "center"
                  }}
                >
                  {edu.degree}
                </div>
                <div style={{ color: "#aaa", textAlign: "center" }}>
                  {edu.dates}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Experience Section */}
      <div
        id="experience"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          marginTop: "2rem",
          scrollMarginTop: "80px"
        }}
      >
        <h2
          style={{
            marginBottom: "1rem",
            fontWeight: "bold",
            fontSize: "2rem",
            color: "#ff3333",
            textAlign: "center"
          }}
        >
          Experience
        </h2>
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 3.5rem"
          }}
        >
          {/* Left Arrow */}
          <button
            onClick={() => scrollExperience("left")}
            style={{
              position: "absolute",
              left: 0,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
              background: "red",
              border: "none",
              borderRadius: "50%",
              width: "2.2rem",
              height: "2.2rem",
              color: "#fff",
              fontSize: "1.5rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px #0006"
            }}
            aria-label="Scroll left"
          >
            &#8592;
          </button>
          {/* Experience Cards */}
          <div
            ref={experienceScrollRef}
            style={{
              display: "flex",
              overflowX: "auto",
              gap: "2rem",
              paddingBottom: "2rem",
              scrollbarWidth: "thin",
              scrollBehavior: "smooth"
            }}
          >
            {experienceData.map((exp, idx) => (
              <div
                key={exp.slug}
                style={cardContainerStyle(expHover === idx)}
                onClick={() => navigate(`/experience/${exp.slug}`)}
                title="Click for more details"
                onMouseEnter={() => setExpHover(idx)}
                onMouseLeave={() => setExpHover(null)}
              >
                <div style={imageWrapperStyle(expHover === idx)}>
                  <img
                    src={exp.image}
                    alt={exp.company}
                    style={cardImageStyle(expHover === idx)}
                  />
                </div>
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    marginBottom: ".5rem",
                    textAlign: "center"
                  }}
                >
                  {exp.company}
                </div>
                <div
                  style={{
                    color: "#ff3333",
                    fontWeight: "bold",
                    marginBottom: ".3rem",
                    textAlign: "center"
                  }}
                >
                  {exp.role}
                </div>
                <div
                  style={{
                    color: "#aaa",
                    marginBottom: ".3rem",
                    textAlign: "center"
                  }}
                >
                  {exp.dates}
                </div>
                <div style={{ color: "#ccc", textAlign: "center" }}>
                  {exp.location}
                </div>
              </div>
            ))}
          </div>
          {/* Right Arrow */}
          <button
            onClick={() => scrollExperience("right")}
            style={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
              background: "red",
              border: "none",
              borderRadius: "50%",
              width: "2.2rem",
              height: "2.2rem",
              color: "#fff",
              fontSize: "1.5rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px #0006"
            }}
            aria-label="Scroll right"
          >
            &#8594;
          </button>
        </div>
      </div>

      {/* Projects Section */}
      <div
        id="projects"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          marginTop: "2rem",
          scrollMarginTop: "80px"
        }}
      >
        <h2
          style={{
            marginBottom: "1rem",
            fontWeight: "bold",
            fontSize: "2rem",
            color: "#ff3333",
            textAlign: "center"
          }}
        >
          Projects
        </h2>
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 3.5rem"
          }}
        >
          {/* Left Arrow */}
          <button
            onClick={() => scrollProjects("left")}
            style={{
              position: "absolute",
              left: 0,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
              background: "red",
              border: "none",
              borderRadius: "50%",
              width: "2.2rem",
              height: "2.2rem",
              color: "#fff",
              fontSize: "1.5rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px #0006"
            }}
            aria-label="Scroll left"
          >
            &#8592;
          </button>
          {/* Project Cards */}
          <div
            ref={projectsScrollRef}
            style={{
              display: "flex",
              overflowX: "auto",
              gap: "2rem",
              paddingBottom: "2rem",
              scrollbarWidth: "thin",
              scrollBehavior: "smooth"
            }}
          >
            {projectsData.map((proj, idx) => (
              <div
                key={proj.slug}
                style={cardContainerStyle(projHover === idx)}
                onClick={() => navigate(`/projects/${proj.slug}`)}
                title="Click for more details"
                onMouseEnter={() => setProjHover(idx)}
                onMouseLeave={() => setProjHover(null)}
              >
                <div style={imageWrapperStyle(projHover === idx)}>
                  <img
                    src={proj.image}
                    alt={proj.title}
                    style={cardImageStyle(projHover === idx)}
                  />
                </div>
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    color: "#fff",
                    textAlign: "center"
                  }}
                >
                  {proj.title}
                </div>
                <div
                  style={{
                    color: "#888888",
                    fontWeight: "bold",
                    marginTop: ".5rem",
                    textAlign: "center"
                  }}
                >
                  {proj.tools}
                </div>
              </div>
            ))}
          </div>
          {/* Right Arrow */}
          <button
            onClick={() => scrollProjects("right")}
            style={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
              background: "red",
              border: "none",
              borderRadius: "50%",
              width: "2.2rem",
              height: "2.2rem",
              color: "#fff",
              fontSize: "1.5rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px #0006"
            }}
            aria-label="Scroll right"
          >
            &#8594;
          </button>
        </div>
      </div>

      {/* Skills Section */}
      <div
        id="skills"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          marginTop: "2rem",
          minHeight: "200px"
        }}
      >
        <h2
          style={{
            marginBottom: "1rem",
            fontWeight: "bold",
            fontSize: "2rem",
            color: "#ff3333",
            textAlign: "center"
          }}
        >
          Skills
        </h2>
        <SkillsAccordion categories={skillsByCategory} />
      </div>
    </div>
  );
};

export default Home;


