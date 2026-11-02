"use client";

import Protected from "@/components/Protected";
import Card from "@/components/Card";
import BarChart from "@/components/BarChart";
import Badge from "@/components/Badge";
import { useHealth, dayValue } from "@/context/HealthContext";

const DAYS = [6, 5, 4, 3, 2, 1, 0];
const label = (d) => (d === 0 ? "Today" : `-${d}d`);

function avg(arr) {
  const vals = arr.filter(Boolean);
  return vals.length ? Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10 : 0;
}

export default function InsightsPage() {
  return (
    <Protected>
      <Insights />
    </Protected>
  );
}

function Insights() {
  const { logs, goals } = useHealth();
  const series = (type) => DAYS.map((d) => ({ label: label(d), value: dayValue(logs, type, d) }));

  const steps = series("steps");
  const glucose = series("glucose");
  const sleep = series("sleep");

  const avgSteps = Math.round(avg(steps.map((s) => s.value)));
  const avgGlucose = avg(glucose.map((s) => s.value));
  const avgSleep = avg(sleep.map((s) => s.value));

  const tips = [];
  if (avgSteps < goals.steps) tips.push(`Average steps are ${avgSteps.toLocaleString()}. Add one 10-minute walk after lunch.`);
  if (avgGlucose >= 100) tips.push(`Average fasting glucose is ${avgGlucose} mg/dL. Try protein or fibre at dinner and a short evening walk.`);
  if (avgSleep < goals.sleep) tips.push(`Average sleep is ${avgSleep} hrs. Aim to wind down 30 minutes earlier on two nights.`);
  if (tips.length === 0) tips.push("Great week. Keep the same routine going.");

  return (
    <>
      <h1 className="h1">Weekly insights</h1>
      <div className="grid-3">
        <Card title="Avg steps"><p className="stat-value">{avgSteps.toLocaleString()}</p><Badge tone={avgSteps >= goals.steps ? "success" : "warning"}>Goal {goals.steps.toLocaleString()}</Badge></Card>
        <Card title="Avg fasting glucose"><p className="stat-value">{avgGlucose} <span className="small muted">mg/dL</span></p><Badge tone={avgGlucose < 100 ? "success" : "warning"}>{avgGlucose < 100 ? "In range" : "Watch"}</Badge></Card>
        <Card title="Avg sleep"><p className="stat-value">{avgSleep} <span className="small muted">hrs</span></p><Badge tone={avgSleep >= goals.sleep ? "success" : "warning"}>Goal {goals.sleep} hrs</Badge></Card>
      </div>

      <Card title="Steps, last 7 days"><BarChart data={steps} goal={goals.steps} unit="steps" /></Card>
      <Card title="Sleep, last 7 days"><BarChart data={sleep} goal={goals.sleep} unit="hrs" /></Card>

      <Card title="Small changes to try">
        <ul className="list">
          {tips.map((t) => (<li key={t}>{t}</li>))}
        </ul>
      </Card>
    </>
  );
}
