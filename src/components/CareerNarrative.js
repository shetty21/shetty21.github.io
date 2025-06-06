import React from "react";

const CareerNarrative = () => (
  <section
    id = "career"
    style={{
     maxWidth: "90vw",
  margin: "6vw auto",
  padding: "0 4vw",
  fontSize: "1rem",
  textAlign: "center"           // Center all text
    }}
  >
    <h2 style={{ color: "#ff3333", fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}>
      Transforming Data Into Decisions, One Insight at a Time
    </h2>
    <p style={{ fontSize: "1.2rem", marginBottom: "1.2rem" }}>
      I'm <b>Abhidith Shetty</b>—a data analytics specialist who turns raw numbers into real-world impact.
    </p>
    <p style={{ marginBottom: "1.2rem" }}>
      I don’t just analyze data.<br />
      I architect solutions—building analytical ecosystems where information flows seamlessly, decisions accelerate, and organizations discover their competitive edge.
    </p>
    <div style={{ marginBottom: "1.2rem" }}>
      <b>What I bring:</b>
      <ul style={{ margin: ".7rem 0 .7rem 1.4rem", textAlign: "left", display: "inline-block" }}>
        <li>End-to-end data pipelines, from web scraping and data engineering to dashboard design and insight delivery.</li>
        <li>Predictive analytics and machine learning models that drive measurable business improvements.</li>
        <li>Cloud and BI tools that scale with ambition, from SQL and Python to Tableau, Power BI, and QuickBase.</li>
        <li>A proven record of automating workflows, optimizing reporting, and unlocking hidden value for teams across higher education, technology, and energy.</li>
      </ul>
    </div>
    <p style={{ marginBottom: "1.2rem" }}>
      Whether streamlining university tech research, mapping the future of solar, or making sense of millions of transactions, I engineer clarity from complexity—so that the right insight is always within reach.
    </p>
    <div style={{ marginBottom: "1.2rem" }}>
      <b>Stack of Choice:</b> Python | SQL | Tableau | Power BI | QuickBase | Excel VBA | Google Analytics | Domo | Google Sheets | Salesforce | Metabase | AWS | DBMS
    </div>

    <p style={{ fontWeight: "bold", marginBottom: ".5rem" }}>
      Engineer. Analyst. Problem-Solver.
    </p>
    <p style={{ fontStyle: "italic" }}>
      Because great analytics don’t just answer questions—they shape what’s possible.<br />
      <span style={{ color: "#ff3333" }}>Have a challenge that needs clarity? Let’s build your next breakthrough together.</span>
    </p>
  </section>
);

export default CareerNarrative;
