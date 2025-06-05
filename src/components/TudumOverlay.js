// TudumOverlay.js
import React, { useEffect } from "react";

const TudumOverlay = ({ onFinish }) => {
  useEffect(() => {
    // Play sound
    const audio = new Audio("/assets/tudum.mp3");
    audio.play();

    // Remove overlay after 1.5s
    const timeout = setTimeout(() => {
      onFinish();
    }, 1500);

    return () => clearTimeout(timeout);
  }, [onFinish]);

  return (
    <div style={{
      position: "fixed",
      zIndex: 9999,
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.98)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      animation: "fadeIn 0.2s"
    }}>
      <style>
        {`
        @keyframes tudumScale {
          0% { opacity: 0; transform: scale(0.6);}
          60% { opacity: 1; transform: scale(1.15);}
          80% { opacity: 1; transform: scale(0.95);}
          100% { opacity: 1; transform: scale(1);}
        }
        `}
      </style>
      <div style={{
        color: "red",
        fontWeight: "bold",
        fontSize: "8rem",
        fontStyle: "italic",
        letterSpacing: "0.1em",
        textShadow: "0 0 40px #ff3333, 0 0 120px #ff333388",
        animation: "tudumScale 1.2s cubic-bezier(.22,1.08,.62,1) forwards"
      }}>
        AS
      </div>
    </div>
  );
};

export default TudumOverlay;
