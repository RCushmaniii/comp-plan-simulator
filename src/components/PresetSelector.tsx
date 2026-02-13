"use client";

import { useCompPlanStore } from "@/lib/store";
import { useLocale } from "@/lib/locale-context";
import { presets } from "@/data/presets";

export function PresetSelector() {
  const { t } = useLocale();
  const { planView, loadPreset } = useCompPlanStore();

  const presetLabels: Record<string, { name: string; desc: string }> = {
    default: { name: t.presetDefault, desc: t.presetDefaultDesc },
    aggressive: { name: t.presetAggressive, desc: t.presetAggressiveDesc },
    flat: { name: t.presetFlat, desc: t.presetFlatDesc },
    highGrowth: { name: t.presetHighGrowth, desc: t.presetHighGrowthDesc },
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground font-medium">
        {t.presetsLabel}:
      </span>
      <div className="flex flex-wrap gap-1.5">
        {presets.map((preset) => (
          <button
            key={preset.id}
            onClick={() => loadPreset(preset.id, planView)}
            title={presetLabels[preset.id]?.desc}
            className="px-2.5 py-1 text-xs rounded-md border border-border bg-background hover:bg-muted transition-colors cursor-pointer font-medium"
          >
            {presetLabels[preset.id]?.name ?? preset.id}
          </button>
        ))}
      </div>
    </div>
  );
}
