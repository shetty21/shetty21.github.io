import React from "react";
import { skillsData } from "./skillsData";
import BubbleChart from "./BubbleChart";

const SkillsPage = () => (
  <div style={{ minHeight: "80vh", background: "#181818", padding: "3rem 0" }}>
    <h2 style={{ color: "#ff3333", textAlign: "center", marginBottom: "2rem", fontSize: "2.2rem" }}>
      Skill Set
    </h2>
    <BubbleChart data={skillsData} />
  </div>
);

export default SkillsPage;
