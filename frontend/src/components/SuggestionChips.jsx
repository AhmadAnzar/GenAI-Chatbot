export default function SuggestionChips({ suggestions, onSelect, disabled }) {
  return (
    <div className="suggestion-chips">
      {suggestions.map((text) => (
        <button
          key={text}
          type="button"
          className="chip"
          onClick={() => onSelect(text)}
          disabled={disabled}
        >
          {text}
        </button>
      ))}
    </div>
  );
}
