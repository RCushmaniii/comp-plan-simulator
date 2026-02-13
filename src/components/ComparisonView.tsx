"use client";

import { useMemo } from "react";
import { ComparisonTable } from "./ComparisonTable";
import { BreakEvenChart } from "./BreakEvenChart";
import { PayoutDistributionChart } from "./PayoutDistributionChart";
import { useCompPlanStore } from "@/lib/store";
import { useLocale } from "@/lib/locale-context";
import { computeComparison } from "@/lib/calculations";

export function ComparisonView() {
  const { t } = useLocale();
  const { currentPlan, proposedPlan, network } = useCompPlanStore();

  const comparison = useMemo(
    () => computeComparison(currentPlan, proposedPlan, network),
    [currentPlan, proposedPlan, network]
  );

  return (
    <div className="space-y-6">
      <ComparisonTable comparison={comparison} />

      <BreakEvenChart
        currentPlan={currentPlan}
        proposedPlan={proposedPlan}
        network={network}
        breakEvenVolume={comparison.breakEvenVolume}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PayoutDistributionChart
          plan={currentPlan}
          network={network}
          title={`${t.payoutDistribution} — ${t.current}`}
        />
        <PayoutDistributionChart
          plan={proposedPlan}
          network={network}
          title={`${t.payoutDistribution} — ${t.proposed}`}
        />
      </div>
    </div>
  );
}
