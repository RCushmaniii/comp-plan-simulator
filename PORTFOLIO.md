---
# === CONTROL FLAGS ===
portfolio_enabled: true
portfolio_priority: 99
portfolio_featured: false

# === CARD DISPLAY ===

# === DETAIL PAGE ===

# === LINKS ===
demo_url: ""
live_url: ""

# === OPTIONAL ===
---

# Compensation Plan Simulator — Portfolio Entry

## Client Need
Operations leaders at direct-selling companies need to model the financial impact of compensation plan changes before rolling them out. Changes to override rates, qualification thresholds, or tier structures can have cascading effects on company margins and distributor earnings that are hard to predict on paper.

## Solution
A fully interactive, client-side compensation plan simulator that lets users:
- Configure two compensation plans side-by-side (Current vs Proposed)
- Adjust 6 parameters per tier across 3 tiers (18 configurable inputs per plan)
- Model network parameters (headcount, avg sales, growth/promotion/attrition rates)
- See real-time financial impact: KPIs, payout distribution, revenue waterfall, break-even analysis
- Share configurations via URL for team review

## Technical Highlights
- **Zero backend** — all calculations run client-side as pure functions
- **Zustand** state management handles ~5 interdependent state groups without excessive re-renders
- **URL state encoding** — full configuration encoded in base64 URL param for shareable links
- **Bottom-up proportional override model** — consultants earn discounts, leaders earn overrides on downline volume, LoLs cascade overrides by depth
- **Bilingual** — full EN/ES support with the same i18n pattern used across the CushLabs portfolio
- **CushLabs design system** — Space Grotesk + Source Serif 4 typography, dark mode, responsive

## Stack
Next.js 16 | TypeScript | Tailwind CSS 4 | shadcn/ui | Zustand | Recharts | Framer Motion | Vercel

## Metrics
- 0 external API calls (fully static demo)
- ~18 configurable parameters per plan × 2 plans + 9 network params = 45 interactive inputs
- 3 chart types: stacked bar, waterfall, line with crossover detection
- Sub-second re-computation on any slider change
