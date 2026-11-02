// Works as a text input, or as a dropdown when `options` is passed.
export default function Input({ label, id, error, options, ...rest }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {options ? (
        <select id={id} {...rest}>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      ) : (
        <input id={id} {...rest} />
      )}
      {error && <p className="error-text">{error}</p>}
    </div>
  );
}
