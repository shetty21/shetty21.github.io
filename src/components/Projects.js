import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { projectsData } from "./projectsData";

const CARD_WIDTH = 420;
const CARD_GAP = 140;

const Projects = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div style={{
      background: "#181818",
      minHeight: "100vh",
      color: "#fff",
      padding: "3rem 0",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <h2 style={{
        textAlign: "center",
        fontSize: "2.2rem",
        fontWeight: "bold",
        marginBottom: "2rem",
        color: "#ff3333"
      }}>
        Featured Projects
      </h2>
      <div style={{
        position: "relative",
        width: `${CARD_WIDTH * 2 + CARD_GAP * 2}px`,
        maxWidth: "100vw",
        padding: "2rem 0"
      }}>
        {/* Vertical Line */}
        <div style={{
          position: "absolute",
          left: "50%",
          top: 0,
          bottom: 0,
          width: "4px",
          background: "linear-gradient(to bottom, #ff3333 0%, #222 100%)",
          zIndex: 0,
          transform: "translateX(-50%)"
        }} />
        {/* Timeline Items */}
        {projectsData.map((proj, idx) => {
          const isLeft = idx % 2 === 0;
          const isActive = activeIndex === idx;
          const card = (
            <div
              style={{
                width: `${CARD_WIDTH}px`,
                [isLeft ? "marginRight" : "marginLeft"]: `${CARD_GAP}px`,
                background: "#222",
                borderRadius: "18px",
                boxShadow: isActive ? "0 8px 32px #ff333380" : "0 4px 24px #0008",
                padding: "2rem",
                display: "flex",
                alignItems: "center",
                position: "relative",
                cursor: "pointer",
                transition: "box-shadow 0.3s cubic-bezier(.25,.8,.25,1), transform 0.3s cubic-bezier(.25,.8,.25,1)",
                transform: isActive ? "scale(1.03)" : "scale(1)"
              }}
              onClick={() => navigate(`/projects/${proj.slug}`)}
              title="Click for more details"
              onMouseEnter={() => setActiveIndex(idx)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {/* Image on the left */}
              <div
                style={{
                  flex: "0 0 100px",
                  marginRight: "2rem",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <img
                  src={process.env.PUBLIC_URL + proj.image}
                  alt={proj.title}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "contain",
                    background: "#fff",
                    borderRadius: "14px",
                    boxShadow: "0 2px 12px #0007",
                    padding: "0.5rem",
                    border: isActive ? "3px solid #ff3333" : "3px solid transparent",
                    transform: isActive ? "scale(1.12)" : "scale(1)",
                    transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
                  }}
                />
              </div>
              {/* Details */}
              <div style={{ flex: 1 }}>
                <div style={{
                  fontWeight: "bold",
                  fontSize: "1.3rem",
                  marginBottom: ".3rem",
                  color: "#fff"
                }}>
                  {proj.title}
                </div>
                <div style={{
                  color: "#ff3333",
                  fontWeight: "bold",
                  marginBottom: ".2rem"
                }}>
                  {proj.tools}
                </div>
              </div>
            </div>
          );

          return (
            <div
              key={proj.slug}
              style={{
                display: "flex",
                justifyContent: isLeft ? "flex-start" : "flex-end",
                alignItems: "center",
                position: "relative",
                marginBottom: "4rem",
                width: "100%",
                zIndex: 1
              }}
            >
              {isLeft ? card : null}
              {/* Timeline Dot */}
              <div style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 2
              }}>
                <div style={{
                  width: "18px",
                  height: "18px",
                  background: "#ff3333",
                  border: "3px solid #181818",
                  borderRadius: "50%",
                  boxShadow: "0 0 0 4px #222"
                }} />
              </div>
              {!isLeft ? card : null}
            </div>
          );
        })}
      </div>
      {/* Responsive: Stack cards on mobile */}
      <style>
        {`
        @media (max-width: 1000px) {
          div[style*="position: relative"][style*="padding: 2rem 0"] {
            width: 100vw !important;
            max-width: 100vw !important;
          }
          div[style*="width: 420px"] {
            width: 95vw !important;
            margin: 0 auto 2rem auto !important;
          }
        }
        `}
      </style>
    </div>
  );
};

export default Projects;
