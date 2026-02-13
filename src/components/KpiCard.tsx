"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface KpiCardProps {
  label: string;
  value: string;
  delta?: string;
  deltaType?: "positive" | "negative" | "neutral";
  className?: string;
}

export function KpiCard({ label, value, delta, deltaType, className }: KpiCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={cn("py-3", className)}>
        <CardContent className="px-4 py-0">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {label}
          </p>
          <p className="text-2xl font-display font-bold mt-1 tabular-nums">
            {value}
          </p>
          {delta && (
            <p
              className={cn(
                "text-xs font-mono mt-1",
                deltaType === "positive" && "text-emerald-600 dark:text-emerald-400",
                deltaType === "negative" && "text-red-600 dark:text-red-400",
                deltaType === "neutral" && "text-muted-foreground"
              )}
            >
              {delta}
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
