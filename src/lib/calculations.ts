import type {
  CompensationPlan,
  NetworkParams,
  TierId,
  TierFinancials,
  DashboardResults,
  ComparisonResults,
  WaterfallSegment,
  BreakEvenPoint,
} from "@/data/types";

export function roundCurrency(value: number): number {
  return Math.round(value * 100) / 100;
}

/**
 * Compute financials for a single tier.
 * Override logic: bottom-up proportional model.
 * - Consultants earn personal discount only (no downline).
 * - Leaders earn personal discount + override on consultant volume assigned to them.
 * - LoLs earn personal discount + override on leader volume (and cascade through depth).
 */
export function computeTierFinancials(
  tierId: TierId,
  plan: CompensationPlan,
  network: NetworkParams
): TierFinancials {
  const config = plan[tierId];

  const headcountMap: Record<TierId, number> = {
    consultant: network.consultantHeadcount,
    leader: network.leaderHeadcount,
    leader_of_leaders: network.lolHeadcount,
  };

  const avgSalesMap: Record<TierId, number> = {
    consultant: network.consultantAvgSales,
    leader: network.leaderAvgSales,
    leader_of_leaders: network.lolAvgSales,
  };

  const headcount = headcountMap[tierId];
  const avgSales = avgSalesMap[tierId];
  const totalSales = headcount * avgSales;
  const personalDiscountTotal = roundCurrency(
    totalSales * (config.personalDiscountPct / 100)
  );

  let overrideTotal = 0;

  if (tierId === "leader" && config.overrideDepth >= 1) {
    // Leaders override on consultant volume, distributed proportionally
    const totalConsultantSales =
      network.consultantHeadcount * network.consultantAvgSales;
    const leaderCount = Math.max(network.leaderHeadcount, 1);
    const assignedVolume = totalConsultantSales / leaderCount;
    overrideTotal = roundCurrency(
      assignedVolume * (config.overrideRatePct / 100) * leaderCount
    );
  }

  if (tierId === "leader_of_leaders") {
    const lolCount = Math.max(network.lolHeadcount, 1);

    if (config.overrideDepth >= 1) {
      // LoL overrides on leader volume
      const totalLeaderSales = network.leaderHeadcount * network.leaderAvgSales;
      const assignedLeaderVolume = totalLeaderSales / lolCount;
      overrideTotal += roundCurrency(
        assignedLeaderVolume * (config.overrideRatePct / 100) * lolCount
      );
    }

    if (config.overrideDepth >= 2) {
      // LoL also overrides on consultant volume (second level deep)
      const totalConsultantSales =
        network.consultantHeadcount * network.consultantAvgSales;
      const assignedConsultantVolume = totalConsultantSales / lolCount;
      // Deeper override at half rate
      overrideTotal += roundCurrency(
        assignedConsultantVolume *
          (config.overrideRatePct / 100) *
          0.5 *
          lolCount
      );
    }
  }

  const totalPayout = roundCurrency(personalDiscountTotal + overrideTotal);
  const avgPayout = headcount > 0 ? roundCurrency(totalPayout / headcount) : 0;

  return {
    tierId,
    headcount,
    avgSales,
    totalSales,
    personalDiscountTotal,
    overrideTotal,
    totalPayout,
    avgPayout,
  };
}

/**
 * Aggregate financials across all tiers.
 */
export function computeDashboard(
  plan: CompensationPlan,
  network: NetworkParams
): DashboardResults {
  const tierIds: TierId[] = ["consultant", "leader", "leader_of_leaders"];
  const tiers = {} as Record<TierId, TierFinancials>;

  let totalRevenue = 0;
  let totalPayout = 0;

  for (const tierId of tierIds) {
    const financials = computeTierFinancials(tierId, plan, network);
    tiers[tierId] = financials;
    totalRevenue += financials.totalSales;
    totalPayout += financials.totalPayout;
  }

  totalRevenue = roundCurrency(totalRevenue);
  totalPayout = roundCurrency(totalPayout);
  const companyMargin = roundCurrency(totalRevenue - totalPayout);
  const marginPct =
    totalRevenue > 0
      ? roundCurrency((companyMargin / totalRevenue) * 100)
      : 0;
  const payoutRatio =
    totalRevenue > 0
      ? roundCurrency((totalPayout / totalRevenue) * 100)
      : 0;

  return {
    totalRevenue,
    totalPayout,
    companyMargin,
    marginPct,
    payoutRatio,
    tiers,
  };
}

/**
 * Compare two plans and compute deltas + break-even volume.
 */
