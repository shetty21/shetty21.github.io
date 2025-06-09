import React, { useState, useRef } from "react";

// Streaming helper (same as before)
async function streamBotReply(message, onChunk) {
  const res = await fetch("https://shetty21-github-io.vercel.app/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  const reader = res.body.getReader();
  let text = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = new TextDecoder().decode(value);
    text += chunk;
    onChunk(text);
  }
}

// SVG robot icon (simple, customizable)
const RobotIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <circle cx="32" cy="32" r="30" fill="#1a1a1a" stroke="#d32f2f" strokeWidth="4"/>
    <rect x="18" y="24" width="28" height="20" rx="10" fill="#d32f2f"/>
    <circle cx="26" cy="34" r="3" fill="#fff"/>
    <circle cx="38" cy="34" r="3" fill="#fff"/>
    <rect x="28" y="40" width="8" height="4" rx="2" fill="#fff"/>
    <rect x="30" y="14" width="4" height="10" rx="2" fill="#d32f2f"/>
  </svg>
);

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [botTyping, setBotTyping] = useState(false);
  const bottomRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");
    setBotTyping(true);
    let currentBotText = "";
    setMessages((prev) => [...prev, { sender: "bot", text: "" }]);
    const msgIndex = messages.length + 1;

    await streamBotReply(input, (chunk) => {
      currentBotText = chunk;
      setMessages((prev) =>
        prev.map((msg, i) =>
          i === msgIndex ? { ...msg, text: currentBotText } : msg
        )
      );
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 0);
    });
    setBotTyping(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  // Clear chat handler
  const handleClearChat = () => {
    setMessages([]);
    setInput("");
  };

  // Widget button style
  const widgetButtonStyle = {
    position: "fixed",
    bottom: 24,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: "50%",
    background: "#d32f2f",
    color: "#fff",
    border: "none",
    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
    cursor: "pointer",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
  };

  // Chat box style
  const chatBoxStyle = {
    position: "fixed",
    bottom: 90,
    right: 24,
    width: 350,
    maxHeight: 500,
    background: "#1a1a1a",
    color: "#fff",
    borderRadius: 16,
    boxShadow: "0 2px 16px rgba(211,47,47,0.5)",
    padding: 0,
    zIndex: 1000,
    display: "flex",
    flexDirection: "column",
    border: "2px solid #d32f2f",
    overflow: "hidden",
  };

  return (
    <>
      {!open && (
        <button
          style={widgetButtonStyle}
          onClick={() => setOpen(true)}
          aria-label="Open chatbot"
        >
          <RobotIcon size={36} />
        </button>
      )}
      {open && (
        <div style={chatBoxStyle}>
          <div style={{
            display: "flex",
            alignItems: "center",
            background: "#d32f2f",
            color: "#fff",
            padding: "12px 16px",
            borderBottom: "1px solid #b71c1c",
          }}>
            <RobotIcon size={28} />
            <span style={{ fontWeight: "bold", fontSize: 14, marginLeft: 8, flex: 1 }}>
              Abhidith's Assistant
            </span>
            <button
              onClick={handleClearChat}
              style={{
                background: "#fff",
                color: "#d32f2f",
                border: "none",
                borderRadius: 8,
                fontWeight: "bold",
                fontSize: 13,
                padding: "4px 10px",
                marginRight: 8,
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              aria-label="Clear chat"
              title="Start new chat"
            >
              New Chat
            </button>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "none",
                border: "none",
                color: "#fff",
                fontSize: 22,
                cursor: "pointer",
                marginLeft: 2,
              }}
              aria-label="Close chatbot"
            >
              ×
            </button>
          </div>
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              background: "#181818",
              padding: 12,
              minHeight: 200,
              maxHeight: 300,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: msg.sender === "user" ? "row-reverse" : "row",
                  alignItems: "flex-end",
                  gap: 8,
                }}
              >
                {msg.sender === "bot" && <RobotIcon size={22} />}
                <div
                  style={{
                    background: msg.sender === "user" ? "#d32f2f" : "#232323",
                    color: "#fff",
                    borderRadius: 18,
                    padding: "10px 14px",
                    maxWidth: "72%",
                    fontSize: 15,
                    boxShadow: msg.sender === "user"
                      ? "0 2px 8px rgba(211,47,47,0.2)"
                      : "0 2px 8px rgba(0,0,0,0.2)",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
          <div style={{
            display: "flex",
            background: "#232323",
            padding: 10,
            borderTop: "1px solid #d32f2f",
          }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{
                flex: 1,
                borderRadius: 8,
                border: "none",
                padding: 10,
                fontSize: 15,
                background: "#181818",
                color: "#fff",
                outline: "none",
                marginRight: 8,
              }}
              placeholder="Type your message..."
              disabled={botTyping}
            />
            <button
              onClick={sendMessage}
              disabled={botTyping}
              style={{
                background: "#d32f2f",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "8px 18px",
                fontSize: 15,
                cursor: botTyping ? "not-allowed" : "pointer",
                fontWeight: "bold",
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
