import React, { useRef, useState } from "react";

const barColor = "#ff3333";
const bgColor = "#222";
const hoverBg = "#292929"; // Slightly lighter for hover

const SkillsHorizontalCards = ({ categories }) => {
  const scrollRef = useRef();
  const [openIdx, setOpenIdx] = useState(null);
  const [hoverIdx, setHoverIdx] = useState(null);

  const scrollSkills = (direction) => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollAmount = 350;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth"
    });
  };

  return (
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
        onClick={() => scrollSkills("left")}
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

      {/* Scrollable Cards */}
      <div
        ref={scrollRef}
        style={{
          display: "flex",
          overflowX: "auto",
          gap: "2rem",
          padding: "2rem 0",
          scrollbarWidth: "thin",
          scrollBehavior: "smooth"
        }}
      >
        {categories.map((cat, idx) => (
          <div
            key={cat.category}
            style={{
              minWidth: 320,
              background:
                openIdx === idx
                  ? "#191919"
                  : hoverIdx === idx
                  ? hoverBg
                  : bgColor,
              borderRadius: 14,
              boxShadow:
                openIdx === idx
                  ? "0 4px 24px #1119"
                  : hoverIdx === idx
                  ? "0 8px 32px #ff333355, 0 0 0 3px #ff333344"
                  : "0 2px 8px #1116",
              border:
                openIdx === idx
                  ? `2px solid ${barColor}`
                  : hoverIdx === idx
                  ? `2px solid #ff6666`
                  : "2px solid #333",
              cursor: "pointer",
              transition: "box-shadow 0.3s, border 0.3s, transform 0.2s, background 0.2s",
              overflow: "hidden",
              flexShrink: 0,
              transform: hoverIdx === idx ? "scale(1.05)" : "scale(1)"
            }}
            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            onMouseEnter={() => setHoverIdx(idx)}
            onMouseLeave={() => setHoverIdx(null)}
            tabIndex={0}
            aria-expanded={openIdx === idx}
          >
            <div
              style={{
                padding: "1.2rem 1.5rem",
                fontWeight: "bold",
                fontSize: "1.15rem",
                color: openIdx === idx ? barColor : "#fff",
                background: openIdx === idx ? "#191919" : "none",
                letterSpacing: ".5px"
              }}
            >
              {cat.category}
              <span style={{ float: "right", fontSize: "1.3rem" }}>
                {openIdx === idx ? "▲" : "▼"}
              </span>
            </div>
            {openIdx === idx && (
              <div style={{ padding: "1.2rem 1.5rem", background: "#181818" }}>
                {cat.skills
                  .slice()
                  .sort((a, b) => b.value - a.value)
                  .map((skill) => (
                    <div
                      key={skill.name}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: 9
                      }}
                    >
                      <span
                        style={{
                          width: 120,
                          color: "#fff",
                          fontSize: ".98rem"
                        }}
                      >
                        {skill.name}
                      </span>
                      <div
                        style={{
                          background: "#333",
                          borderRadius: 7,
                          height: 16,
                          width: 120,
                          marginRight: 10,
                          overflow: "hidden",
                          position: "relative"
                        }}
                      >
                        <div
                          style={{
                            width: `${skill.value}%`,
                            height: "100%",
                            background: barColor,
                            opacity: 0.8,
                            transition: "width 0.5s"
                          }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => scrollSkills("right")}
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
  );
};

export default SkillsHorizontalCards;
