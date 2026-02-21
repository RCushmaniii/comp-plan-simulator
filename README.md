# Compensation Plan Simulator

Interactive compensation plan simulator for direct-selling companies. Model commission structures, override percentages, and network parameters — then see real-time financial impact before making plan changes.

**Live Demo:** [comp-plan-simulator.vercel.app](https://comp-plan-simulator.vercel.app)

## Why This Exists

Compensation plan changes in direct-selling companies are high-stakes decisions that affect margins, field motivation, and retention — yet most companies design them with spreadsheets and gut instinct. This simulator lets operations leaders, finance teams, and executives model the financial impact of plan changes instantly, before rolling them out to thousands of distributors.

- **CEOs** see margin impact and revenue waterfall in real time
- **Sales VPs** model per-tier payouts to build field confidence before announcements
- **Finance teams** get auditable cost projections and break-even analysis at scale
- **Consultants** share scenarios via URL — no logins, no data leaves the browser

## Features

- **Configure Tab** — Adjust personal discounts, override rates, override depth, and qualification rules across 3 tiers (Consultant, Leader, Leader of Leaders)
- **Network Parameters** — Model headcount, average sales, growth/promotion/attrition rates
- **Financial Dashboard** — Real-time KPIs: total revenue, payout, margin, per-tier averages
- **Visualizations** — Payout distribution chart, revenue waterfall, break-even analysis
- **Compare Tab** — Side-by-side comparison of Current vs Proposed plans with deltas
- **Presets** — 4 built-in scenarios (Default, Aggressive Overrides, Flat Structure, High Growth)
- **Shareable Links** — Full state encoded in URL for sharing configurations
- **i18n** — English and Spanish
- **Dark Mode** — Full theme support

## Tech Stack

- **Next.js 16** (App Router, TypeScript, Turbopack)
- **Tailwind CSS 4** + shadcn/ui components
- **Zustand** for state management
- **Recharts** for data visualization
- **Framer Motion** for animations
- **Deployed on Vercel**

## Getting Started

```bash
pnpm install
pnpm dev
```

## Disclaimer

All data shown in the demo is illustrative and does not represent any real company's compensation plan.

## License

Proprietary — Copyright (c) 2025-2026 CushLabs AI Services. All rights reserved. See [LICENSE](LICENSE).

---

Built by [CushLabs.ai](https://cushlabs.ai) — AI Integration & Software Development Consulting
