import React, { useState } from "react";
import axios from "axios";

function AIChatbot() {

  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [open, setOpen] = useState(false);

  const sendMessage = async () => {

    if (!message) return;

    try {

      const res = await axios.post(
        "https://my-rtu-web.onrender.com/api/ai/chat",
        {
          message,
        }
      );

      setReply(res.data.reply);

    } catch (err) {
      console.log(err);
      alert("AI Error");
    }
  };

  return (
    <div>

      {/* FLOATING BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          border: "none",
          background: "#2563eb",
          color: "white",
          fontSize: "24px",
          cursor: "pointer",
          zIndex: 1000,
        }}
      >
        🤖
      </button>

      {/* CHATBOX */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "320px",
            background: "white",
            borderRadius: "12px",
            padding: "15px",
            boxShadow: "0 0 15px rgba(0,0,0,0.2)",
            zIndex: 1000,
          }}
        >
          <h3>RTU AI Assistant</h3>

          <textarea
            rows="4"
            placeholder="Ask anything..."
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            style={{
              width: "100%",
              padding: "10px",
            }}
          />

          <button
            onClick={sendMessage}
            style={{
              marginTop: "10px",
              width: "100%",
              padding: "10px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "8px",
            }}
          >
            Send
          </button>

          {reply && (
            <div
              style={{
                marginTop: "15px",
                background: "#f5f5f5",
                padding: "10px",
                borderRadius: "8px",
                maxHeight: "200px",
                overflowY: "auto",
              }}
            >
              <strong>AI:</strong>
              <p>{reply}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AIChatbot;