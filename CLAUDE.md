# Compensation Plan Simulator

## Project Overview
Interactive client-side compensation plan simulator for direct-selling companies. Phase 1 is a static demo with dummy data — no backend, no persistence. Operations leaders adjust commission rates, override percentages, and network parameters, then see real-time financial impact.

**Live:** https://comp-plan-simulator.vercel.app
**Repo:** RCushmaniii/comp-plan-simulator

## Tech Stack
- **Framework:** Next.js 16 (App Router, TypeScript, Turbopack)
- **Styling:** Tailwind CSS 4 + shadcn/ui (new-york style, neutral base)
- **State:** Zustand (single store with slices — NOT React Context)
- **Charts:** Recharts (BarChart, LineChart, stacked waterfall)
- **Animations:** Framer Motion
- **i18n:** Custom context-based EN/ES (lib/i18n.ts + lib/locale-context.tsx)
- **Deployment:** Vercel (auto-deploys from main)
- **Package Manager:** pnpm

## Architecture Decisions
- **Zustand over Context:** The comp plan has ~5 interdependent state groups (plan config × 2, network params, growth params, UI state) that would cause excessive re-renders with Context.
- **All calculations are pure functions** in `lib/calculations.ts` — no React dependencies, easily testable.
- **URL state sync:** Base64-encoded JSON in `?s=` query param via debounced `history.replaceState`. Share links encode full plan state.
- **Bottom-up proportional override model:** Consultants earn personal discounts. Leaders earn overrides on consultant volume (distributed proportionally). LoLs cascade overrides by depth at half rate on second level.

## Key Files
```
src/
├── app/
│   ├── layout.tsx          # Fonts (Space Grotesk, Source Serif 4, DM Mono), providers
│   ├── page.tsx            # Main page — tabs, dashboard, charts
│   └── globals.css         # CushLabs design system, tier colors, print styles
├── components/
│   ├── SiteHeader.tsx      # Sticky header with theme/locale toggles
│   ├── AssumptionsBanner.tsx # Amber "demo data" disclaimer
│   ├── PlanConfigPanel.tsx # Current/Proposed toggle + 3 TierConfigurators
│   ├── TierConfigurator.tsx # 6 sliders per tier (discount, override, depth, quals)
│   ├── PresetSelector.tsx  # 4 preset buttons
│   ├── NetworkInputPanel.tsx # Headcount, avg sales, growth/promo/attrition rates
│   ├── FinancialDashboard.tsx # 6 KPI cards
│   ├── KpiCard.tsx         # Single metric display with optional delta
│   ├── PayoutDistributionChart.tsx  # Stacked bar by tier
│   ├── WaterfallChart.tsx  # Revenue → discounts → overrides → margin
│   ├── BreakEvenChart.tsx  # Current vs proposed cost curves
│   ├── ComparisonTable.tsx # Side-by-side metrics with deltas
│   ├── ComparisonView.tsx  # Compare tab layout
│   ├── ExportActions.tsx   # Share link + reset buttons
│   ├── Footer.tsx          # CushLabs branding
│   └── ui/                 # shadcn components (slider, card, tooltip, tabs, etc.)
├── data/
│   ├── types.ts            # Core interfaces (TierConfig, CompensationPlan, etc.)
│   ├── defaults.ts         # Dummy data with disclaimer
│   └── presets.ts          # 4 scenarios (Default, Aggressive, Flat, High Growth)
└── lib/
    ├── calculations.ts     # Pure functions: computeDashboard, computeWaterfall, etc.
    ├── store.ts            # Zustand store with URL sync
    ├── i18n.ts             # EN/ES translation strings
    ├── locale-context.tsx  # Locale provider + useLocale hook
    ├── theme-context.tsx   # Theme provider + useTheme hook (localStorage)
    └── utils.ts            # cn() helper
```

## Tier Color Scheme
- **Consultant:** `#3b82f6` (blue) — entry level, high volume
- **Leader:** `#f59e0b` (amber) — mid tier, earns overrides
- **Leader of Leaders:** `#8b5cf6` (purple) — top tier, deep overrides
- **Company Margin:** `#10b981` (green) — what's left

## Development
```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # Production build
```

## Conventions
- Components are PascalCase `.tsx` files in `src/components/`
- All client components use `"use client"` directive
- Recharts Tooltip formatters must NOT type-annotate `value` parameter (use `(value) =>` not `(value: number) =>`) due to Recharts type definitions
- Slider values flow through Zustand actions, not local state
- i18n keys follow flat namespace (no nesting) — add to both `en` and `es` objects in `lib/i18n.ts`
