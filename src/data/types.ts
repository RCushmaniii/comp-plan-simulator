export type TierId = "consultant" | "leader" | "leader_of_leaders";

export interface TierConfig {
  personalDiscountPct: number; // 0-100
  overrideRatePct: number; // 0-100
  overrideDepth: number; // 0-5
  minPersonalVolume: number; // minimum PV to qualify
  minTeamVolume: number; // minimum team volume to qualify
  minRecruits: number; // minimum direct recruits to qualify
}

export type CompensationPlan = Record<TierId, TierConfig>;

export interface NetworkParams {
  consultantHeadcount: number;
  leaderHeadcount: number;
  lolHeadcount: number;
  consultantAvgSales: number; // monthly avg per person
  leaderAvgSales: number;
  lolAvgSales: number;
  growthRatePct: number; // monthly growth rate
  promotionRatePct: number; // monthly promotion rate
  attritionRatePct: number; // monthly attrition rate
}

export interface TierFinancials {
  tierId: TierId;
  headcount: number;
  avgSales: number;
  totalSales: number;
  personalDiscountTotal: number;
  overrideTotal: number;
  totalPayout: number;
  avgPayout: number;
}

export interface DashboardResults {
  totalRevenue: number;
  totalPayout: number;
  companyMargin: number;
  marginPct: number;
  payoutRatio: number;
  tiers: Record<TierId, TierFinancials>;
}

export interface ComparisonResults {
  current: DashboardResults;
  proposed: DashboardResults;
  deltas: {
    totalRevenue: number;
    totalPayout: number;
    companyMargin: number;
    marginPct: number;
    payoutRatio: number;
  };
  deltaPcts: {
    totalRevenue: number;
    totalPayout: number;
    companyMargin: number;
    marginPct: number;
    payoutRatio: number;
  };
  breakEvenVolume: number | null; // null if no crossover
}

export interface WaterfallSegment {
  name: string;
  value: number;
  cumulative: number;
  isTotal?: boolean;
}

export interface BreakEvenPoint {
  volume: number;
  currentCost: number;
  proposedCost: number;
}

export interface Preset {
  id: string;
  plan: CompensationPlan;
  network: NetworkParams;
}
