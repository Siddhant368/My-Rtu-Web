import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "./AIAssistant.css";

function AIAssistant() {
  const { branch, sem } = useParams();
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: `Hi 👋 I'm your AI Assistant for ${branch} Semester ${sem}.
Ask me about notes, exams, syllabus, projects, or placements.`,
    },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

  
    setTimeout(() => {
      const aiMsg = {
        sender: "ai",
        text: `📘 For ${branch} Semester ${sem}, this topic is important for exams.
If you want notes, PYQs or videos, tell me the subject name.`,
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 800);
  };

  return (
    <div className="ai-container">
      <div className="ai-header">
        🤖 AI Assistant — {branch} | Sem {sem}
      </div>

      <div className="ai-chat">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-bubble ${msg.sender}`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="ai-input">
        <input
          type="text"
          placeholder="Ask anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default AIAssistant;
