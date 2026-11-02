export default function EmptyState({ title, text, action }) {
  return (
    <div className="empty">
      <p className="h3">{title}</p>
      <p className="muted">{text}</p>
      {action}
    </div>
  );
}
