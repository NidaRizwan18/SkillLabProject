export default function Card({ title, action, children, className = "" }) {
  return (
    <section className={`card ${className}`}>
      {(title || action) && (
        <div className="card-head">
          {title && <h2 className="h3">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
