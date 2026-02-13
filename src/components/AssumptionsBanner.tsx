"use client";

import { AlertTriangle } from "lucide-react";
import { useLocale } from "@/lib/locale-context";

export function AssumptionsBanner() {
  const { t } = useLocale();

  return (
    <div className="sticky top-14 z-40 bg-amber-50 dark:bg-amber-950/50 border-b border-amber-200 dark:border-amber-800 print:hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-2 flex items-center gap-2 text-sm text-amber-800 dark:text-amber-200">
        <AlertTriangle className="w-4 h-4 shrink-0" />
        <span className="font-medium">{t.assumptionsBanner}</span>
      </div>
    </div>
  );
}
