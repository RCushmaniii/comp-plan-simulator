"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useLocale } from "@/lib/locale-context";
import type { TierConfig, TierId } from "@/data/types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const TIER_COLORS: Record<TierId, string> = {
  consultant: "border-t-[#3b82f6]",
  leader: "border-t-[#f59e0b]",
  leader_of_leaders: "border-t-[#8b5cf6]",
};

const TIER_BG: Record<TierId, string> = {
  consultant: "bg-blue-50 dark:bg-blue-950/30",
  leader: "bg-amber-50 dark:bg-amber-950/30",
  leader_of_leaders: "bg-purple-50 dark:bg-purple-950/30",
};

interface TierConfiguratorProps {
  tierId: TierId;
  config: TierConfig;
  onUpdate: (field: keyof TierConfig, value: number) => void;
}

export function TierConfigurator({ tierId, config, onUpdate }: TierConfiguratorProps) {
  const { t } = useLocale();

  const tierNames: Record<TierId, string> = {
    consultant: t.tierConsultant,
    leader: t.tierLeader,
    leader_of_leaders: t.tierLoL,
  };

  const sliders: {
    field: keyof TierConfig;
    label: string;
    min: number;
    max: number;
    step: number;
    suffix: string;
  }[] = [
    { field: "personalDiscountPct", label: t.personalDiscount, min: 0, max: 100, step: 1, suffix: "%" },
    { field: "overrideRatePct", label: t.overrideRate, min: 0, max: 50, step: 0.5, suffix: "%" },
    { field: "overrideDepth", label: t.overrideDepth, min: 0, max: 5, step: 1, suffix: ` ${t.levels}` },
    { field: "minPersonalVolume", label: t.minPersonalVolume, min: 0, max: 1000, step: 25, suffix: "" },
    { field: "minTeamVolume", label: t.minTeamVolume, min: 0, max: 100000, step: 500, suffix: "" },
    { field: "minRecruits", label: t.minRecruits, min: 0, max: 20, step: 1, suffix: "" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: tierId === "consultant" ? 0 : tierId === "leader" ? 0.1 : 0.2 }}
    >
      <Card className={cn("border-t-4", TIER_COLORS[tierId])}>
        <CardHeader className={cn("pb-3", TIER_BG[tierId])}>
          <CardTitle className="font-display text-lg">{tierNames[tierId]}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          {sliders.map(({ field, label, min, max, step, suffix }) => (
            <div key={field} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm text-muted-foreground">{label}</label>
                <span className="text-sm font-mono font-medium tabular-nums">
                  {field === "minPersonalVolume" || field === "minTeamVolume"
                    ? `$${config[field].toLocaleString()}`
                    : `${config[field]}${suffix}`}
                </span>
              </div>
              <Slider
                value={[config[field]]}
                onValueChange={([v]) => onUpdate(field, v)}
                min={min}
                max={max}
                step={step}
                className="cursor-pointer"
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}
