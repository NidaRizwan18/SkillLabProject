# VitalCoach

An AI-first health coach MVP that helps busy people manage chronic conditions with small, realistic daily steps. Built with Next.js, React, plain CSS, React Context and dummy data (no backend).

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000 and sign in with any valid email.

## Structure
```
app/          pages (/, /login, /dashboard, /log, /coach, /insights)
components/   reusable UI (Button, Card, Input, Badge, ...)
context/      AuthContext, HealthContext, Providers
data/         dummy data and rule-based coach replies
```

## Architecture
Next.js → Pages → Components → React Context → Dummy data

## Docs
- PRODUCT-ASSUMPTIONS.md (to be written by the team)
- DESIGN-SYSTEM.md
- WIREFRAME.md
- PROJECT-PLAN.md

## Disclaimer
Student project using dummy data. The coach is rule-based and gives general wellness tips, not medical advice.
# SkillLabProject
