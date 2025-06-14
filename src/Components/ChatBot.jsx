import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../StylingAndLayout/ChatBot.css";
import VoiceRecorder from "./VoiceRecorder.jsx";

export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    try {
      const res = await axios.post("http://localhost:5000/chatbot/ask", {
        text: "Hello"
      }, {
        headers: { "Content-Type": "application/json" },
      });
      setMessages([...messages, { user: input, bot: res.data.reply }]);
      setInput("");
      console.log("✅ Text sent");
    } catch (err) {
      console.error("❌ Chat error:", err);

      let errorMsg = "⚠️ Something went wrong. Please try again.";

      if (err.response) {
        if (err.response.status === 400) {
          errorMsg = err.response.data.error || "❗ Bad request. Please check your input.";
        } else if (err.response.status === 500) {
          errorMsg = "💥 Server error. Please try again later.";
        }
      }

      setMessages([...messages, { user: input, bot: errorMsg }]);
      setInput("");
    }
  };
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [input]);

  const handleRecordingComplete = async (audioBlob) => {
    // const formData = new FormData();
    // formData.append("audio", audioBlob, "recording.webm");

    // const res = await axios.post("http://localhost:5000/voice", formData);
    // const { transcript, reply } = res.data;

    // setMessages([...messages, {
    //   user: `[🎤] ${transcript}`,
    //   bot: reply
    // }]);
    console.log("Audio received");
  };

  return (
    <div className="chat-box">
      <div className="messages-area">
        {messages.map((m, i) => (
          <div key={i} className="message-pair">
            <div className="user-msg"><strong>You:</strong> {m.user}</div>
            <div className="bot-msg"><strong>Bot:</strong> {m.bot}</div>
          </div>
        ))}
        <div ref={bottomRef}></div>
      </div>

      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your thoughts..."
        />
        <button onClick={sendMessage}>Send</button>
        <VoiceRecorder onRecordingComplete={handleRecordingComplete} />
      </div>
    </div>
  );
}
