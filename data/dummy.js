// Dummy data for the MVP (no backend). `day` is an offset: 0 = today, 1 = yesterday...

export const demoUser = {
  name: "Aarav",
  email: "demo@vitalcoach.app",
  focus: ["Blood sugar", "Heart health"],
  goals: { steps: 6000, water: 8, sleep: 7 },
};

export const METRICS = {
  steps: { label: "Steps", unit: "steps", icon: "👟", min: 1, max: 100000 },
  water: { label: "Water", unit: "glasses", icon: "💧", min: 1, max: 30 },
  sleep: { label: "Sleep", unit: "hrs", icon: "🌙", min: 1, max: 24 },
  glucose: { label: "Fasting glucose", unit: "mg/dL", icon: "🩸", min: 40, max: 500 },
};

const steps = [4200, 5800, 3100, 6400, 7200, 2900, 5100];
const glucose = [104, 110, 98, 112, 101, 118, 99];
const sleep = [6.5, 7, 5.5, 7.5, 6, 6.8, 7.2];

let id = 1;
const make = (type, day, value, note = "") => ({ id: id++, type, day, value, note });

export const initialLogs = [
  make("water", 0, 3, "After morning walk"),
  ...steps.map((v, d) => make("steps", d, v)),
  ...glucose.map((v, d) => make("glucose", d, v, d === 0 ? "Before breakfast" : "")),
  ...sleep.map((v, d) => make("sleep", d, v)),
];

export const features = [
  {
    icon: "⏱️",
    title: "Two-minute check-ins",
    text: "Log steps, water, sleep and glucose in a few taps. No long forms, no guilt.",
  },
  {
    icon: "🤖",
    title: "A coach that adapts",
    text: "Get one small, realistic next step based on what your day actually looks like.",
  },
  {
    icon: "📈",
    title: "Trends you can read",
    text: "See weekly patterns for blood sugar, activity and sleep without the jargon.",
  },
];

export const quickPrompts = [
  "How is my blood sugar this week?",
  "I only have 10 minutes today",
  "Help me sleep better",
  "What should I eat tonight?",
];
