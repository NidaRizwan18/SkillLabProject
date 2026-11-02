"use client";

import { useState } from "react";
import Protected from "@/components/Protected";
import Card from "@/components/Card";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Badge from "@/components/Badge";
import EmptyState from "@/components/EmptyState";
import { useHealth } from "@/context/HealthContext";
import { METRICS } from "@/data/dummy";

const typeOptions = Object.entries(METRICS).map(([value, m]) => ({ value, label: `${m.icon} ${m.label}` }));
const filterOptions = [{ value: "all", label: "All types" }, ...typeOptions];

function dayLabel(d) {
  return d === 0 ? "Today" : d === 1 ? "Yesterday" : `${d} days ago`;
}

export default function LogPage() {
  return (
    <Protected>
      <Log />
    </Protected>
  );
}

function Log() {
  const { logs, addLog, removeLog } = useHealth();
  const [type, setType] = useState("steps");
  const [value, setValue] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  function handleSubmit(e) {
    e.preventDefault();
    const m = METRICS[type];
    const n = Number(value);
    if (!value || Number.isNaN(n) || n < m.min || n > m.max) {
      setError(`Enter a value between ${m.min} and ${m.max} ${m.unit}.`);
      return;
    }
    addLog({ type, value: n, note });
    setValue("");
    setNote("");
    setError("");
  }

  const shown = logs.filter((l) => filter === "all" || l.type === filter).slice(0, 30);

  return (
    <>
      <h1 className="h1">Quick log</h1>
      <div className="grid-2">
        <Card title="New check-in">
          <form onSubmit={handleSubmit} noValidate>
            <Input id="type" label="What are you logging?" options={typeOptions} value={type} onChange={(e) => { setType(e.target.value); setError(""); }} />
            <Input id="value" label={`Value (${METRICS[type].unit})`} type="number" step="any" value={value} onChange={(e) => setValue(e.target.value)} error={error} />
            <Input id="note" label="Note (optional)" value={note} onChange={(e) => setNote(e.target.value)} placeholder="e.g. after dinner" />
            <Button type="submit">Save entry</Button>
          </form>
        </Card>

        <Card
          title="History"
          action={<Input id="filter" label="" options={filterOptions} value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Filter by type" />}
        >
          {shown.length === 0 ? (
            <EmptyState title="No entries" text="Nothing logged for this type yet." />
          ) : (
            <ul className="list">
              {shown.map((l) => (
                <li key={l.id}>
                  <span>
                    {METRICS[l.type].icon} <strong>{l.value.toLocaleString()}</strong> {METRICS[l.type].unit}
                    {l.note && <span className="muted small"> · {l.note}</span>}
                  </span>
                  <span className="row-tight">
                    <Badge>{dayLabel(l.day)}</Badge>
                    <button className="link-btn" onClick={() => removeLog(l.id)} aria-label="Delete entry">✕</button>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </>
  );
}
