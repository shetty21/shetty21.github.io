// In your Skills section/component
import React from "react";
import { skillsData } from "./skillsData";
import BubbleChart from "./BubbleChart";

const SkillsSection = () => (
  <div id="skills" style={{ margin: "2rem 0" }}>
    <h2 style={{ color: "#ff3333", textAlign: "center", marginBottom: "1.5rem" }}>Skill Set</h2>
    <BubbleChart data={skillsData} />
  </div>
);

export default SkillsSection;
