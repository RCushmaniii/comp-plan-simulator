"use client";

import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocale } from "@/lib/locale-context";
import { useTheme } from "@/lib/theme-context";
import { computeBreakEvenCurve } from "@/lib/calculations";
import type { CompensationPlan, NetworkParams } from "@/data/types";
import { motion } from "framer-motion";

interface BreakEvenChartProps {
  currentPlan: CompensationPlan;
  proposedPlan: CompensationPlan;
  network: NetworkParams;
  breakEvenVolume: number | null;
}

export function BreakEvenChart({
  currentPlan,
  proposedPlan,
  network,
  breakEvenVolume,
}: BreakEvenChartProps) {
  const { t } = useLocale();
  const { theme } = useTheme();

  const data = useMemo(
    () => computeBreakEvenCurve(currentPlan, proposedPlan, network),
    [currentPlan, proposedPlan, network]
  );

  const crossoverPoint = useMemo(() => {
    if (!breakEvenVolume) return null;
    // Find the closest data point to the break-even volume
    let closest = data[0];
    let minDist = Math.abs(data[0].volume - breakEvenVolume);
    for (const point of data) {
      const dist = Math.abs(point.volume - breakEvenVolume);
      if (dist < minDist) {
        minDist = dist;
        closest = point;
      }
    }
    return closest;
  }, [data, breakEvenVolume]);

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
            {t.breakEvenAnalysis}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {breakEvenVolume ? (
            <p className="text-sm text-muted-foreground mb-2">
              {t.breakEvenAt(`$${breakEvenVolume.toLocaleString()}`)}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground mb-2">
              {t.noCrossover}
            </p>
          )}
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis
                dataKey="volume"
                tick={{ fill: textColor, fontSize: 12 }}
                tickFormatter={(v) =>
                  v >= 1000000
                    ? `$${(v / 1000000).toFixed(1)}M`
                    : `$${(v / 1000).toFixed(0)}K`
                }
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
                labelFormatter={(v) => `${t.volume}: $${Number(v).toLocaleString()}`}
                contentStyle={{
                  backgroundColor: theme === "dark" ? "#1f1f23" : "#fff",
                  border: `1px solid ${theme === "dark" ? "#333" : "#e5e7eb"}`,
                  borderRadius: "8px",
                  fontSize: "13px",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Line
                type="monotone"
                dataKey="currentCost"
                name={`${t.current} ${t.costCurve}`}
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="proposedCost"
                name={`${t.proposed} ${t.costCurve}`}
                stroke="#f59e0b"
                strokeWidth={2}
                dot={false}
                strokeDasharray="5 5"
              />
              {crossoverPoint && (
                <ReferenceDot
                  x={crossoverPoint.volume}
                  y={crossoverPoint.currentCost}
                  r={6}
                  fill="#ef4444"
                  stroke="#fff"
                  strokeWidth={2}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}
