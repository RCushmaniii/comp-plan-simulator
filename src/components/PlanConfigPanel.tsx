"use client";

import { TierConfigurator } from "./TierConfigurator";
import { PresetSelector } from "./PresetSelector";
import { useCompPlanStore } from "@/lib/store";
import { useLocale } from "@/lib/locale-context";
import type { TierId, TierConfig } from "@/data/types";

export function PlanConfigPanel() {
  const { t } = useLocale();
  const {
    currentPlan,
    proposedPlan,
    planView,
    setPlanView,
    updateCurrentTier,
    updateProposedTier,
  } = useCompPlanStore();

  const activePlan = planView === "current" ? currentPlan : proposedPlan;
  const updateFn = planView === "current" ? updateCurrentTier : updateProposedTier;

  const tierIds: TierId[] = ["consultant", "leader", "leader_of_leaders"];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="inline-flex rounded-lg border border-border p-1 bg-muted/50">
          <button
            onClick={() => setPlanView("current")}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all cursor-pointer ${
              planView === "current"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.currentPlan}
          </button>
          <button
            onClick={() => setPlanView("proposed")}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all cursor-pointer ${
              planView === "proposed"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.proposedPlan}
          </button>
        </div>
        <PresetSelector />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tierIds.map((tierId) => (
          <TierConfigurator
            key={`${planView}-${tierId}`}
            tierId={tierId}
            config={activePlan[tierId]}
            onUpdate={(field: keyof TierConfig, value: number) =>
              updateFn(tierId, field, value)
            }
          />
        ))}
      </div>
    </div>
  );
}
