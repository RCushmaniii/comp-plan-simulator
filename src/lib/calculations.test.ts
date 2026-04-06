import { describe, it, expect } from "vitest";
import {
  roundCurrency,
  computeTierFinancials,
  computeDashboard,
  computeComparison,
  computeWaterfall,
  computeBreakEvenCurve,
} from "./calculations";
import {
  defaultCurrentPlan,
  defaultProposedPlan,
  defaultNetwork,
} from "@/data/defaults";
import type { CompensationPlan, NetworkParams } from "@/data/types";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Minimal network for deterministic hand-verifiable math */
const simpleNetwork: NetworkParams = {
  consultantHeadcount: 100,
  leaderHeadcount: 10,
  lolHeadcount: 1,
  consultantAvgSales: 1000,
  leaderAvgSales: 2000,
  lolAvgSales: 3000,
  growthRatePct: 0,
  promotionRatePct: 0,
  attritionRatePct: 0,
};

const simplePlan: CompensationPlan = {
  consultant: {
    personalDiscountPct: 25,
    overrideRatePct: 0,
    overrideDepth: 0,
    minPersonalVolume: 0,
    minTeamVolume: 0,
    minRecruits: 0,
  },
  leader: {
    personalDiscountPct: 25,
    overrideRatePct: 5,
    overrideDepth: 1,
    minPersonalVolume: 0,
    minTeamVolume: 0,
    minRecruits: 0,
  },
  leader_of_leaders: {
    personalDiscountPct: 25,
    overrideRatePct: 10,
    overrideDepth: 2,
    minPersonalVolume: 0,
    minTeamVolume: 0,
    minRecruits: 0,
  },
};

// ---------------------------------------------------------------------------
// roundCurrency
// ---------------------------------------------------------------------------

