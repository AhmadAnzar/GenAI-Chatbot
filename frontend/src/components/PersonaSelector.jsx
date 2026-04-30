export default function PersonaSelector({ personas, activeId, onSelect }) {
  return (
    <div className="persona-list">
      {personas.map((persona) => (
        <button
          key={persona.id}
          type="button"
          className={
            persona.id === activeId
              ? "persona-row persona-row-active"
              : "persona-row"
          }
          onClick={() => onSelect(persona.id)}
        >
          <img
            className="persona-row-avatar"
            src={persona.image}
            alt={`${persona.label} avatar`}
            loading="lazy"
          />
          <div className="persona-row-text">
            <div className="persona-row-top">
              <h3>{persona.label}</h3>
            </div>
            <p>{persona.title}</p>
          </div>
          <span className="persona-row-name">{persona.label}</span>
        </button>
      ))}
    </div>
  );
}
