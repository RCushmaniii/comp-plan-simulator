"use client";

import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocale } from "@/lib/locale-context";
import { useTheme } from "@/lib/theme-context";
import { computeDashboard, computeWaterfall } from "@/lib/calculations";
import type { CompensationPlan, NetworkParams } from "@/data/types";
import { motion } from "framer-motion";

interface WaterfallChartProps {
  plan: CompensationPlan;
  network: NetworkParams;
}

const SEGMENT_COLORS: Record<string, string> = {
  grossRevenue: "#6b7280",
  consultantDiscounts: "#3b82f6",
  leaderOverrides: "#f59e0b",
  lolOverrides: "#8b5cf6",
  netMargin: "#10b981",
};

export function WaterfallChart({ plan, network }: WaterfallChartProps) {
  const { t } = useLocale();
  const { theme } = useTheme();

  const nameMap: Record<string, string> = {
    grossRevenue: t.grossRevenue,
    consultantDiscounts: t.consultantDiscounts,
    leaderOverrides: t.leaderOverrides,
    lolOverrides: t.lolOverrides,
    netMargin: t.netMargin,
  };

  const data = useMemo(() => {
    const dashboard = computeDashboard(plan, network);
    const segments = computeWaterfall(dashboard);

    return segments.map((seg) => {
      if (seg.isTotal) {
        return {
          name: nameMap[seg.name] ?? seg.name,
          invisible: 0,
          visible: seg.value,
          key: seg.name,
        };
      }
      return {
        name: nameMap[seg.name] ?? seg.name,
        invisible: seg.cumulative,
        visible: Math.abs(seg.value),
        key: seg.name,
      };
    });
  }, [plan, network, t]);

  const textColor = theme === "dark" ? "#a1a1aa" : "#71717a";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
    >
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="font-display text-base">
            {t.revenueWaterfall}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data} barCategoryGap="15%">
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis
                dataKey="name"
                tick={{ fill: textColor, fontSize: 11 }}
                tickLine={false}
                interval={0}
                angle={-15}
                textAnchor="end"
                height={50}
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
                formatter={(value, name) => {
                  if (name === "invisible") return [null, null];
                  return [`$${Number(value).toLocaleString()}`, "Amount"];
                }}
                contentStyle={{
                  backgroundColor: theme === "dark" ? "#1f1f23" : "#fff",
                  border: `1px solid ${theme === "dark" ? "#333" : "#e5e7eb"}`,
                  borderRadius: "8px",
                  fontSize: "13px",
                }}
              />
              <ReferenceLine y={0} stroke={textColor} strokeWidth={1} />
              <Bar dataKey="invisible" stackId="a" fill="transparent" />
              <Bar dataKey="visible" stackId="a" radius={[4, 4, 0, 0]}>
                {data.map((entry) => (
                  <Cell
                    key={entry.key}
                    fill={SEGMENT_COLORS[entry.key] ?? "#6b7280"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}
