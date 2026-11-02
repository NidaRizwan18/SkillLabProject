// Rule-based "AI coach" used for the MVP. A real LLM call would replace getCoachReply later.

export function nextAction(stats, goals) {
  if (stats.water < goals.water / 2) {
    return "Drink a glass of water right now. You are under half your goal.";
  }
  if (stats.steps < goals.steps) {
    const left = goals.steps - stats.steps;
    return `Take a 10-minute walk after your next meal. You have ${left.toLocaleString()} steps to go.`;
  }
  if (stats.sleep && stats.sleep < goals.sleep) {
    return "Set a phone-down alarm 30 minutes before bed tonight.";
  }
  return "You are on track today. Keep it going with a short stretch break.";
}

const URGENT = /chest pain|faint|can't breathe|cannot breathe|severe|unconscious/i;

export function getCoachReply(text, stats, goals) {
  const t = text.toLowerCase();

  if (URGENT.test(text)) {
    return "That sounds serious. Please contact your doctor or local emergency services right away. I am a wellness coach, not a medical service.";
  }
  if (/glucose|sugar/.test(t)) {
    const g = stats.glucose;
    return g
      ? `Your latest fasting glucose is ${g} mg/dL. Pair meals with a short walk and add protein or fibre first. Share any readings that worry you with your doctor.`
      : "Log a fasting glucose reading and I can point out your pattern.";
  }
  if (/10 min|ten min|busy|time|tired/.test(t)) {
    return "Try this 10-minute plan: 5 minutes of brisk walking, 3 minutes of stretching, then a glass of water. Small and doable beats perfect.";
  }
  if (/sleep/.test(t)) {
    return `You are at ${stats.sleep || 0} hrs against a ${goals.sleep} hr goal. Tonight: screens off 30 minutes earlier and keep the room cool.`;
  }
  if (/eat|food|meal|dinner|lunch|breakfast/.test(t)) {
    return "Build the plate in this order: vegetables, then protein, then carbs. Swap one sugary drink for water or unsweetened tea.";
  }
  if (/walk|step|exercise|workout/.test(t)) {
    return `You are at ${stats.steps.toLocaleString()} of ${goals.steps.toLocaleString()} steps. A 10-minute walk adds roughly 1,000 steps.`;
  }
  if (/stress|anxious|overwhelm/.test(t)) {
    return "Try box breathing for one minute: in 4, hold 4, out 4, hold 4. Then choose just one task to finish next.";
  }
  return "I can help with blood sugar, steps, sleep, meals or stress. What is the hardest part of your day right now?";
}
