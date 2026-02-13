"use client";

import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocale } from "@/lib/locale-context";
import { useTheme } from "@/lib/theme-context";
import { computeDashboard } from "@/lib/calculations";
import type { CompensationPlan, NetworkParams } from "@/data/types";
import { motion } from "framer-motion";

interface PayoutDistributionChartProps {
  plan: CompensationPlan;
  network: NetworkParams;
  title?: string;
}

export function PayoutDistributionChart({
  plan,
  network,
  title,
}: PayoutDistributionChartProps) {
  const { t } = useLocale();
  const { theme } = useTheme();

  const data = useMemo(() => {
    const dashboard = computeDashboard(plan, network);
    return [
      {
        name: t.tierConsultant,
        personal: dashboard.tiers.consultant.personalDiscountTotal,
        overrides: dashboard.tiers.consultant.overrideTotal,
      },
      {
        name: t.tierLeader,
        personal: dashboard.tiers.leader.personalDiscountTotal,
        overrides: dashboard.tiers.leader.overrideTotal,
      },
      {
        name: t.tierLoL,
        personal: dashboard.tiers.leader_of_leaders.personalDiscountTotal,
        overrides: dashboard.tiers.leader_of_leaders.overrideTotal,
      },
    ];
  }, [plan, network, t]);

  const textColor = theme === "dark" ? "#a1a1aa" : "#71717a";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.25 }}
    >
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="font-display text-base">
            {title ?? t.payoutDistribution}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data} barCategoryGap="20%">
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis
                dataKey="name"
                tick={{ fill: textColor, fontSize: 12 }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: textColor, fontSize: 12 }}
                tickFormatter={(v) =>
                  v >= 1000000
                    ? `$${(v / 1000000).toFixed(1)}M`
                    : `$${(v / 1000).toFixed(0)}K`
                }
                tickLine={false}
              />
              <Tooltip
                formatter={(value) => `$${Number(value).toLocaleString()}`}
                contentStyle={{
                  backgroundColor: theme === "dark" ? "#1f1f23" : "#fff",
                  border: `1px solid ${theme === "dark" ? "#333" : "#e5e7eb"}`,
                  borderRadius: "8px",
                  fontSize: "13px",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Bar
                dataKey="personal"
                name={t.personalDiscount}
                stackId="a"
                fill="#3b82f6"
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="overrides"
                name={t.overrideRate}
                stackId="a"
                fill="#8b5cf6"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}
