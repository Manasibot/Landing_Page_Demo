# Component colors reference (Refined – Lighter Executive Dark)

Tailwind tokens and their hex values. This keeps your palette but rebalances usage.

---

## Palette (token → hex)

(No changes to actual hex values — only usage changes.)

| Token | Hex |
|-------|-----|
| **Primary** | |
| primary-50 | #fefce8 |
| primary-100 | #fef9c3 |
| primary-200 | #fef08a |
| primary-300 | #fde047 |
| primary-400 | #facc15 |
| primary-500 | #d4a012 |
| primary-600 | #b8860b |
| primary-700 | #92650a |
| primary-800 | #78530f |
| primary-900 | #654313 |
| **Dark** | |
| dark-50 | #f8fafc |
| dark-100 | #f1f5f9 |
| dark-200 | #e2e8f0 |
| dark-300 | #cbd5e1 |
| dark-400 | #94a3b8 |
| dark-500 | #64748b |
| dark-600 | #52627a |
| dark-700 | #3d4a5c |
| dark-800 | #2d3a4e |
| dark-900 | #222d3d |
| dark-950 | #1a2435 |
| **Brand** | |
| brand | #932063 |

---

## Updated Usage System (Lighter Executive Dark)

### globals.css (body, base)

| Usage | Token | Hex |
|-------|-------|-----|
| Background | bg-dark-900 | #222d3d |
| Text Primary | text-dark-50 | #f8fafc |
| Secondary text | text-dark-200 | #e2e8f0 |
| Muted text | text-dark-300 | #cbd5e1 |

*(Removed dark-950 as base background.)*

---

### Buttons

**btn-primary**

| Property | Token | Hex |
|----------|-------|-----|
| Background | primary-500 | #d4a012 |
| Hover | primary-600 | #b8860b |
| Text | dark-950 | #1a2435 |
| Ring | primary-500/40 | #d4a012 |

**btn-secondary**

| Property | Token | Hex |
|----------|-------|-----|
| Background | dark-800 | #2d3a4e |
| Border | dark-600 | #52627a |
| Text | dark-100 | #f1f5f9 |
| Hover Border | primary-500/30 | #d4a012 |

*(Removed gold-heavy fills.)*

---

### Cards (replaces glass effect)

| Usage | Token | Hex |
|-------|-------|-----|
| Card bg | bg-dark-800 | #2d3a4e |
| Border | border-dark-600 | #52627a |
| Hover bg | hover:bg-dark-700 | #3d4a5c |
| Shadow | shadow-lg | — |

*(Removed dark-900/40 glass overlays.)*

---

### Hero

| Usage | Token | Hex |
|-------|-------|-----|
| Background | bg-dark-900 | #222d3d |
| Accent overlay | primary-500/10 | #d4a012 |
| Headline | text-dark-50 | #f8fafc |
| Subtext | text-dark-200 | #e2e8f0 |
| Highlight text | text-primary-400 | #facc15 |

---

### Navigation

| Usage | Token | Hex |
|-------|-------|-----|
| Background | bg-dark-900/95 | #222d3d |
| Border bottom | border-dark-700 | #3d4a5c |
| Nav text | text-dark-200 | #e2e8f0 |
| Active link | text-primary-500 | #d4a012 |

---

### Sections (alternating)

| Section Type | Token | Hex |
|--------------|-------|-----|
| Primary section | bg-dark-900 | #222d3d |
| Alternate section | bg-dark-800 | #2d3a4e |

*(No more dark-950 heavy stacking.)*

---

### Dividers / subtle highlights

| Usage | Token | Hex |
|-------|-------|-----|
| Divider | border-dark-600 | #52627a |
| Gold subtle line | border-primary-500/30 | #d4a012 |
| Highlight box bg | bg-primary-500/10 | #d4a012 |

---

### Footer (slightly deeper for contrast)

| Usage | Token | Hex |
|-------|-------|-----|
| Background | bg-dark-950 | #1a2435 |
| Text | text-dark-300 | #cbd5e1 |
| Links | text-dark-200 | #e2e8f0 |
| Hover | text-primary-400 | #facc15 |

*(Only place where dark-950 is used.)*

---

## Final executive distribution

| Layer | Percentage |
|-------|------------|
| dark-900 | 50–60% |
| dark-800 | 25–30% |
| dark-700 | 5–10% |
| gold accents | 5–8% |
| dark-950 | Footer only |

---

## Quick hex lookup

| Hex | Token(s) |
|-----|----------|
| #1a2435 | dark-950 |
| #222d3d | dark-900 |
| #2d3a4e | dark-800 |
| #3d4a5c | dark-700 |
| #52627a | dark-600 |
| #64748b | dark-500 |
| #94a3b8 | dark-400 |
| #cbd5e1 | dark-300 |
| #e2e8f0 | dark-200 |
| #f1f5f9 | dark-100 |
| #f8fafc | dark-50 |
| #d4a012 | primary-500 |
| #facc15 | primary-400 |
| #b8860b | primary-600 |
| #92650a | primary-700 |
| #654313 | primary-900 |
| #932063 | brand |
