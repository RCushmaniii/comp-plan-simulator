---
# === CONTROL FLAGS ===
portfolio_enabled: true
portfolio_priority: 4
portfolio_featured: true

# === CARD DISPLAY ===
title: "Compensation Plan Simulator"
tagline: "Model direct-selling comp plan changes in real time before rolling them out"
slug: "comp-plan-simulator"
category: "Web Tools"
tech_stack:
  - "Next.js 16"
  - "TypeScript"
  - "Zustand"
  - "Recharts"
  - "Tailwind CSS 4"
thumbnail: "/images/comp-plan-sim-thumb.jpg"
status: "Production"

# === DETAIL PAGE ===
problem: "Direct-selling companies live and die by their compensation plan, yet most design changes with spreadsheets and gut instinct. A 2-point override increase at the leader tier might sound harmless until it erodes $200K in annual margin — and nobody sees the ripple effects until it's too late."
solution: "A fully interactive client-side simulator that lets operations leaders configure two compensation plans side-by-side across 45 inputs and see instant financial impact via KPI dashboards, revenue waterfalls, payout distributions, and break-even curves — all shareable via URL with zero backend."
key_features:
  - "45 interactive inputs (18 per plan x 2 + 9 network params) with real-time financial recalculation"
  - "Side-by-side Current vs Proposed comparison with 6 KPIs, dollar deltas, and percentage deltas"
  - "Revenue waterfall, payout distribution, and break-even crossover charts via Recharts"
  - "Shareable URL state encoding — full scenario compressed into a link for team review"
  - "Full EN/ES bilingual support with dark/light themes and 4 built-in scenario presets"

# === LINKS ===
demo_url: "https://comp-plan-simulator.vercel.app"
live_url: "https://comp-plan-simulator.vercel.app"

# === MEDIA: PORTFOLIO SLIDES ===
slides:
  - src: "/images/comp-plan-sim-01.png"
    alt_en: "Compensation Plan Simulator — model the financial impact of comp plan changes before going live"
    alt_es: "Simulador de Plan de Compensacion — modela el impacto financiero de cambios al plan antes de lanzarlos"
  - src: "/images/comp-plan-sim-02.png"
    alt_en: "The Problem — spreadsheets and gut instinct drive decisions that affect margins and distributor retention"
    alt_es: "El Problema — hojas de calculo e instinto impulsan decisiones que afectan margenes y retencion de distribuidores"
  - src: "/images/comp-plan-sim-03.png"
    alt_en: "Configure Tab — adjust personal discounts, override rates, depth, and qualification rules across 3 tiers"
    alt_es: "Pestana de Configuracion — ajusta descuentos, tasas de sobreescritura, profundidad y reglas por 3 niveles"
  - src: "/images/comp-plan-sim-04.png"
    alt_en: "Financial Dashboard — 6 real-time KPIs with delta indicators against the alternate plan"
    alt_es: "Dashboard Financiero — 6 KPIs en tiempo real con indicadores delta contra el plan alternativo"
  - src: "/images/comp-plan-sim-05.png"
    alt_en: "Revenue Waterfall — stacked chart showing gross revenue through discounts, overrides, down to net margin"
    alt_es: "Cascada de Ingresos — grafico apilado desde ingresos brutos, descuentos, sobreescrituras, hasta margen neto"
  - src: "/images/comp-plan-sim-06.png"
    alt_en: "Break-Even Analysis — current vs proposed cost curves at up to 3x volume with crossover detection"
    alt_es: "Analisis de Punto de Equilibrio — curvas de costo actual vs propuesto hasta 3x volumen con deteccion de cruce"
  - src: "/images/comp-plan-sim-07.png"
    alt_en: "Comparison Table — side-by-side metrics with dollar deltas and color-coded good/bad indicators"
    alt_es: "Tabla Comparativa — metricas lado a lado con deltas en dolares e indicadores de color bueno/malo"
  - src: "/images/comp-plan-sim-08.png"
    alt_en: "4 Scenario Presets — Default, Aggressive Overrides, Flat Structure, High Growth for rapid what-if analysis"
    alt_es: "4 Presets de Escenarios — Predeterminado, Sobreescrituras Agresivas, Estructura Plana, Alto Crecimiento"
  - src: "/images/comp-plan-sim-09.png"
    alt_en: "Technical Architecture — Zustand state, pure calculation functions, URL-encoded sharing, zero backend"
    alt_es: "Arquitectura Tecnica — estado Zustand, funciones de calculo puras, compartir por URL, sin backend"

# === MEDIA: VIDEO ===
video_url: "/video/comp-plan-sim-brief.mp4"
video_poster: "/video/comp-plan-sim-brief-poster.jpg"

# === OPTIONAL ===
metrics:
  - "45 interactive inputs with sub-second recalculation"
  - "4 chart types: waterfall, stacked bar, line with crossover, comparison table"
  - "Full state shareable via URL — zero backend, zero data exposure"
tags:
  - "compensation"
  - "direct-selling"
  - "financial-modeling"
  - "nextjs"
  - "interactive"
  - "bilingual"
  - "data-visualization"
  - "zustand"
  - "recharts"
date_completed: "2026-02"
---

## Overview

Compensation plan changes in direct-selling companies are high-stakes decisions that affect company margins, distributor earnings, and field retention — yet most companies design them with spreadsheets, gut instinct, or expensive consultants, with no way to see the financial ripple effects before going live.

This simulator turns a blind, slow, high-risk process into a visual, instant, reversible one. Operations leaders adjust commission rates, override percentages, and network parameters, then see real-time financial impact across KPIs, waterfall charts, and break-even curves.

## The Challenge

- **No visibility into payout exposure** — changing one tier's override rate ripples through the entire cost structure in ways spreadsheets can't easily show
- **Slow iteration cycles** — testing a comp plan change in the real world takes months and risks distributor morale if it doesn't land
- **Siloed analysis** — finance sees costs, field leaders see motivation, but nobody sees both side-by-side in real time
- **Cascading effects** — override depth, qualification thresholds, and headcount ratios interact in non-linear ways that are impossible to reason about intuitively

## The Solution

A fully interactive, client-side simulator that lets users configure two compensation plans side-by-side and see the financial impact instantly:

- **Configure Tab** — Adjust personal discounts, override rates, override depth, and qualification rules across 3 tiers (Consultant, Leader, Leader of Leaders)
- **Financial Dashboard** — 6 real-time KPIs: total revenue, total payout, company margin, margin %, avg consultant payout, avg leader payout — with delta indicators
- **Revenue Waterfall** — Stacked waterfall chart showing gross revenue through discounts, overrides, down to net margin
- **Break-Even Analysis** — Line chart plotting current vs. proposed cost curves at up to 3x volume with crossover point detection
- **Comparison Table** — Side-by-side metrics with dollar deltas, percentage deltas, and color-coded indicators
- **4 Presets** — Default, Aggressive Overrides, Flat Structure, High Growth scenarios
- **Shareable Links** — Full state compressed and encoded in URL for team review

## Technical Highlights

- **Zero backend** — all calculations run client-side as pure functions, easily testable with no React dependencies
- **Zustand state management** handles ~5 interdependent state groups without excessive re-renders
- **URL state encoding** — full configuration compressed with lz-string into a `?s=` query param via debounced `history.replaceState`
- **Break-even crossover detection** — iterates over 200 volume scale points to find the exact crossover
- **Bilingual** — full EN/ES with the same i18n pattern used across the CushLabs portfolio
- **CushLabs design system** — Space Grotesk + Source Serif 4 + DM Mono, tier-specific color scheme, responsive grid, print styles
