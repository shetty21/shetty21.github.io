import React from "react";
import '../App.css';



const marqueeText = "Now Streaming : Abhidith Shetty's Career   •   ";

const About = () => (
  <section
    id="home"
    style={{
      position: "relative",
      minHeight: "80vh",
      display: "flex",
      alignItems: "center",
      background: "#111",
      color: "#fff",
      overflow: "hidden",
      padding: "0",
    }}
  >
    {/* Transparent image layer */}
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        pointerEvents: "none",
        opacity: 0.68,
        background: `
          url(${process.env.PUBLIC_URL + '/assets/a.png'}) right center / contain no-repeat
        `,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right center",
        backgroundSize: "contain",
      }}
    />

    {/* Optional: soft gradient overlay for text readability */}
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        pointerEvents: "none",
        background: `
          linear-gradient(
            to left,
            rgba(17, 17, 17, 0) 70%,
            rgba(17, 17, 17, 0.15) 50%,
            rgba(17, 17, 17, 0.25) 30%,
            rgba(17, 17, 17, 0.35) 0%
          )
        `,
      }}
    />

    {/* Content */}
    <div style={{
  flex: 1,
  zIndex: 2,
  padding: "5vw 6vw",
}}>

      <h1 style={{ fontSize: "3rem" , fontWeight: "bold", marginBottom: "0.5rem" }}>
        Abhidith <span style={{ whiteSpace: "nowrap" }}>Shetty</span>
      </h1>
      <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", margin: "1rem 0" }}>
        Data Analyst
      </h2>
      <p style={{ fontSize: "1.15rem", maxWidth: "600px", marginBottom: "2rem" }}>
        Specializing in data analytics, data mining, and data engineering with expertise in Python, SQL, Tableau, and cloud technologies.
      </p>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
 <a
  href="mailto:ab.shetty38@gmail.com"
  target="_blank"
  rel="noopener noreferrer"
  className="icon-btn"
  title="Email"
>
  <span role="img" aria-label="email">✉️</span>
</a>

<a
  href="https://www.linkedin.com/in/abhidith-shetty-a5b341114/"
  target="_blank"
  rel="noopener noreferrer"
  className="icon-btn"
  title="LinkedIn"
>
  <svg width="24" height="24" fill="#0077B5" viewBox="0 0 24 24" aria-label="LinkedIn" style={{verticalAlign: "middle"}}>
    <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.27c-.97 0-1.75-.79-1.75-1.76s.78-1.76 1.75-1.76 1.75.79 1.75 1.76-.78 1.76-1.75 1.76zm13.5 11.27h-3v-5.5c0-1.32-.03-3.02-1.84-3.02-1.84 0-2.12 1.44-2.12 2.92v5.6h-3v-10h2.89v1.36h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.59z"/>
  </svg>
</a>

<a
  href={process.env.PUBLIC_URL + "/assets/resume.pdf"}
  download="AbhidithShetty-Resume.pdf"
  className="icon-btn"
  title="Download Resume"
>
  <svg width="24" height="24" fill="#666" viewBox="0 0 24 24" aria-label="Resume" style={{verticalAlign: "middle"}}>
    <path d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.83a2 2 0 0 0-.59-1.41l-4.83-4.83A2 2 0 0 0 14.17 2H6zm7 1.5V8h4.5L13 3.5zm-5 7.5h8v2h-8v-2zm0 4h8v2h-8v-2z"/>
  </svg>
</a>


      </div>
      {/* Robust, seamless marquee-style red button */}
      <div
        style={{
          background: "red",
          color: "#fff",
          width: "320px",
          height: "2.2rem",
          borderRadius: "8px",
          overflow: "hidden",
          position: "relative",
          boxShadow: "0 2px 8px #0006",
          display: "flex",
          alignItems: "center",
          marginTop: "0.5rem",
          marginBottom: "0.5rem",
          border: "none",
        }}
      >
        <div
          className="marquee-track"
          style={{
            display: "flex",
            width: "fit-content",
            minWidth: "100%",
            height: "100%",
            alignItems: "center",
            whiteSpace: "nowrap",
            animation: "marquee-scroll 4s linear infinite"
          }}
        >
          <span
            style={{
              fontWeight: "bold",
              fontSize: "1.1rem",
              color: "#fff",
              lineHeight: "2.2rem",
              fontFamily: "inherit",
              whiteSpace: "nowrap",
              paddingRight: "2rem"
            }}
          >
            {marqueeText.repeat(4)}
          </span>
          <span
            style={{
              fontWeight: "bold",
              fontSize: "1.1rem",
              color: "#fff",
              lineHeight: "2.2rem",
              fontFamily: "inherit",
              whiteSpace: "nowrap",
              paddingRight: "2rem"
            }}
          >
            {marqueeText.repeat(4)}
          </span>
        </div>
        <style>
          {`
            @keyframes marquee-scroll {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}
        </style>
      </div>
    </div>
  </section>
);



export default About;
