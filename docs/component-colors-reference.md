# Component colors reference

Tailwind tokens and their hex values. Components use these tokens (e.g. `bg-dark-950`, `text-primary-500`); this table maps token → hex.

---

## Palette (token → hex)

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
| **Other** | |
| brand | #932063 |

---

## By component (component → colors used → hex)

| Component | Colors used | Hex |
|-----------|-------------|-----|
| **globals.css (body, base)** | bg-dark-950, text-dark-100 | #1a2435, #f1f5f9 |
| **globals.css (btn-primary)** | primary-600, primary-500, dark-950, primary-500 ring | #b8860b, #d4a012, #1a2435, #d4a012 |
| **globals.css (btn-secondary)** | primary-600/50, primary-400, primary-500 ring, dark-950 | #b8860b, #facc15, #d4a012, #1a2435 |
| **globals.css (btn-secondary-brand)** | brand border/text, brand ring | #932063 |
| **globals.css (card-glass)** | dark-900/40, dark-700/50 | #222d3d, #3d4a5c |
| **globals.css (card-glass-hover)** | dark-800/50, primary-600/30 | #2d3a4e, #b8860b |
| **globals.css (divider-gradient)** | primary-600/50 | #b8860b |
| **globals.css (bento-scroll-track)** | primary-500 thumb, dark-800 track | #d4a012, #2d3a4e |
| **globals.css (scrollbar)** | dark-700, dark-600, primary-500 | #3d4a5c, #52627a, #d4a012 |
| **Hero** | dark-950, dark-100, dark-300, dark-400, dark-500, primary-600/10, primary-600/30, primary-400, primary-500 | #1a2435, #f1f5f9, #cbd5e1, #94a3b8, #64748b, #b8860b, #b8860b, #facc15, #d4a012 |
| **Navigation** | dark-950/90, dark-800/50, primary-500, primary-700, dark-950, dark-100, dark-300, primary-400 | #1a2435, #2d3a4e, #d4a012, #92650a, #1a2435, #f1f5f9, #cbd5e1, #facc15 |
| **Footer** | dark-800/50, dark-950/80, primary-500, primary-700, primary-900/20, dark-50, dark-400, dark-900/30, dark-700/30, dark-200, dark-300, primary-500/60, dark-400, dark-500 | #2d3a4e, #1a2435, #d4a012, #92650a, #654313, #f8fafc, #94a3b8, #222d3d, #3d4a5c, #e2e8f0, #cbd5e1, #d4a012, #94a3b8, #64748b |
| **Faculty** | dark-950, dark-900, primary-500/5, primary-400/10, primary-500, primary-400, dark-100, dark-300, dark-800/90, dark-600, primary-400, primary-300, primary-500/50, dark-400 | #1a2435, #222d3d, #d4a012, #facc15, #d4a012, #facc15, #f1f5f9, #cbd5e1, #2d3a4e, #52627a, #facc15, #fde047, #d4a012, #94a3b8 |
| **Invitation** | dark-900/50, dark-950, primary-600/10, primary-500, dark-100, primary-600/20, dark-200, dark-400, primary-400, dark-500 | #222d3d, #1a2435, #b8860b, #d4a012, #f1f5f9, #b8860b, #e2e8f0, #94a3b8, #facc15, #64748b |
| **InvitationModal** | primary-600/50, primary-500, dark-950, primary-900/40, dark-950/90, dark-200, dark-50, dark-500, dark-600, primary-600/20, dark-900/95, dark-700, primary-600/10, dark-100, dark-300, dark-400, dark-900/40, primary-600/40, primary-500, dark-800/80, dark-950 | #b8860b, #d4a012, #1a2435, #654313, #1a2435, #e2e8f0, #f8fafc, #64748b, #52627a, #b8860b, #222d3d, #3d4a5c, #b8860b, #f1f5f9, #cbd5e1, #94a3b8, #222d3d, #b8860b, #d4a012, #2d3a4e, #1a2435 |
| **Philosophy** | primary-500, primary-500/10, primary-500/30, dark-950, dark-900/50, dark-800, dark-100, dark-300, dark-950/40–75, primary-500/40, dark-800, dark-500, dark-200 | #d4a012, #d4a012, #d4a012, #1a2435, #222d3d, #2d3a4e, #f1f5f9, #cbd5e1, #1a2435, #d4a012, #2d3a4e, #64748b, #e2e8f0 |
| **Journey** | dark-700/50, dark-950, primary-600/90, primary-500, dark-950, primary-600/20, primary-600/40, primary-400, dark-100, dark-300, dark-400, primary-500, primary-600, dark-700/50, dark-950/90–50 | #3d4a5c, #1a2435, #b8860b, #d4a012, #1a2435, #b8860b, #b8860b, #facc15, #f1f5f9, #cbd5e1, #94a3b8, #d4a012, #b8860b, #3d4a5c, #1a2435 |
| **EventDetails** | dark-950/60–70, primary-500, dark-100, primary-600/10, primary-600/30, primary-500, dark-500, dark-400 | #1a2435, #d4a012, #f1f5f9, #b8860b, #b8860b, #d4a012, #64748b, #94a3b8 |
| **WhyExists** | primary-600/30, primary-500, dark-100, dark-200, primary-400, dark-400, primary-500, dark-950, primary-600/10, primary-600/30, dark-200 | #b8860b, #d4a012, #f1f5f9, #e2e8f0, #facc15, #94a3b8, #d4a012, #1a2435, #b8860b, #b8860b, #e2e8f0 |
| **FAQ** | dark-800/50, primary-600/30, dark-200, dark-100, dark-800/50, dark-400, primary-600/20, primary-400, dark-400, dark-950 | #2d3a4e, #b8860b, #e2e8f0, #f1f5f9, #2d3a4e, #94a3b8, #b8860b, #facc15, #94a3b8, #1a2435 |
| **typewriter-effect (ui)** | dark-300, primary-400, primary-500 | #cbd5e1, #facc15, #d4a012 |
| **profile-card (ui)** | dark-700, dark-800, dark-700 border, dark-100, primary-400, dark-200, primary-500, primary-700, dark-950 | #3d4a5c, #2d3a4e, #3d4a5c, #f1f5f9, #facc15, #e2e8f0, #d4a012, #92650a, #1a2435 |
| **textarea (ui)** | dark-600, dark-800/80, dark-100, dark-500, primary-500, dark-950 | #52627a, #2d3a4e, #f1f5f9, #64748b, #d4a012, #1a2435 |
| **input (ui)** | dark-600, dark-800/80, dark-100, dark-500, primary-500, dark-950 | #52627a, #2d3a4e, #f1f5f9, #64748b, #d4a012, #1a2435 |
| **label (ui)** | dark-200 | #e2e8f0 |
| **bento-gallery (ui)** | dark-950, primary-500, dark-100, dark-300, dark-700, dark-800, primary-500/30, primary-500 | #1a2435, #d4a012, #f1f5f9, #cbd5e1, #3d4a5c, #2d3a4e, #d4a012, #d4a012 |
| **error.tsx** | dark-100, dark-400, primary-500, primary-400, dark-950 | #f1f5f9, #94a3b8, #d4a012, #facc15, #1a2435 |
| **not-found.tsx** | (uses same tokens as app) | (see palette above) |
| **sticky-scroll, AlertLiveEvent, separator** | dark-* / primary-* | (see palette) |
| **WhoIsFor, WhatMakesDifferent, OrbitalGallery, MagneticNarrativeGrid** | dark-* / primary-* | (see palette) |

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
