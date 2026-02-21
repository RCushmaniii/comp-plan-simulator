# Roadmap: Terramar Brands Compatibility

> Research conducted 2026-02-21. This document captures the gap analysis between the current simulator and Terramar Brands' actual compensation structure, and outlines the work required to model their plan accurately.

## About Terramar Brands

- **Founded:** 2008 in Aguascalientes, Mexico
- **US Entity:** Terramar USA LLC, Miami FL — DSA member
- **Products:** Beauty and personal care (cosmetics, skincare, fragrances, haircare), $14–$104 retail, sold via monthly catalog
- **Market:** Primarily Hispanic/Latina women in Mexico and the US
- **Revenue:** Estimated $25–50M annually
- **Model:** Catalog-based direct selling + MLM network marketing ("venta por catalogo" + "multinivel")
- **Leadership pedigree:** Co-founders Ron Clark and Gonzalo Rubio Sr. came from Avon, Mary Kay, and Jafra — which explains the stairstep breakaway comp plan structure

## Terramar's Compensation Plan ("Programa de Linaje")

### 10 Ranks (vs. our 3 tiers)

| Level | Rank | Stars Required |
|-------|------|----------------|
| 1 | Independent Consultant (Consultora Independiente) | 0 |
| 2 | Independent Entrepreneur (Emprendedora Independiente) | 0 (group of 9) |
| 3 | Star Group Leader (Lider de Grupo Estrella) | 1 |
| 4 | 2-Star Group Leader | 2 |
| 5 | 3-Star Group Leader | 3 |
| 6 | 5-Star Executive Leader | 5 |
| 7 | 8-Star Executive Leader | 8 |
| 8 | 11-Star Group Leader | 11 |
| 9 | 15-Star Executive Leader | 15 |
| 10 | Independent Partner (Socia Independiente) | 20 |

A "star" = one consultant from your Central Group who has qualified as an Independent Entrepreneur (Level 2). Advancement requires building depth — your people must also build their own groups.

### Earning Streams

1. **Retail profit** — ~50% discount on wholesale (buy at $50, sell at $100 catalog price)
2. **Central Group commission** — 12% (Level 2) scaling to 20% (Level 10) on your direct team's volume
3. **Separated Group override** — 7–8% on breakaway teams' volume
4. **Second-line indirect** — 1% flat on your leaders' separated groups

### Commission Rates (verified and estimated)

| Level | Rank | Central Group % | Separated Group % | 2nd Line % |
|-------|------|-----------------|-------------------|------------|
| 1 | Independent Consultant | 0% (retail only) | — | — |
| 2 | Independent Entrepreneur | 12% | — | — |
| 3 | Star Group Leader | 13% | 7% | — |
| 4 | 2-Star Group Leader | 14% | 7% | 1% |
| 5 | 3-Star Group Leader | 15% | 7% | 1% |
| 6 | 5-Star Executive Leader | 16% | 7%+ | 1% |
| 7 | 8-Star Executive Leader | 17% | 7%+ | 1% |
| 8 | 11-Star Group Leader | 18% | 8%? | 1%? |
| 9 | 15-Star Executive Leader | 19%? | 8%? | 1%? |
| 10 | Independent Partner | 20% | 8% | 1% |

> Levels 1–4 and 10 are directly cited from official Programa de Linaje documents. Levels 5–9 are extrapolated from the 1%-per-level pattern. Official PDFs are image-based and could not be fully parsed.

### Qualification Requirements

- **Activation:** $180 USD starter module (US) / $2,000 MXN (Mexico)
- **Active status:** Purchase every 5 months (US); monthly $1,995 MXN orders (Mexico)
- **Level 2:** 9 active consultants, min 3 direct sponsors
- **Level 3:** 12 modules, 12 active, 9 ordering, 1 star
- **Level 4:** 15 modules, 15 active, 9 ordering, 2 stars
- **Level 10:** 50 modules, 50 active consultants, 20 stars

### Bonus Programs (not currently modeled)

- **Car program** — from Level 4 (2-Star) through Level 9 (Mercedes-Benz tier)
- **Jewelry rewards** — gold ring (Level 6), earrings (Level 7), necklace (Level 8)
- **Sponsoring bonus** — $1,000 USD for 3 new recruits (US market)
- **Level 10 bonus** — $1,000,000 MXN + life insurance policy
- **Travel incentives** — national and international trips starting at early levels

### Key Structural Concept: Breakaway/Separation

Terramar uses a **stairstep breakaway model** (same family as Avon, Mary Kay, Amway):

