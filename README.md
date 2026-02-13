# Compensation Plan Simulator

Interactive compensation plan simulator for direct-selling companies. Model commission structures, override percentages, and network parameters — then see real-time financial impact before making plan changes.

**Live Demo:** [comp-plan-simulator.vercel.app](https://comp-plan-simulator.vercel.app)

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

MIT — see [LICENSE](LICENSE)

---

Built by [CushLabs.ai](https://cushlabs.ai) — AI Integration & Software Development Consulting
