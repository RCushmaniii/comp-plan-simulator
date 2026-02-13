"use client";

import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AssumptionsBanner } from "@/components/AssumptionsBanner";
import { PlanConfigPanel } from "@/components/PlanConfigPanel";
import { NetworkInputPanel } from "@/components/NetworkInputPanel";
import { FinancialDashboard } from "@/components/FinancialDashboard";
import { PayoutDistributionChart } from "@/components/PayoutDistributionChart";
import { WaterfallChart } from "@/components/WaterfallChart";
import { ComparisonView } from "@/components/ComparisonView";
import { ExportActions } from "@/components/ExportActions";
import { Footer } from "@/components/Footer";
import { useCompPlanStore } from "@/lib/store";
import { useLocale } from "@/lib/locale-context";
import { motion } from "framer-motion";

export default function Home() {
  const { t } = useLocale();
  const {
    activeTab,
    setActiveTab,
    loadFromUrl,
    currentPlan,
    proposedPlan,
    network,
    planView,
  } = useCompPlanStore();

  useEffect(() => {
    loadFromUrl();
  }, [loadFromUrl]);

  const activePlan = planView === "current" ? currentPlan : proposedPlan;

  return (
    <>
      <AssumptionsBanner />

      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
            {t.title}
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">{t.subtitle}</p>
        </motion.div>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as "configure" | "compare")}
          className="space-y-6"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <TabsList>
              <TabsTrigger value="configure" className="cursor-pointer">
                {t.tabConfigure}
              </TabsTrigger>
              <TabsTrigger value="compare" className="cursor-pointer">
                {t.tabCompare}
              </TabsTrigger>
            </TabsList>
            <ExportActions />
          </div>

          <TabsContent value="configure" className="space-y-6">
            <PlanConfigPanel />
            <NetworkInputPanel />
            <FinancialDashboard />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <PayoutDistributionChart plan={activePlan} network={network} />
              <WaterfallChart plan={activePlan} network={network} />
            </div>
          </TabsContent>

          <TabsContent value="compare" className="space-y-6">
            <ComparisonView />
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </>
  );
}
