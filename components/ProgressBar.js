export default function ProgressBar({ label, value, max, unit = "" }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="progress">
      <div className="progress-top">
        <span>{label}</span>
        <span className="muted">
          {value.toLocaleString()} / {max.toLocaleString()} {unit}
        </span>
      </div>
      <div className="progress-track" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
