import { useMemo, useState } from "react";
import PersonaSelector from "./components/PersonaSelector.jsx";
import ChatWindow from "./components/ChatWindow.jsx";
import SuggestionChips from "./components/SuggestionChips.jsx";
import anshumanImg from "./assets/personas/anshumansir.jpg";
import kshitijImg from "./assets/personas/kshitijsir.jpg";
import abhimanyuImg from "./assets/personas/abhimanyusir.jpg";

const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
const API_URL = `${API_BASE.replace(/\/$/, "")}/api/chat`;

const PERSONAS = {
  anshuman: {
    label: "Anshuman",
    image: anshumanImg,
    title: "Clarity-first mentor",
    tagline: "Clarity, invariants, and sharp DSA plans",
    badge: "First-principles coach",
    suggestions: [
      "How do I stay consistent?",
      "Should I learn Python or Java?",
      "How can I build better habits?"
    ]
  },
  kshitij: {
    label: "Kshitij",
    image: kshitijImg,
    title: "Pattern-driven guide",
    tagline: "Patterns, state definition, and pinpointed corrections",
    badge: "Systematic mentor",
    suggestions: [
      "How do I stay focused during exams?",
      "Give me a 7-day study plan.",
      "How can I reduce procrastination?"
    ]
  },
  abhimanyu: {
    label: "Abhimanyu",
    image: abhimanyuImg,
    title: "Structure and delivery",
    tagline: "Structured answers, pressure handling, and system design",
    badge: "Interview coach",
    suggestions: [
      "How do I prepare for interviews?",
      "What are good project ideas?",
      "How should I structure my resume?"
    ]
  }
};

export default function App() {
  const [personaId, setPersonaId] = useState("anshuman");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState("");

  const personaList = useMemo(
    () =>
      Object.entries(PERSONAS).map(([id, data]) => ({
        id,
        label: data.label,
        image: data.image,
        title: data.title,
        tagline: data.tagline
      })),
    []
  );

  const activePersona = PERSONAS[personaId];
  const suggestions = PERSONAS[personaId].suggestions;

  const handlePersonaChange = (nextPersona) => {
    if (nextPersona === personaId) return;
    setPersonaId(nextPersona);
    setMessages([]);
    setInput("");
    setIsTyping(false);
    setError("");
  };

  const sendMessage = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    setError("");
    const userMessage = { role: "user", content: trimmed };
    const chatHistory = messages.map((msg) => ({
      role: msg.role,
      content: msg.content
    }));

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          persona_id: personaId,
          message: trimmed,
          chat_history: chatHistory
        })
      });

      if (!response.ok) {
        throw new Error("Bad response");
      }

      const data = await response.json();
      const replyText = data?.reply ?? "";

      setMessages((prev) => [...prev, { role: "assistant", content: replyText }]);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="wa-shell">
      <aside className="wa-sidebar">
        <div className="wa-sidebar-header">
          <div className="wa-user-pill">
            <div className="wa-user-avatar">AI</div>
            <div>
              <p className="wa-user-label">Persona AI</p>
              <p className="wa-user-sub">Select a mentor</p>
            </div>
          </div>
        </div>

        <PersonaSelector
          personas={personaList}
          activeId={personaId}
          onSelect={handlePersonaChange}
        />
      </aside>

      <section className="wa-chat">
        <div className="wa-chat-header">
          <div className="wa-chat-contact">
            <img
              className="wa-chat-avatar"
              src={activePersona.image}
              alt={`${activePersona.label} avatar`}
            />
            <div>
              <h2>{activePersona.label}</h2>
              <p className="chat-subtitle">{activePersona.tagline}</p>
            </div>
          </div>
          <span className="chat-badge">{activePersona.badge}</span>
        </div>

        <SuggestionChips
          suggestions={suggestions}
          onSelect={sendMessage}
          disabled={isTyping}
        />
        <ChatWindow messages={messages} isTyping={isTyping} />

        <form className="chat-input" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type a message"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            disabled={isTyping}
          />
          <button type="submit" disabled={isTyping || !input.trim()}>
            Send
          </button>
        </form>
        {error && <div className="error-text">{error}</div>}
      </section>
    </div>
  );
}
