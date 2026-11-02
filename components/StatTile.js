export default function StatTile({ icon, label, value, unit, hint }) {
  return (
    <div className="card stat">
      <div className="stat-icon" aria-hidden="true">{icon}</div>
      <p className="small muted">{label}</p>
      <p className="stat-value">
        {value} <span className="small muted">{unit}</span>
      </p>
      {hint && <p className="small">{hint}</p>}
    </div>
  );
}
