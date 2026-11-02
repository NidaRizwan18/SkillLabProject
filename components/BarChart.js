// Tiny dependency-free bar chart. `data` = [{ label, value }]
export default function BarChart({ data, goal, unit = "" }) {
  const max = Math.max(...data.map((d) => d.value), goal || 0, 1);
  return (
    <div className="bars" role="img" aria-label="Bar chart">
      {data.map((d) => (
        <div className="bar-col" key={d.label}>
          <span className="small">{d.value ? d.value.toLocaleString() : "–"}</span>
          <div className="bar-wrap">
            <div
              className={`bar ${goal && d.value >= goal ? "bar-hit" : ""}`}
              style={{ height: `${(d.value / max) * 100}%` }}
              title={`${d.value} ${unit}`}
            />
          </div>
          <span className="small muted">{d.label}</span>
        </div>
      ))}
    </div>
  );
}
