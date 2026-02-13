import type { CompensationPlan, NetworkParams } from "./types";

/**
 * ⚠️ DISCLAIMER: All data below is illustrative dummy data.
 * It does not represent any real company's compensation plan.
 * Values are designed to produce realistic-looking outputs for demo purposes.
 */

export const defaultCurrentPlan: CompensationPlan = {
  consultant: {
    personalDiscountPct: 50,
    overrideRatePct: 0,
    overrideDepth: 0,
    minPersonalVolume: 100,
    minTeamVolume: 0,
    minRecruits: 0,
  },
  leader: {
    personalDiscountPct: 50,
    overrideRatePct: 5,
    overrideDepth: 1,
    minPersonalVolume: 200,
    minTeamVolume: 5000,
    minRecruits: 3,
  },
  leader_of_leaders: {
    personalDiscountPct: 50,
    overrideRatePct: 10,
    overrideDepth: 2,
    minPersonalVolume: 300,
    minTeamVolume: 25000,
    minRecruits: 5,
  },
};

export const defaultProposedPlan: CompensationPlan = {
  consultant: {
    personalDiscountPct: 50,
    overrideRatePct: 0,
    overrideDepth: 0,
    minPersonalVolume: 100,
    minTeamVolume: 0,
    minRecruits: 0,
  },
  leader: {
    personalDiscountPct: 50,
    overrideRatePct: 7,
    overrideDepth: 1,
    minPersonalVolume: 200,
    minTeamVolume: 5000,
    minRecruits: 3,
  },
  leader_of_leaders: {
    personalDiscountPct: 50,
    overrideRatePct: 12,
    overrideDepth: 2,
    minPersonalVolume: 300,
    minTeamVolume: 25000,
    minRecruits: 5,
  },
};

export const defaultNetwork: NetworkParams = {
  consultantHeadcount: 850,
  leaderHeadcount: 42,
  lolHeadcount: 3,
  consultantAvgSales: 2400,
  leaderAvgSales: 4000,
  lolAvgSales: 6000,
  growthRatePct: 5,
  promotionRatePct: 2,
  attritionRatePct: 3,
};
