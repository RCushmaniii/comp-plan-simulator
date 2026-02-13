"use client";

import { useState } from "react";
import { useCompPlanStore } from "@/lib/store";
import { useLocale } from "@/lib/locale-context";
import { Link2, RotateCcw, Check } from "lucide-react";

export function ExportActions() {
  const { t } = useLocale();
  const { getShareUrl, resetAll } = useCompPlanStore();
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = getShareUrl();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: prompt user
      window.prompt("Copy this link:", url);
    }
  };

  return (
    <div className="flex items-center gap-3" data-print-hide>
      <button
        onClick={handleShare}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-border bg-background hover:bg-muted transition-colors cursor-pointer"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-emerald-500" />
            {t.linkCopied}
          </>
        ) : (
          <>
            <Link2 className="w-4 h-4" />
            {t.shareLink}
          </>
        )}
      </button>
      <button
        onClick={resetAll}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-border bg-background hover:bg-muted transition-colors cursor-pointer text-muted-foreground hover:text-foreground"
      >
        <RotateCcw className="w-4 h-4" />
        {t.resetAll}
      </button>
    </div>
  );
}
