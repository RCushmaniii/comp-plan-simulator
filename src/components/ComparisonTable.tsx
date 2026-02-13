"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocale } from "@/lib/locale-context";
import type { ComparisonResults } from "@/data/types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowRightLeft } from "lucide-react";

interface ComparisonTableProps {
  comparison: ComparisonResults;
}

function formatCurrency(value: number): string {
  if (Math.abs(value) >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`;
  }
  if (Math.abs(value) >= 1_000) {
    return `$${(value / 1_000).toFixed(1)}K`;
  }
  return `$${value.toFixed(0)}`;
}

export function ComparisonTable({ comparison }: ComparisonTableProps) {
  const { t } = useLocale();

  const rows: {
    label: string;
    currentVal: string;
    proposedVal: string;
    delta: string;
    deltaPct: string;
    positiveIsGood: boolean;
  }[] = [
    {
      label: t.totalRevenue,
      currentVal: formatCurrency(comparison.current.totalRevenue),
      proposedVal: formatCurrency(comparison.proposed.totalRevenue),
      delta: `${comparison.deltas.totalRevenue >= 0 ? "+" : ""}${formatCurrency(comparison.deltas.totalRevenue)}`,
      deltaPct: `${comparison.deltaPcts.totalRevenue >= 0 ? "+" : ""}${comparison.deltaPcts.totalRevenue.toFixed(1)}%`,
      positiveIsGood: true,
    },
    {
      label: t.totalPayout,
      currentVal: formatCurrency(comparison.current.totalPayout),
      proposedVal: formatCurrency(comparison.proposed.totalPayout),
      delta: `${comparison.deltas.totalPayout >= 0 ? "+" : ""}${formatCurrency(comparison.deltas.totalPayout)}`,
      deltaPct: `${comparison.deltaPcts.totalPayout >= 0 ? "+" : ""}${comparison.deltaPcts.totalPayout.toFixed(1)}%`,
      positiveIsGood: false,
    },
    {
      label: t.companyMargin,
      currentVal: formatCurrency(comparison.current.companyMargin),
      proposedVal: formatCurrency(comparison.proposed.companyMargin),
      delta: `${comparison.deltas.companyMargin >= 0 ? "+" : ""}${formatCurrency(comparison.deltas.companyMargin)}`,
      deltaPct: `${comparison.deltaPcts.companyMargin >= 0 ? "+" : ""}${comparison.deltaPcts.companyMargin.toFixed(1)}%`,
      positiveIsGood: true,
    },
    {
      label: t.marginPercent,
      currentVal: `${comparison.current.marginPct.toFixed(1)}%`,
      proposedVal: `${comparison.proposed.marginPct.toFixed(1)}%`,
      delta: `${comparison.deltas.marginPct >= 0 ? "+" : ""}${comparison.deltas.marginPct.toFixed(1)}pp`,
      deltaPct: `${comparison.deltaPcts.marginPct >= 0 ? "+" : ""}${comparison.deltaPcts.marginPct.toFixed(1)}%`,
      positiveIsGood: true,
    },
    {
      label: t.payoutRatio,
      currentVal: `${comparison.current.payoutRatio.toFixed(1)}%`,
      proposedVal: `${comparison.proposed.payoutRatio.toFixed(1)}%`,
      delta: `${comparison.deltas.payoutRatio >= 0 ? "+" : ""}${comparison.deltas.payoutRatio.toFixed(1)}pp`,
      deltaPct: `${comparison.deltaPcts.payoutRatio >= 0 ? "+" : ""}${comparison.deltaPcts.payoutRatio.toFixed(1)}%`,
      positiveIsGood: false,
    },
    {
      label: t.avgConsultantPayout,
      currentVal: `$${comparison.current.tiers.consultant.avgPayout.toLocaleString()}`,
      proposedVal: `$${comparison.proposed.tiers.consultant.avgPayout.toLocaleString()}`,
      delta: `${comparison.proposed.tiers.consultant.avgPayout - comparison.current.tiers.consultant.avgPayout >= 0 ? "+" : ""}$${(comparison.proposed.tiers.consultant.avgPayout - comparison.current.tiers.consultant.avgPayout).toLocaleString()}`,
      deltaPct: comparison.current.tiers.consultant.avgPayout > 0
        ? `${(((comparison.proposed.tiers.consultant.avgPayout - comparison.current.tiers.consultant.avgPayout) / comparison.current.tiers.consultant.avgPayout) * 100).toFixed(1)}%`
        : "0%",
      positiveIsGood: true,
    },
    {
      label: t.avgLeaderPayout,
      currentVal: `$${comparison.current.tiers.leader.avgPayout.toLocaleString()}`,
      proposedVal: `$${comparison.proposed.tiers.leader.avgPayout.toLocaleString()}`,
      delta: `${comparison.proposed.tiers.leader.avgPayout - comparison.current.tiers.leader.avgPayout >= 0 ? "+" : ""}$${(comparison.proposed.tiers.leader.avgPayout - comparison.current.tiers.leader.avgPayout).toLocaleString()}`,
      deltaPct: comparison.current.tiers.leader.avgPayout > 0
        ? `${(((comparison.proposed.tiers.leader.avgPayout - comparison.current.tiers.leader.avgPayout) / comparison.current.tiers.leader.avgPayout) * 100).toFixed(1)}%`
        : "0%",
      positiveIsGood: true,
    },
    {
      label: t.avgLoLPayout,
      currentVal: `$${comparison.current.tiers.leader_of_leaders.avgPayout.toLocaleString()}`,
      proposedVal: `$${comparison.proposed.tiers.leader_of_leaders.avgPayout.toLocaleString()}`,
      delta: `${comparison.proposed.tiers.leader_of_leaders.avgPayout - comparison.current.tiers.leader_of_leaders.avgPayout >= 0 ? "+" : ""}$${(comparison.proposed.tiers.leader_of_leaders.avgPayout - comparison.current.tiers.leader_of_leaders.avgPayout).toLocaleString()}`,
      deltaPct: comparison.current.tiers.leader_of_leaders.avgPayout > 0
        ? `${(((comparison.proposed.tiers.leader_of_leaders.avgPayout - comparison.current.tiers.leader_of_leaders.avgPayout) / comparison.current.tiers.leader_of_leaders.avgPayout) * 100).toFixed(1)}%`
        : "0%",
      positiveIsGood: true,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="font-display text-base flex items-center gap-2">
            <ArrowRightLeft className="w-5 h-5 text-muted-foreground" />
            {t.current} vs {t.proposed}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 pr-4 font-semibold text-muted-foreground">
                    {t.metric}
                  </th>
                  <th className="text-right py-2 px-4 font-semibold text-blue-600 dark:text-blue-400">
                    {t.current}
                  </th>
                  <th className="text-right py-2 px-4 font-semibold text-amber-600 dark:text-amber-400">
                    {t.proposed}
                  </th>
                  <th className="text-right py-2 px-4 font-semibold text-muted-foreground">
                    {t.delta}
                  </th>
                  <th className="text-right py-2 pl-4 font-semibold text-muted-foreground">
                    {t.deltaPercent}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => {
                  const numericDelta = parseFloat(row.delta.replace(/[^0-9.-]/g, ""));
                  const isPositive = numericDelta > 0;
                  const isNegative = numericDelta < 0;
                  const isGood = row.positiveIsGood ? isPositive : isNegative;
                  const isBad = row.positiveIsGood ? isNegative : isPositive;

                  return (
                    <tr key={row.label} className="border-b border-border/50 last:border-0">
                      <td className="py-2.5 pr-4 font-medium">{row.label}</td>
                      <td className="py-2.5 px-4 text-right font-mono tabular-nums">
                        {row.currentVal}
                      </td>
                      <td className="py-2.5 px-4 text-right font-mono tabular-nums">
                        {row.proposedVal}
                      </td>
                      <td
                        className={cn(
                          "py-2.5 px-4 text-right font-mono tabular-nums font-medium",
                          isGood && "text-emerald-600 dark:text-emerald-400",
                          isBad && "text-red-600 dark:text-red-400"
                        )}
                      >
                        {row.delta}
                      </td>
                      <td
                        className={cn(
                          "py-2.5 pl-4 text-right font-mono tabular-nums",
                          isGood && "text-emerald-600 dark:text-emerald-400",
                          isBad && "text-red-600 dark:text-red-400"
                        )}
                      >
                        {row.deltaPct}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