export function computeComparison(
  currentPlan: CompensationPlan,
  proposedPlan: CompensationPlan,
  network: NetworkParams
): ComparisonResults {
  const current = computeDashboard(currentPlan, network);
  const proposed = computeDashboard(proposedPlan, network);

  const deltaKeys = [
    "totalRevenue",
    "totalPayout",
    "companyMargin",
    "marginPct",
    "payoutRatio",
  ] as const;

  const deltas = {} as ComparisonResults["deltas"];
  const deltaPcts = {} as ComparisonResults["deltaPcts"];

  for (const key of deltaKeys) {
    deltas[key] = roundCurrency(proposed[key] - current[key]);
    deltaPcts[key] =
      current[key] !== 0
        ? roundCurrency(((proposed[key] - current[key]) / Math.abs(current[key])) * 100)
        : 0;
  }

  // Find break-even volume by scaling network headcounts proportionally
  let breakEvenVolume: number | null = null;
  const steps = 200;
  const maxMultiplier = 3;

  for (let i = 1; i <= steps; i++) {
    const multiplier = (i / steps) * maxMultiplier;
    const scaledNetwork: NetworkParams = {
      ...network,
      consultantHeadcount: Math.round(network.consultantHeadcount * multiplier),
      leaderHeadcount: Math.round(network.leaderHeadcount * multiplier),
      lolHeadcount: Math.max(1, Math.round(network.lolHeadcount * multiplier)),
    };

    const curDash = computeDashboard(currentPlan, scaledNetwork);
    const propDash = computeDashboard(proposedPlan, scaledNetwork);

    const curCost = curDash.totalPayout;
    const propCost = propDash.totalPayout;

    // Check for crossover (current cheaper → proposed cheaper or vice versa)
    if (i > 1) {
      const prevMultiplier = ((i - 1) / steps) * maxMultiplier;
      const prevNetwork: NetworkParams = {
        ...network,
        consultantHeadcount: Math.round(
          network.consultantHeadcount * prevMultiplier
        ),
        leaderHeadcount: Math.round(
          network.leaderHeadcount * prevMultiplier
        ),
        lolHeadcount: Math.max(
          1,
          Math.round(network.lolHeadcount * prevMultiplier)
        ),
      };
      const prevCur = computeDashboard(currentPlan, prevNetwork);
      const prevProp = computeDashboard(proposedPlan, prevNetwork);

      const prevDiff = prevCur.totalPayout - prevProp.totalPayout;
      const curDiff = curCost - propCost;

      if (prevDiff * curDiff < 0) {
        // Sign changed — crossover found
        const totalVolume =
          scaledNetwork.consultantHeadcount * network.consultantAvgSales +
          scaledNetwork.leaderHeadcount * network.leaderAvgSales +
          scaledNetwork.lolHeadcount * network.lolAvgSales;
        breakEvenVolume = Math.round(totalVolume);
        break;
      }
    }
  }

  return { current, proposed, deltas, deltaPcts, breakEvenVolume };
}

/**
 * Compute waterfall segments showing dollar allocation from revenue to margin.
 */
export function computeWaterfall(dashboard: DashboardResults): WaterfallSegment[] {
  const segments: WaterfallSegment[] = [];
  let cumulative = dashboard.totalRevenue;

  segments.push({
    name: "grossRevenue",
    value: dashboard.totalRevenue,
    cumulative,
    isTotal: true,
  });

  const consultantDiscount = dashboard.tiers.consultant.personalDiscountTotal;
  cumulative -= consultantDiscount;
  segments.push({
    name: "consultantDiscounts",
    value: -consultantDiscount,
    cumulative,
  });

  const leaderTotal = dashboard.tiers.leader.totalPayout;
  cumulative -= leaderTotal;
  segments.push({
    name: "leaderOverrides",
    value: -leaderTotal,
    cumulative,
  });

  const lolTotal = dashboard.tiers.leader_of_leaders.totalPayout;
  cumulative -= lolTotal;
  segments.push({
    name: "lolOverrides",
    value: -lolTotal,
    cumulative,
  });

  segments.push({
    name: "netMargin",
    value: dashboard.companyMargin,
    cumulative: dashboard.companyMargin,
    isTotal: true,
  });

  return segments;
}

/**
 * Compute cost curves at varying volumes for break-even chart.
 */
export function computeBreakEvenCurve(
  currentPlan: CompensationPlan,
  proposedPlan: CompensationPlan,
  network: NetworkParams,
  points: number = 50
): BreakEvenPoint[] {
  const data: BreakEvenPoint[] = [];
  const maxMultiplier = 3;

  for (let i = 1; i <= points; i++) {
    const multiplier = (i / points) * maxMultiplier;
    const scaledNetwork: NetworkParams = {
      ...network,
      consultantHeadcount: Math.round(network.consultantHeadcount * multiplier),
      leaderHeadcount: Math.round(network.leaderHeadcount * multiplier),
      lolHeadcount: Math.max(1, Math.round(network.lolHeadcount * multiplier)),
    };

    const totalVolume =
      scaledNetwork.consultantHeadcount * network.consultantAvgSales +
      scaledNetwork.leaderHeadcount * network.leaderAvgSales +
      scaledNetwork.lolHeadcount * network.lolAvgSales;

    const curDash = computeDashboard(currentPlan, scaledNetwork);
    const propDash = computeDashboard(proposedPlan, scaledNetwork);

    data.push({
      volume: Math.round(totalVolume),
      currentCost: roundCurrency(curDash.totalPayout),
      proposedCost: roundCurrency(propDash.totalPayout),
    });
  }

  return data;
}
