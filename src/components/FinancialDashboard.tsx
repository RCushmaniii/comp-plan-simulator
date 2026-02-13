"use client";

import { KpiCard } from "./KpiCard";
import { useCompPlanStore } from "@/lib/store";
import { useLocale } from "@/lib/locale-context";
import { computeDashboard } from "@/lib/calculations";
import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";

function formatCurrency(value: number): string {
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`;
  }
  if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(0)}K`;
  }
  return `$${value.toFixed(0)}`;
}

export function FinancialDashboard() {
  const { t } = useLocale();
  const { currentPlan, proposedPlan, network, planView } = useCompPlanStore();

  const activePlan = planView === "current" ? currentPlan : proposedPlan;
  const otherPlan = planView === "current" ? proposedPlan : currentPlan;
  const dashboard = computeDashboard(activePlan, network);
  const otherDashboard = computeDashboard(otherPlan, network);

  const kpis: {
    label: string;
    value: string;
    delta?: string;
    deltaType?: "positive" | "negative" | "neutral";
  }[] = [
    {
      label: t.totalRevenue,
      value: formatCurrency(dashboard.totalRevenue),
    },
    {
      label: t.totalPayout,
      value: formatCurrency(dashboard.totalPayout),
      delta: `${dashboard.totalPayout > otherDashboard.totalPayout ? "+" : ""}${formatCurrency(dashboard.totalPayout - otherDashboard.totalPayout)} vs ${planView === "current" ? t.proposedPlan : t.currentPlan}`,
      deltaType:
        dashboard.totalPayout > otherDashboard.totalPayout
          ? "negative"
          : dashboard.totalPayout < otherDashboard.totalPayout
            ? "positive"
            : "neutral",
    },
    {
      label: t.companyMargin,
      value: formatCurrency(dashboard.companyMargin),
      delta: `${dashboard.companyMargin > otherDashboard.companyMargin ? "+" : ""}${formatCurrency(dashboard.companyMargin - otherDashboard.companyMargin)}`,
      deltaType:
        dashboard.companyMargin > otherDashboard.companyMargin
          ? "positive"
          : dashboard.companyMargin < otherDashboard.companyMargin
            ? "negative"
            : "neutral",
    },
    {
      label: t.marginPercent,
      value: `${dashboard.marginPct.toFixed(1)}%`,
      delta: `${(dashboard.marginPct - otherDashboard.marginPct) > 0 ? "+" : ""}${(dashboard.marginPct - otherDashboard.marginPct).toFixed(1)}pp`,
      deltaType:
        dashboard.marginPct > otherDashboard.marginPct
          ? "positive"
          : dashboard.marginPct < otherDashboard.marginPct
            ? "negative"
            : "neutral",
    },
    {
      label: t.avgConsultantPayout,
      value: `$${dashboard.tiers.consultant.avgPayout.toLocaleString()}`,
    },
    {
      label: t.avgLeaderPayout,
      value: `$${dashboard.tiers.leader.avgPayout.toLocaleString()}`,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="space-y-3"
    >
      <h3 className="font-display text-lg font-semibold flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-muted-foreground" />
        {t.financialDashboard}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </div>
    </motion.div>
  );
}
