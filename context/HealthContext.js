"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { demoUser, initialLogs } from "@/data/dummy";
import { getCoachReply } from "@/data/coach";

const HealthContext = createContext(null);

// Daily value for one metric on one day offset.
export function dayValue(logs, type, day) {
  const items = logs.filter((l) => l.type === type && l.day === day);
  if (items.length === 0) return 0;
  if (type === "glucose") return items[0].value; // latest reading
  return items.reduce((sum, l) => sum + l.value, 0);
}

export function HealthProvider({ children }) {
  const goals = demoUser.goals;
  const [logs, setLogs] = useState(initialLogs);
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: "coach",
      text: "Hi! I am your VitalCoach. Tell me how today is going and I will suggest one small next step.",
    },
  ]);
  const [typing, setTyping] = useState(false);

  const today = useMemo(
    () => ({
      steps: dayValue(logs, "steps", 0),
      water: dayValue(logs, "water", 0),
      sleep: dayValue(logs, "sleep", 0),
      glucose: dayValue(logs, "glucose", 0),
    }),
    [logs]
  );

  function addLog({ type, value, note }) {
    setLogs((prev) => [
      { id: Date.now(), type, day: 0, value: Number(value), note: note || "" },
      ...prev,
    ]);
  }

  function removeLog(id) {
    setLogs((prev) => prev.filter((l) => l.id !== id));
  }

  function sendMessage(text) {
    const clean = text.trim();
    if (!clean) return;
    setMessages((prev) => [...prev, { id: Date.now(), from: "user", text: clean }]);
    setTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, from: "coach", text: getCoachReply(clean, today, goals) },
      ]);
      setTyping(false);
    }, 600);
  }

  const value = { logs, today, goals, addLog, removeLog, messages, typing, sendMessage };
  return <HealthContext.Provider value={value}>{children}</HealthContext.Provider>;
}

export function useHealth() {
  const ctx = useContext(HealthContext);
  if (!ctx) throw new Error("useHealth must be used inside <HealthProvider>");
  return ctx;
}
