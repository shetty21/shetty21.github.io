import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Education from "./components/Education";
import EducationDetail from "./components/EducationDetail";
import Experience from "./components/Experience";
import ExperienceDetail from "./components/ExperienceDetail";
import Projects from "./components/Projects"; // <-- Import Projects page
import Footer from './components/Footer';
import ProjectDetail from "./components/ProjectDetail";
import SkillsPage from "./components/SkillsPage";


function App() {
  return (
    <Router>
      <div style={{ background: "#111", minHeight: "100vh" }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/education" element={<Education />} />
          <Route path="/education/:slug" element={<EducationDetail />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/experience/:slug" element={<ExperienceDetail />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/skills" element={<SkillsPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

