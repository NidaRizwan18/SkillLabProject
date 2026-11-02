"use client";

import Protected from "@/components/Protected";
import Card from "@/components/Card";
import StatTile from "@/components/StatTile";
import ProgressBar from "@/components/ProgressBar";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import EmptyState from "@/components/EmptyState";
import { useAuth } from "@/context/AuthContext";
import { useHealth } from "@/context/HealthContext";
import { METRICS } from "@/data/dummy";
import { nextAction } from "@/data/coach";

function glucoseTone(v) {
  if (!v) return "neutral";
  if (v < 100) return "success";
  if (v < 126) return "warning";
  return "error";
}

export default function DashboardPage() {
  return (
    <Protected>
      <Dashboard />
    </Protected>
  );
}

function Dashboard() {
  const { user } = useAuth();
  const { today, goals, logs } = useHealth();
  const recent = logs.filter((l) => l.day === 0).slice(0, 5);

  return (
    <>
      <h1 className="h1">Hi {user.name} 👋</h1>
      <p className="lead">Here is how today is shaping up.</p>

      <div className="grid-4">
        <StatTile icon={METRICS.steps.icon} label="Steps" value={today.steps.toLocaleString()} unit="steps" />
        <StatTile icon={METRICS.water.icon} label="Water" value={today.water} unit="glasses" />
        <StatTile icon={METRICS.sleep.icon} label="Sleep" value={today.sleep || "–"} unit="hrs" />
        <StatTile
          icon={METRICS.glucose.icon}
          label="Fasting glucose"
          value={today.glucose || "–"}
          unit="mg/dL"
          hint={<Badge tone={glucoseTone(today.glucose)}>{today.glucose ? (today.glucose < 100 ? "In range" : "Keep an eye") : "No reading"}</Badge>}
        />
      </div>

      <div className="grid-2">
        <Card title="Today's tiny win">
          <p className="lead-sm">{nextAction(today, goals)}</p>
          <Button href="/coach" variant="secondary" size="sm">Ask the coach</Button>
        </Card>

        <Card title="Goal progress">
          <ProgressBar label="Steps" value={today.steps} max={goals.steps} />
          <ProgressBar label="Water" value={today.water} max={goals.water} unit="glasses" />
          <ProgressBar label="Sleep" value={today.sleep} max={goals.sleep} unit="hrs" />
        </Card>
      </div>

      <Card title="Logged today" action={<Button href="/log" size="sm">Add log</Button>}>
        {recent.length === 0 ? (
          <EmptyState title="Nothing logged yet" text="Add your first check-in. It takes under a minute." />
        ) : (
          <ul className="list">
            {recent.map((l) => (
              <li key={l.id}>
                <span>{METRICS[l.type].icon} {METRICS[l.type].label}</span>
                <strong>{l.value.toLocaleString()} {METRICS[l.type].unit}</strong>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </>
  );
}
