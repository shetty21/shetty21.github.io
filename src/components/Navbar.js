import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TudumOverlay from "./TudumOverlay";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showTudum, setShowTudum] = useState(false);

  // Always show Tudum effect for AS logo
  const handleASClick = (e) => {
    e.preventDefault();
    setShowTudum(true);
  };

  // Home link: Tudum if not on home, else scroll
  const handleHomeClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      // Already on home, just scroll
      window.dispatchEvent(new Event("scrollToCareer"));
    } else {
      setShowTudum(true);
    }
  };

  const handleTudumFinish = () => {
    setShowTudum(false);
    navigate("/");
    // NO scroll to CareerNarrative here!
  };

  return (
    <>
      {showTudum && <TudumOverlay onFinish={handleTudumFinish} />}
      <nav style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: "linear-gradient(90deg, #111 70%, #222 100%)",
        padding: "1.2rem 3vw", position: "sticky", top: 0, zIndex: 100
      }}>
        <div
          style={{ color: "red", fontWeight: "bold", fontSize: "2rem", fontStyle: "italic", cursor: "pointer" }}
          onClick={handleASClick}
          title="Go Home"
        >
          AS
        </div>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          <Link to="/" onClick={handleHomeClick} style={navLinkStyle(location.pathname === "/")}>Home</Link>
          <Link to="/education" style={navLinkStyle(location.pathname === "/education")}>Education</Link>
          <Link to="/experience" style={navLinkStyle(location.pathname === "/experience")}>Experience</Link>
          <Link to="/projects" style={navLinkStyle(location.pathname === "/projects")}>Projects</Link>
          <Link to="/skills" style={navLinkStyle(location.pathname === "/skills")}>Skills</Link>
        </div>
      </nav>
    </>
  );
};

const navLinkStyle = (active) => ({
  color: active ? "red" : "#fff",
  textDecoration: "none",
  fontWeight: "bold",
  fontSize: "1.1rem",
  borderBottom: active ? "2px solid red" : "none",
  paddingBottom: "2px"
});

export default Navbar;
