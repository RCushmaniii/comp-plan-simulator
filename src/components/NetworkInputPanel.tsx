"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useCompPlanStore } from "@/lib/store";
import { useLocale } from "@/lib/locale-context";
import type { NetworkParams } from "@/data/types";
import { motion } from "framer-motion";
import { Users } from "lucide-react";

export function NetworkInputPanel() {
  const { t } = useLocale();
  const { network, updateNetwork } = useCompPlanStore();

  const groups: {
    title: string;
    fields: {
      field: keyof NetworkParams;
      label: string;
      min: number;
      max: number;
      step: number;
      format: (v: number) => string;
    }[];
  }[] = [
    {
      title: t.headcount,
      fields: [
        {
          field: "consultantHeadcount",
          label: t.tierConsultant,
          min: 10,
          max: 5000,
          step: 10,
          format: (v) => v.toLocaleString(),
        },
        {
          field: "leaderHeadcount",
          label: t.tierLeader,
          min: 1,
          max: 500,
          step: 1,
          format: (v) => v.toLocaleString(),
        },
        {
          field: "lolHeadcount",
          label: t.tierLoL,
          min: 1,
          max: 50,
          step: 1,
          format: (v) => v.toLocaleString(),
        },
      ],
    },
    {
      title: t.avgMonthlySales,
      fields: [
        {
          field: "consultantAvgSales",
          label: t.tierConsultant,
          min: 100,
          max: 10000,
          step: 100,
          format: (v) => `$${v.toLocaleString()}${t.perMonth}`,
        },
        {
          field: "leaderAvgSales",
          label: t.tierLeader,
          min: 100,
          max: 20000,
          step: 100,
          format: (v) => `$${v.toLocaleString()}${t.perMonth}`,
        },
        {
          field: "lolAvgSales",
          label: t.tierLoL,
          min: 100,
          max: 50000,
          step: 100,
          format: (v) => `$${v.toLocaleString()}${t.perMonth}`,
        },
      ],
    },
    {
      title: "Rates",
      fields: [
        {
          field: "growthRatePct",
          label: t.growthRate,
          min: 0,
          max: 25,
          step: 0.5,
          format: (v) => `${v}%`,
        },
        {
          field: "promotionRatePct",
          label: t.promotionRate,
          min: 0,
          max: 15,
          step: 0.5,
          format: (v) => `${v}%`,
        },
        {
          field: "attritionRatePct",
          label: t.attritionRate,
          min: 0,
          max: 20,
          step: 0.5,
          format: (v) => `${v}%`,
        },
      ],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.15 }}
    >
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="font-display text-lg flex items-center gap-2">
            <Users className="w-5 h-5 text-muted-foreground" />
            {t.networkParams}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {groups.map((group) => (
              <div key={group.title} className="space-y-4">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  {group.title}
                </h4>
                {group.fields.map(({ field, label, min, max, step, format }) => (
                  <div key={field} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-muted-foreground">{label}</label>
                      <span className="text-sm font-mono font-medium tabular-nums">
                        {format(network[field])}
                      </span>
                    </div>
                    <Slider
                      value={[network[field]]}
                      onValueChange={([v]) => updateNetwork(field, v)}
                      min={min}
                      max={max}
                      step={step}
                      className="cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
