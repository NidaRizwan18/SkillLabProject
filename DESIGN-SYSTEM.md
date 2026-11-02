# Design System – VitalCoach

The tokens below live in `app/globals.css` as CSS variables.

## 1. Colors

| Role | Hex | Used for |
|---|---|---|
| Primary | `#0F766E` (teal) | Buttons, active nav, progress bars, brand |
| Primary dark | `#115E59` | Button hover |
| Secondary | `#4F46E5` (indigo) | Reserved for secondary highlights |
| Background | `#F6FAF9` | Page background |
| Surface | `#FFFFFF` | Cards, inputs, navbar |
| Text | `#0F172A` | Main text |
| Muted text | `#64748B` | Secondary text, labels |
| Border | `#E2E8F0` | Card and input borders |
| Accent | `#F59E0B` (amber) | Warnings, attention |
| Success | `#16A34A` | In-range, goal reached |
| Error | `#DC2626` | Validation errors, out-of-range |

Why: teal feels calm and health-related; amber is used sparingly so warnings stand out without causing panic.

## 2. Typography

Font: **Inter** (system-ui fallback)

| Style | Size / Weight |
|---|---|
| H1 | 32px / Bold (26px on mobile) |
| H2 | 24px / Semi Bold |
| H3 (card titles) | 18px / Semi Bold |
| Body | 16px / Regular |
| Lead text | 18px / Regular |
| Button | 16px / Semi Bold (14px small) |
| Small / secondary | 14px / Regular |

## 3. UI components

| Component | File | Notes |
|---|---|---|
| Button | `components/Button.js` | primary, secondary, ghost; sm/md; renders a link if `href` |
| Navbar | `components/Navbar.js` | Shows app links only when signed in |
| Card | `components/Card.js` | Optional title and action slot |
| Input | `components/Input.js` | Text input or dropdown (`options`), with error text |
| Badge | `components/Badge.js` | neutral, success, warning, error |
| StatTile | `components/StatTile.js` | Icon, value, unit, hint |
| ProgressBar | `components/ProgressBar.js` | Goal progress with ARIA attributes |
| BarChart | `components/BarChart.js` | Dependency-free 7-day chart |
| ChatBubble | `components/ChatBubble.js` | coach / user variants |
| EmptyState | `components/EmptyState.js` | Used when a list has no entries |
| Protected | `components/Protected.js` | Redirects to /login when signed out |

Loading state: `Protected` shows "Loading…" while the session is restored; the coach shows a "Typing…" bubble.

## UI decisions
- Rounded cards (14px) and large tap targets for use on the go.
- One clear "tiny win" per day instead of many targets.
- Visible focus outlines for keyboard users; badges never rely on color alone (they carry text).
