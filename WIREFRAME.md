# Wireframe – VitalCoach

A text wireframe to start from. Redraw it in Excalidraw or Figma (or on paper), export it as an image/PDF, and use that as your deliverable and for the presentation. Present your own original version.

## Navigation (all signed-in pages)
```
[💚 VitalCoach]   Dashboard | Log | Coach | Insights        [Log out]
```

## / Landing
```
[ Navbar ............................................ Sign in ]
 AI HEALTH COACH
 Managing a chronic condition, without the overwhelm.
 short description
 [ Try the demo ]  [ How it works ]
 ┌─────────┐ ┌─────────┐ ┌─────────┐
 │ 2-min   │ │ adaptive│ │ trends  │   feature cards
 └─────────┘ └─────────┘ └─────────┘
```

## /login
```
 ┌───────────────────────┐
 │ Welcome               │
 │ Name (optional) [____]│
 │ Email           [____]│  ← error text under field
 │ [ Continue ]          │
 └───────────────────────┘
```

## /dashboard
```
 Hi Aarav 👋
 ┌──────┐┌──────┐┌──────┐┌──────┐
 │Steps ││Water ││Sleep ││Gluc. │   stat tiles
 └──────┘└──────┘└──────┘└──────┘
 ┌ Today's tiny win ┐ ┌ Goal progress ┐
 │ one suggestion   │ │ ▓▓▓░░ steps   │
 │ [Ask the coach]  │ │ ▓▓░░░ water   │
 └──────────────────┘ └───────────────┘
 ┌ Logged today ............ [Add log] ┐
 │ 💧 Water 3 glasses ...               │
```

## /log
```
 ┌ New check-in ────┐ ┌ History ─ [filter ▾] ┐
 │ Type  [dropdown] │ │ 👟 4,200 steps  Today ✕│
 │ Value [____]     │ │ 🩸 104 mg/dL   Today ✕│
 │ Note  [____]     │ │ (empty state if none) │
 │ [ Save entry ]   │ └───────────────────────┘
```

## /coach
```
 ┌ chat ─────────────────────────────┐
 │ (coach)  Hi! ...                  │
 │                       (you) ...   │
 │ [chip] [chip] [chip] [chip]       │
 │ [ message input ........ ][Send]  │
 └───────────────────────────────────┘
```

## /insights
```
 [Avg steps] [Avg glucose] [Avg sleep]   badges
 Steps bar chart (7 days, goal highlighted)
 Sleep bar chart
 Small changes to try (list)
```

## User flow
```
Landing → Login → Dashboard → Log a check-in → Dashboard updates
                         ↘ Coach (ask question) → advice using today's data
                         ↘ Insights (weekly trends and suggestions)
```

## Important interactions
- Saving a log instantly updates the Dashboard tiles and goal bars (shared React Context).
- Chat suggestions send a message with one tap.
- Signed-out visitors to any app page are redirected to /login.
