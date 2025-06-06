import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { experienceData } from "./experienceData";

const ExperienceDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const exp = experienceData.find(e => e.slug === slug);

  if (!exp) {
    return <div style={{ color: "#fff", padding: "2rem" }}>Experience not found.</div>;
  }

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
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: "2rem",
          background: "#ff3333",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          padding: "0.6rem 1.2rem",
          cursor: "pointer"
        }}
      >
        ← Back
      </button>
      {/* Flex container for image and details */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          background: "#222",
          borderRadius: "20px",
          boxShadow: "0 4px 24px #0008",
          padding: "2.5rem",
          maxWidth: "900px",
          width: "95vw",
          gap: "2.5rem",
        }}
      >
        {/* Company Logo on the left */}
        <div style={{
          flex: "0 0 240px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <img
            src={process.env.PUBLIC_URL + exp.image}
            alt={exp.company}
            style={{
              width: "220px",
              height: "220px",
              objectFit: "contain",
              background: "#fff",
              borderRadius: "16px",
              boxShadow: "0 2px 12px #0008",
              padding: "1.5rem",
              display: "block"
            }}
          />
        </div>
        {/* Details on the right */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "0.7rem" }}>{exp.company}</h2>
          <div style={{ color: "#aaa", marginBottom: ".4rem" }}>{exp.location}</div>
          <div style={{ fontWeight: "bold", fontSize: "1.2rem", marginBottom: ".2rem" }}>{exp.role}</div>
          <div style={{ color: "#ccc", marginBottom: ".7rem" }}>{exp.dates}</div>
          <ul style={{ paddingLeft: "1.2em", marginTop: "1.2rem" }}>
            {exp.details.map((item, idx) => (
              <li key={idx} style={{ marginBottom: "1rem", lineHeight: "1.6" }}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Responsive styling */}
      <style>
        {`
          @media (max-width: 900px) {
            div[style*="display: flex"][style*="flex-direction: row"] {
              flex-direction: column !important;
              align-items: center !important;
              padding: 1.2rem !important;
              gap: 1.2rem !important;
            }
            div[style*="flex: 0 0 240px"] {
              width: 100% !important;
              justify-content: center !important;
            }
            img[alt] {
              width: 140px !important;
              height: 140px !important;
              padding: 0.7rem !important;
            }
          }


        `}
      </style>
    </div>
  );
};

export default ExperienceDetail;
