export default function Message({ role, content }) {
  const messageClass = role === "user" ? "message message-user" : "message";

  return (
    <div className={messageClass}>
      <div className="message-bubble">{content}</div>
    </div>
  );
}
