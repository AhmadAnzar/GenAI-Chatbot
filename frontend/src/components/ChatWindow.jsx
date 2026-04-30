import { useEffect, useRef } from "react";
import Message from "./Message.jsx";

export default function ChatWindow({ messages, isTyping }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (messages.length === 0 && !isTyping) return;

    containerRef.current.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: "smooth"
    });
  }, [messages, isTyping]);

  return (
    <div className="chat-window" ref={containerRef}>
      {messages.length === 0 && (
        <div className="chat-empty">
          Ask anything, or try a suggestion to get started.
        </div>
      )}
      {messages.map((msg, index) => (
        <Message key={`${msg.role}-${index}`} role={msg.role} content={msg.content} />
      ))}
      {isTyping && <div className="typing-indicator">Typing...</div>}
    </div>
  );
}
