---
# =============================================================================
# PORTFOLIO.md — Compensation Plan Simulator
# =============================================================================

portfolio_enabled: true
portfolio_priority: 99
portfolio_featured: false
portfolio_last_reviewed: "2026-02-21"

title: "Compensation Plan Simulator"
tagline: "Model the financial impact of direct-selling compensation changes before rolling them out"
slug: "comp-plan-simulator"

category: "Business Tools"
target_audience: "Operations leaders, finance teams, and executives at direct-selling companies"
tags:
  - "compensation"
  - "direct-selling"
  - "financial-modeling"
  - "nextjs"
  - "interactive"
  - "bilingual"
  - "data-visualization"

thumbnail: "/images/comp-plan-sim-thumb.jpg"
hero_images:
  - "/images/comp-plan-sim-01.png"
  - "/images/comp-plan-sim-09.png"
demo_video_url: "/video/comp-plan-sim-brief.mp4"
video_poster: "/video/comp-plan-sim-brief-poster.jpg"

live_url: "https://comp-plan-simulator.vercel.app"
demo_url: "https://comp-plan-simulator.vercel.app"
case_study_url: ""

problem_solved: |
  Compensation plan changes in direct-selling companies are high-stakes decisions
  that affect margins, field motivation, and retention — yet most companies design
  them with spreadsheets and gut instinct. A 2-point override increase at the leader
  tier might sound harmless until it erodes $200K in annual margin. Leaders need a way
  to model the financial impact of plan changes instantly, before rolling them out to
  thousands of distributors.

key_outcomes:
  - "Real-time financial modeling across 45 interactive inputs (18 per plan x 2 + 9 network params)"
  - "Side-by-side Current vs Proposed plan comparison with dollar and percentage deltas"
  - "Revenue waterfall visualization showing exactly where every dollar goes"
  - "Break-even analysis with crossover detection at varying network volumes"
  - "Shareable URL state encoding — full scenario compressed into a link"
  - "Bilingual EN/ES support including all labels, KPIs, and chart annotations"

tech_stack:
  - "Next.js 16"
  - "TypeScript"
  - "Tailwind CSS 4"
  - "shadcn/ui"
  - "Zustand"
  - "Recharts"
  - "Framer Motion"
  - "Vercel"

complexity: "Production"
---

## Overview

Compensation plan changes in direct-selling companies are high-stakes decisions that affect company margins, distributor earnings, and field retention — yet most companies design them with spreadsheets, gut instinct, or expensive consultants, with no way to see the financial ripple effects before going live.

This simulator turns a blind, slow, high-risk process into a visual, instant, reversible one. Operations leaders adjust commission rates, override percentages, and network parameters, then see real-time financial impact across KPIs, waterfall charts, and break-even curves.

## The Problem

Direct-selling companies live and die by their compensation plan. It determines whether distributants stay, recruit, or churn. But modeling the impact of plan changes is extraordinarily difficult:

- **No visibility into payout exposure** — changing one tier's override rate ripples through the entire cost structure in ways spreadsheets can't easily show
- **Slow iteration cycles** — testing a comp plan change in the real world takes months and risks distributor morale if it doesn't land
- **Siloed analysis** — finance sees costs, field leaders see motivation, but nobody sees both side-by-side in real time
- **Cascading effects** — override depth, qualification thresholds, and headcount ratios interact in non-linear ways that are impossible to reason about intuitively

## The Solution

A fully interactive, client-side simulator that lets users configure two compensation plans side-by-side and see the financial impact instantly:

- **Configure Tab** — Adjust personal discounts, override rates, override depth, and qualification rules across 3 tiers (Consultant, Leader, Leader of Leaders)
- **Network Parameters** — Model headcount, average sales, growth/promotion/attrition rates
- **Financial Dashboard** — 6 real-time KPIs: total revenue, total payout, company margin, margin %, avg consultant payout, avg leader payout — with delta indicators against the alternate plan
- **Revenue Waterfall** — Stacked waterfall chart showing gross revenue through consultant discounts, leader overrides, LoL overrides, down to net margin
- **Payout Distribution** — Stacked bar chart showing compensation cost breakdown by tier
- **Break-Even Analysis** — Line chart plotting current vs. proposed cost curves at up to 3x volume, with crossover point detection
- **Comparison Table** — Side-by-side metrics with dollar deltas, percentage deltas, and color-coded good/bad indicators
- **4 Presets** — Default, Aggressive Overrides, Flat Structure, High Growth scenarios
- **Shareable Links** — Full state compressed and encoded in URL for team review
- **Bilingual** — Full EN/ES support
- **Dark Mode** — Complete theme support with system awareness

## Who It Serves

### CEOs and Owners
The revenue waterfall chart shows exactly where every dollar goes. The margin % KPI with delta indicators means they can see in real time: "If I approve this proposed plan, margin drops from 32.4% to 29.1%." That's a board-level conversation compressed into 2 seconds. The break-even analysis answers the question no spreadsheet easily answers: "At what volume does the proposed plan become cheaper or more expensive than the current one?"

### VPs of Sales and Field Operations
Per-tier average payouts are front and center. They can answer: "If we bump leader overrides from 5% to 7%, what does the average leader actually earn?" — and see it update instantly. The comparison table lets them walk into a field meeting and say "Under the new plan, your average payout increases by $48/month" with data backing.

### Finance and Operations Teams
Every formula is deterministic and transparent — pure functions with no black boxes. The payout ratio KPI shows total comp cost as a percentage of revenue. The break-even curve models cost at up to 3x current volume, showing how payout obligations scale non-linearly as the network grows — the metric that bankrupts direct-selling companies when ignored.

### Consultants and Advisors
Share a scenario via URL link — no logins, no accounts. The client clicks and sees exactly what you configured. Everything runs client-side, so no sensitive compensation data leaves the browser. The polished UI with CushLabs design system looks like a SaaS product, not a prototype.

## Technical Highlights

- **Zero backend** — all calculations run client-side as pure functions in `calculations.ts`, easily testable with no React dependencies
- **Zustand state management** handles ~5 interdependent state groups (plan config x 2, network params, growth params, UI state) without the excessive re-renders that React Context would cause
- **URL state encoding** — full configuration compressed with lz-string and encoded in a `?s=` query param via debounced `history.replaceState`
- **Bottom-up proportional override model** — consultants earn personal discounts, leaders earn overrides on consultant volume distributed proportionally, LoLs cascade overrides by depth at half rate on second level
- **Break-even crossover detection** — iterates over 200 volume scale points up to 3x current network to find the exact volume where plan costs cross over
- **CushLabs design system** — Space Grotesk + Source Serif 4 + DM Mono typography, tier-specific color scheme (blue/amber/purple/green), responsive grid, print styles
- **Bilingual** — full EN/ES with the same i18n pattern used across the CushLabs portfolio

## Results

| Metric | Detail |
|--------|--------|
| Interactive inputs | 45 (18 per plan x 2 plans + 9 network params) |
| Chart types | 4 (stacked bar, waterfall, line with crossover, comparison table) |
| KPI cards | 6 with live delta indicators |
| Computation speed | Sub-second re-render on any slider change |
| Presets | 4 built-in scenarios |
| Data exposure | Zero — fully client-side, no API calls |
| Language support | EN/ES bilingual |
| Sharing | Full state encoded in URL |

## Stack

Next.js 16 | TypeScript | Tailwind CSS 4 | shadcn/ui | Zustand | Recharts | Framer Motion | Vercel
