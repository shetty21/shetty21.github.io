// src/components/ChatBot.js
import React, { useState } from "react";
import axios from "axios";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm Abhidith's AI assistant. Ask me anything!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setLoading(true);

    try {
const res = await axios.post(
  "https://api.openai.com/v1/chat/completions",
  {
    model: "gpt-3.5-turbo",
    messages: newMessages,
  },
  {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
    },
  }
);



      const reply = res.data.choices[0].message.content;
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch (error) {
  console.error("OpenAI API error:", error.response ? error.response.data : error.message);
  setMessages([...newMessages, { role: "assistant", content: "Something went wrong. Try again later." }]);
}


    setLoading(false);
    setInput("");
  };

  return (
    <div style={chatContainer}>
      <div style={chatBox}>
        {messages.map((msg, i) => (
          <div key={i} style={{ color: msg.role === "user" ? "#fff" : "#0f0", marginBottom: "0.5rem" }}>
            <b>{msg.role === "user" ? "You" : "AI"}:</b> {msg.content}
          </div>
        ))}
        {loading && <div style={{ color: "#888" }}>AI is thinking...</div>}
      </div>
      <div style={{ display: "flex", marginTop: "0.5rem" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask me anything..."
          style={{ flex: 1, padding: "0.5rem" }}
        />
        <button onClick={sendMessage} style={{ marginLeft: "0.5rem", padding: "0.5rem" }}>Send</button>
      </div>
    </div>
  );
};

const chatContainer = {
  position: "fixed",
  bottom: "1.5rem",
  right: "1.5rem",
  background: "#222",
  color: "#fff",
  padding: "1rem",
  width: "320px",
  borderRadius: "10px",
  zIndex: 1000
};

const chatBox = {
  maxHeight: "300px",
  overflowY: "auto",
  fontSize: "0.95rem"
};

export default ChatBot;
