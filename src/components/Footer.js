import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Simple SVG icons for LinkedIn and Email
const LinkedInIcon = () => (
  <svg width="24" height="24" fill="#fff" viewBox="0 0 24 24">
    <rect width="24" height="24" rx="4" fill="#0A66C2"/>
    <path d="M17 17h-2.5v-3.2c0-.76-.27-1.28-.96-1.28-.52 0-.83.35-.97.69-.05.13-.06.31-.06.49V17H11V10h2.4v.96h.03c.33-.51.92-1.23 2.01-1.23 1.47 0 2.56.96 2.56 3.03V17zM7.34 8.48c-.8 0-1.32-.53-1.32-1.2 0-.68.53-1.2 1.34-1.2.81 0 1.32.52 1.33 1.2 0 .67-.52 1.2-1.35 1.2zm-1.25 8.52h2.5V10h-2.5v7z" fill="#fff"/>
  </svg>
);

const EmailIcon = () => (
  <svg width="24" height="24" fill="#fff" viewBox="0 0 24 24">
    <rect width="24" height="24" rx="4" fill="#EA4335"/>
    <path d="M20 8.5V17a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8.5l8 5 8-5zm-8 3.5L4 7h16l-8 5z" fill="#fff"/>
  </svg>
);

const footerLinkStyle = {
  color: "#fff",
  textDecoration: "none",
  transition: "color 0.2s",
  fontSize: "1rem"
};

const iconFooterBtnStyle = {
  display: "flex",
  alignItems: "center",
  color: "#fff",
  textDecoration: "none",
  fontWeight: "500",
  fontSize: "1rem",
  gap: "0.3rem"
};

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Handles smooth scroll to section, even from other pages
  const handleFooterLink = (sectionId) => (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: sectionId } });
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer style={{
      background: "#181818",
      color: "#fff",
      padding: "2rem 0 0.5rem 0",
      fontSize: "1rem",
      marginTop: "3rem",
      borderTop: "2px solid #333",
      position: "relative"
    }}>
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "flex-start",
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "0 2rem"
      }}>
        {/* Left Section */}
        <div style={{ minWidth: 220, marginBottom: "1.5rem" }}>
          <div style={{ fontWeight: "bold", fontSize: "1.18rem", marginBottom: ".4rem" }}>Abhidith Shetty</div>
          <div>Data Analyst</div>
          <div style={{ margin: ".3rem 0" }}>New York, NY</div>
          <a href="mailto:ab.shetty38@gmail.com" style={{ color: "#fff", textDecoration: "none" }}>
            ab.shetty38@gmail.com
          </a>
        </div>
        {/* Middle Section */}
        <div style={{ minWidth: 160, marginBottom: "1.5rem" }}>
          <div style={{ fontWeight: "bold", fontSize: "1.1rem", marginBottom: ".4rem" }}>Quick Links</div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, lineHeight: "1.7" }}>
            <li> <a
      href="#career"
      style={footerLinkStyle}
      onClick={handleFooterLink("career")}
    >
      About
    </a></li>
            <li><a href="#education" style={footerLinkStyle} onClick={handleFooterLink("education")}>Education</a></li>
            <li><a href="#experience" style={footerLinkStyle} onClick={handleFooterLink("experience")}>Experience</a></li>
            <li><a href="#projects" style={footerLinkStyle} onClick={handleFooterLink("projects")}>Projects</a></li>
            <li><a href="#skills" style={footerLinkStyle} onClick={handleFooterLink("skills")}>Skills</a></li>
          </ul>
        </div>
        {/* Right Section */}
        <div style={{ minWidth: 160, marginBottom: "1.5rem" }}>
          <div style={{ fontWeight: "bold", fontSize: "1.1rem", marginBottom: ".4rem" }}>Connect</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
            <a href="https://www.linkedin.com/in/abhidith-shetty-a5b341114/" target="_blank" rel="noopener noreferrer" style={iconFooterBtnStyle}>
              <LinkedInIcon /> <span style={{ marginLeft: 8 }}>LinkedIn</span>
            </a>
            <a href="mailto:ab.shetty38@gmail.com" style={iconFooterBtnStyle}>
              <EmailIcon /> <span style={{ marginLeft: 8 }}>Email</span>
            </a>
          </div>
        </div>
      </div>
      {/* Bottom copyright */}
      <div style={{
        borderTop: "1px solid #333",
        marginTop: "1rem",
        textAlign: "center",
        fontSize: "0.95rem",
        padding: "0.7rem 0 0.2rem 0",
        color: "#aaa"
      }}>
        © 2025 Abhidith Shetty. All rights reserved.
      </div>

      <style>
{`
  

    footer div[style*="minWidth: 220"] {
      margin-bottom: 2rem !important;
    }

    footer a {
      justify-content: center !important;
    }
  
`}
</style>

    </footer>
  );
};

export default Footer;