describe("roundCurrency", () => {
  it("rounds to 2 decimal places", () => {
    expect(roundCurrency(1.005)).toBe(1);
    expect(roundCurrency(1.555)).toBe(1.56);
    expect(roundCurrency(0.1 + 0.2)).toBe(0.3);
  });

  it("returns whole numbers unchanged", () => {
    expect(roundCurrency(42)).toBe(42);
    expect(roundCurrency(0)).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// computeTierFinancials
// ---------------------------------------------------------------------------

describe("computeTierFinancials", () => {
  describe("consultant tier", () => {
    it("earns personal discount only — no overrides", () => {
      const result = computeTierFinancials("consultant", simplePlan, simpleNetwork);
      // 100 consultants * $1000 = $100,000 total sales
      expect(result.totalSales).toBe(100_000);
      // 25% discount on $100k = $25,000
      expect(result.personalDiscountTotal).toBe(25_000);
      expect(result.overrideTotal).toBe(0);
      expect(result.totalPayout).toBe(25_000);
      expect(result.avgPayout).toBe(250);
    });
  });

  describe("leader tier", () => {
    it("earns personal discount + override on consultant volume", () => {
      const result = computeTierFinancials("leader", simplePlan, simpleNetwork);
      // 10 leaders * $2000 = $20,000 total sales
      expect(result.totalSales).toBe(20_000);
      // 25% discount on $20k = $5,000
      expect(result.personalDiscountTotal).toBe(5_000);
      // Override: $100k consultant volume / 10 leaders = $10k each * 5% * 10 = $5,000
      expect(result.overrideTotal).toBe(5_000);
      expect(result.totalPayout).toBe(10_000);
      expect(result.avgPayout).toBe(1_000);
    });

    it("earns no override when overrideDepth is 0", () => {
      const noOverridePlan: CompensationPlan = {
        ...simplePlan,
        leader: { ...simplePlan.leader, overrideDepth: 0 },
      };
      const result = computeTierFinancials("leader", noOverridePlan, simpleNetwork);
      expect(result.overrideTotal).toBe(0);
      expect(result.totalPayout).toBe(5_000);
    });
  });

  describe("leader_of_leaders tier", () => {
    it("earns override on leader volume at depth 1", () => {
      const depth1Plan: CompensationPlan = {
        ...simplePlan,
        leader_of_leaders: { ...simplePlan.leader_of_leaders, overrideDepth: 1 },
      };
      const result = computeTierFinancials("leader_of_leaders", depth1Plan, simpleNetwork);
      // Personal: 1 * $3000 * 25% = $750
      expect(result.personalDiscountTotal).toBe(750);
      // Override on leader volume only: $20k leader sales / 1 LoL * 10% * 1 = $2,000
      expect(result.overrideTotal).toBe(2_000);
      expect(result.totalPayout).toBe(2_750);
    });

    it("adds second-level override at half rate when depth >= 2", () => {
      const result = computeTierFinancials("leader_of_leaders", simplePlan, simpleNetwork);
      // Personal: $750
      expect(result.personalDiscountTotal).toBe(750);
      // Depth 1: $20k * 10% = $2,000
      // Depth 2: $100k * 10% * 0.5 = $5,000
      // Total override: $7,000
      expect(result.overrideTotal).toBe(7_000);
      expect(result.totalPayout).toBe(7_750);
    });
  });

  describe("edge cases", () => {
    it("handles zero headcount without division error", () => {
      const emptyNetwork: NetworkParams = { ...simpleNetwork, consultantHeadcount: 0 };
      const result = computeTierFinancials("consultant", simplePlan, emptyNetwork);
      expect(result.totalSales).toBe(0);
      expect(result.totalPayout).toBe(0);
      expect(result.avgPayout).toBe(0);
    });

    it("handles 0% discount", () => {
      const zeroPlan: CompensationPlan = {
        ...simplePlan,
        consultant: { ...simplePlan.consultant, personalDiscountPct: 0 },
      };
      const result = computeTierFinancials("consultant", zeroPlan, simpleNetwork);
      expect(result.personalDiscountTotal).toBe(0);
      expect(result.totalPayout).toBe(0);
    });

    it("handles 100% discount", () => {
      const maxPlan: CompensationPlan = {
        ...simplePlan,
        consultant: { ...simplePlan.consultant, personalDiscountPct: 100 },
      };
      const result = computeTierFinancials("consultant", maxPlan, simpleNetwork);
      expect(result.personalDiscountTotal).toBe(100_000);
    });
  });
});

// ---------------------------------------------------------------------------
// computeDashboard
// ---------------------------------------------------------------------------

describe("computeDashboard", () => {
  it("aggregates revenue across all tiers", () => {
    const result = computeDashboard(simplePlan, simpleNetwork);
    // Consultant: 100*1000 + Leader: 10*2000 + LoL: 1*3000 = $123,000
    expect(result.totalRevenue).toBe(123_000);
  });

  it("sums payout across all tiers", () => {
    const result = computeDashboard(simplePlan, simpleNetwork);
    // Consultant: 25000 + Leader: 10000 + LoL: 7750 = 42750
    expect(result.totalPayout).toBe(42_750);
  });

  it("computes margin as revenue minus payout", () => {
    const result = computeDashboard(simplePlan, simpleNetwork);
    expect(result.companyMargin).toBe(123_000 - 42_750);
  });

  it("computes margin percentage correctly", () => {
    const result = computeDashboard(simplePlan, simpleNetwork);
    const expectedPct = roundCurrency(((123_000 - 42_750) / 123_000) * 100);
    expect(result.marginPct).toBe(expectedPct);
  });

  it("computes payout ratio correctly", () => {
    const result = computeDashboard(simplePlan, simpleNetwork);
    const expectedRatio = roundCurrency((42_750 / 123_000) * 100);
    expect(result.payoutRatio).toBe(expectedRatio);
  });

  it("handles zero revenue without division error", () => {
    const zeroNetwork: NetworkParams = {
      ...simpleNetwork,
      consultantHeadcount: 0,
      leaderHeadcount: 0,
      lolHeadcount: 0,
    };
    const result = computeDashboard(simplePlan, zeroNetwork);
    expect(result.totalRevenue).toBe(0);
    expect(result.marginPct).toBe(0);
    expect(result.payoutRatio).toBe(0);
  });

  it("works with default production data without errors", () => {
    const result = computeDashboard(defaultCurrentPlan, defaultNetwork);
    expect(result.totalRevenue).toBeGreaterThan(0);
    expect(result.companyMargin).toBeGreaterThan(0);
    expect(result.marginPct).toBeGreaterThan(0);
    expect(result.marginPct).toBeLessThan(100);
  });
});

// ---------------------------------------------------------------------------
// computeComparison
// ---------------------------------------------------------------------------

describe("computeComparison", () => {
  it("computes deltas between current and proposed", () => {
    const result = computeComparison(defaultCurrentPlan, defaultProposedPlan, defaultNetwork);
    expect(result.deltas.totalRevenue).toBe(0); // same network = same revenue
    // proposed has higher override rates, so higher payout
    expect(result.deltas.totalPayout).toBeGreaterThan(0);
    // higher payout = lower margin
    expect(result.deltas.companyMargin).toBeLessThan(0);
  });

  it("returns zero deltas when plans are identical", () => {
    const result = computeComparison(defaultCurrentPlan, defaultCurrentPlan, defaultNetwork);
    expect(result.deltas.totalRevenue).toBe(0);
    expect(result.deltas.totalPayout).toBe(0);
    expect(result.deltas.companyMargin).toBe(0);
    expect(result.deltas.marginPct).toBe(0);
    expect(result.breakEvenVolume).toBeNull();
  });

  it("computes percentage deltas correctly", () => {
    const result = computeComparison(defaultCurrentPlan, defaultProposedPlan, defaultNetwork);
    // deltaPct should be (proposed - current) / |current| * 100
    const expectedPayoutPct = roundCurrency(
      ((result.proposed.totalPayout - result.current.totalPayout) /
        Math.abs(result.current.totalPayout)) *
        100
    );
    expect(result.deltaPcts.totalPayout).toBe(expectedPayoutPct);
  });
});

// ---------------------------------------------------------------------------
// computeWaterfall
// ---------------------------------------------------------------------------

describe("computeWaterfall", () => {
  it("produces 5 segments", () => {
    const dashboard = computeDashboard(simplePlan, simpleNetwork);
    const waterfall = computeWaterfall(dashboard);
    expect(waterfall).toHaveLength(5);
  });

  it("starts with gross revenue and ends with net margin", () => {
    const dashboard = computeDashboard(simplePlan, simpleNetwork);
    const waterfall = computeWaterfall(dashboard);
    expect(waterfall[0].name).toBe("grossRevenue");
    expect(waterfall[0].value).toBe(dashboard.totalRevenue);
    expect(waterfall[0].isTotal).toBe(true);
    expect(waterfall[4].name).toBe("netMargin");
    expect(waterfall[4].value).toBe(dashboard.companyMargin);
    expect(waterfall[4].isTotal).toBe(true);
  });

  it("intermediate segments are negative (costs)", () => {
    const dashboard = computeDashboard(simplePlan, simpleNetwork);
    const waterfall = computeWaterfall(dashboard);
    expect(waterfall[1].value).toBeLessThan(0); // consultant discounts
    expect(waterfall[2].value).toBeLessThan(0); // leader overrides
    expect(waterfall[3].value).toBeLessThan(0); // LoL overrides
  });

  it("cumulative values are consistent (revenue minus costs = margin)", () => {
    const dashboard = computeDashboard(simplePlan, simpleNetwork);
    const waterfall = computeWaterfall(dashboard);
    const totalCosts =
      waterfall[1].value + waterfall[2].value + waterfall[3].value;
    expect(roundCurrency(waterfall[0].value + totalCosts)).toBe(
      waterfall[4].value
    );
  });
});

// ---------------------------------------------------------------------------
// computeBreakEvenCurve
// ---------------------------------------------------------------------------

describe("computeBreakEvenCurve", () => {
  it("returns the requested number of data points", () => {
    const curve = computeBreakEvenCurve(
      defaultCurrentPlan,
      defaultProposedPlan,
      defaultNetwork,
      25
    );
    expect(curve).toHaveLength(25);
  });

  it("volumes increase monotonically", () => {
    const curve = computeBreakEvenCurve(
      defaultCurrentPlan,
      defaultProposedPlan,
      defaultNetwork,
      50
    );
    for (let i = 1; i < curve.length; i++) {
      expect(curve[i].volume).toBeGreaterThanOrEqual(curve[i - 1].volume);
    }
  });

  it("each point has non-negative costs", () => {
    const curve = computeBreakEvenCurve(
      defaultCurrentPlan,
      defaultProposedPlan,
      defaultNetwork,
      50
    );
    for (const point of curve) {
      expect(point.currentCost).toBeGreaterThanOrEqual(0);
      expect(point.proposedCost).toBeGreaterThanOrEqual(0);
    }
  });

  it("identical plans produce identical cost curves", () => {
    const curve = computeBreakEvenCurve(
      defaultCurrentPlan,
      defaultCurrentPlan,
      defaultNetwork,
      10
    );
    for (const point of curve) {
      expect(point.currentCost).toBe(point.proposedCost);
    }
  });
});