1. You build a **Central Group** — your direct recruits + their recruits who haven't yet qualified
2. When someone in your Central Group qualifies as Independent Entrepreneur, they **break away** — their group "separates"
3. You earn a **higher rate** on your Central Group (12–20%) and a **lower rate** on Separated Groups (7–8%)
4. Your Central Group commission rate **increases** as more people break away (more stars = higher rank)
5. Second-line indirect is a flat 1%

This is fundamentally different from our current proportional distribution model.

## Gap Analysis: Current Simulator vs. Terramar

| Feature | Current Simulator | Terramar Reality | Severity |
|---------|-------------------|------------------|----------|
| Number of tiers | 3 (hard-coded) | 10 levels | **Critical** |
| Override model | Proportional distribution (volume / leader count) | Breakaway/separation (Central vs Separated groups) | **Critical** |
| Earning streams | 2 (personal discount + override) | 4 (retail + central group + separated group + 2nd line) | **Critical** |
| Commission rates | Single flat rate per tier | Graduated 12–20% scaling with rank | **Significant** |
| 2nd line override | Half-rate at depth 2 | Flat 1% on indirect groups | **Significant** |
| Qualification metric | Raw recruit count (`minRecruits`) | Stars (qualified downline leaders) | **Significant** |
| Volume qualification | `minPersonalVolume` + `minTeamVolume` | Modules + active consultants + ordering consultants (3 separate metrics) | Moderate |
| Retail profit model | `personalDiscountPct` | ~50% markup on cost — conceptually similar | Minor |
| Bonus programs | Not modeled | Car, jewelry, sponsoring, travel, Level 10 bonus | **Significant** for total payout accuracy |

## Proposed Phases

### Phase 2A: Configurable Tier Count

**Goal:** Remove the hard-coded 3-tier limit so the simulator can represent 10 ranks.

- Make `TierId` dynamic (array of N tiers instead of union of 3)
- Update `CompensationPlan` type to support variable-length tier arrays
- Update `TierConfigurator` to render N tiers dynamically
- Update all chart components to handle N tiers with a generated color scale
- Update presets to demonstrate both 3-tier and 10-tier configurations
- Preserve backward compatibility with existing share links

### Phase 2B: Breakaway/Separation Model

**Goal:** Model the Central Group vs. Separated Group earning mechanics that Terramar (and Avon, Mary Kay, etc.) use.

- Add `centralGroupCommissionPct` and `separatedGroupOverridePct` as distinct earning types per tier
- Model group separation: when a downline qualifies at a threshold rank, their sub-group volume shifts from Central to Separated pool
- Implement graduated commission rates that increase with rank
- Replace proportional volume distribution with explicit group assignment
- Add flat second-line indirect rate (instead of half-rate depth model)

### Phase 2C: Star-Based Qualification

**Goal:** Replace raw recruit counts with "stars" (qualified downline leaders) as the advancement metric.

- Add qualification type selector: "recruits" vs "stars" (qualified leaders)
- Model the recursive qualification check (a star = someone who has themselves built a qualifying group)
- Add multi-dimensional qualification: modules + active consultants + ordering consultants as separate inputs
- Display qualification progress per tier in the UI

### Phase 3: Bonus Program Modeling (Optional)

**Goal:** Model car programs, sponsoring bonuses, and milestone rewards as additional cost line items.

- Add a bonus configuration panel with toggleable bonus types
- Include bonus costs in the waterfall chart and payout calculations
- Model qualification requirements for each bonus tier

## Strategic Decision Required

Before building any of this, the key question is:

1. **Generic demo / portfolio piece** — what we have is solid as-is. The 3-tier model communicates the concept clearly.
2. **Terramar-specific tool** — Phase 2A + 2B + 2C focused on the breakaway model. The UI components (charts, comparison table, KPIs) carry over; the data model and calculations get refactored.
3. **Configurable SaaS product** — make tier count, commission types, and qualification rules all configurable so it can model breakaway plans, unilevel plans, binary plans, etc. Most ambitious path.

## Sources

- [Programa de Linaje PDF (official)](https://webimages.terramarbrands.com.mx/documents/career/PROGRAMA_LINAJE_TERRAMAR.pdf)
- [2025 Career Program PDF (official)](https://webimages.terramarbrands.com.mx/documents/career/PROGRAMA_LINAJE_TERRAMAR_2025.pdf)
- [DSA Member Listing](https://www.dsa.org/forms/CompanyFormPublicMembers/view?id=6B86D60000007E)
- [Terramar USA Career Page](https://www.terramarbrandsusa.com/career)
- [Terramar Brands Pioneers](https://brandsterramar.wordpress.com/pioneros/)
