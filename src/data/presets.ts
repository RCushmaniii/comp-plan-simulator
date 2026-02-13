import type { Preset } from "./types";
import { defaultNetwork } from "./defaults";

export const presets: Preset[] = [
  {
    id: "default",
    plan: {
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
    },
    network: { ...defaultNetwork },
  },
  {
    id: "aggressive",
    plan: {
      consultant: {
        personalDiscountPct: 45,
        overrideRatePct: 0,
        overrideDepth: 0,
        minPersonalVolume: 150,
        minTeamVolume: 0,
        minRecruits: 0,
      },
      leader: {
        personalDiscountPct: 45,
        overrideRatePct: 10,
        overrideDepth: 2,
        minPersonalVolume: 250,
        minTeamVolume: 8000,
        minRecruits: 5,
      },
      leader_of_leaders: {
        personalDiscountPct: 45,
        overrideRatePct: 15,
        overrideDepth: 3,
        minPersonalVolume: 400,
        minTeamVolume: 30000,
        minRecruits: 8,
      },
    },
    network: { ...defaultNetwork },
  },
  {
    id: "flat",
    plan: {
      consultant: {
        personalDiscountPct: 40,
        overrideRatePct: 0,
        overrideDepth: 0,
        minPersonalVolume: 50,
        minTeamVolume: 0,
        minRecruits: 0,
      },
      leader: {
        personalDiscountPct: 42,
        overrideRatePct: 3,
        overrideDepth: 1,
        minPersonalVolume: 100,
        minTeamVolume: 3000,
        minRecruits: 2,
      },
      leader_of_leaders: {
        personalDiscountPct: 44,
        overrideRatePct: 5,
        overrideDepth: 1,
        minPersonalVolume: 150,
        minTeamVolume: 10000,
        minRecruits: 3,
      },
    },
    network: { ...defaultNetwork },
  },
  {
    id: "highGrowth",
    plan: {
      consultant: {
        personalDiscountPct: 55,
        overrideRatePct: 0,
        overrideDepth: 0,
        minPersonalVolume: 75,
        minTeamVolume: 0,
        minRecruits: 0,
      },
      leader: {
        personalDiscountPct: 55,
        overrideRatePct: 8,
        overrideDepth: 2,
        minPersonalVolume: 150,
        minTeamVolume: 4000,
        minRecruits: 4,
      },
      leader_of_leaders: {
        personalDiscountPct: 55,
        overrideRatePct: 12,
        overrideDepth: 3,
        minPersonalVolume: 200,
        minTeamVolume: 20000,
        minRecruits: 6,
      },
    },
    network: {
      ...defaultNetwork,
      growthRatePct: 10,
      promotionRatePct: 4,
      attritionRatePct: 5,
    },
  },
];
