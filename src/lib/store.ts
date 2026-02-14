"use client";

import { create } from "zustand";
import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from "lz-string";
import type { CompensationPlan, NetworkParams, TierId, TierConfig } from "@/data/types";
import {
  defaultCurrentPlan,
  defaultProposedPlan,
  defaultNetwork,
} from "@/data/defaults";
import { presets } from "@/data/presets";

type ActiveTab = "configure" | "compare";
type PlanView = "current" | "proposed";

interface CompPlanState {
  currentPlan: CompensationPlan;
  proposedPlan: CompensationPlan;
  network: NetworkParams;
  activeTab: ActiveTab;
  planView: PlanView;

  // Actions
  updateCurrentTier: (
    tierId: TierId,
    field: keyof CompensationPlan[TierId],
    value: number
  ) => void;
  updateProposedTier: (
    tierId: TierId,
    field: keyof CompensationPlan[TierId],
    value: number
  ) => void;
  updateNetwork: (field: keyof NetworkParams, value: number) => void;
  setActiveTab: (tab: ActiveTab) => void;
  setPlanView: (view: PlanView) => void;
  loadPreset: (presetId: string, target: PlanView) => void;
  resetAll: () => void;

  // URL sync
  getShareUrl: () => string;
  loadFromUrl: () => boolean;
}

// Compact serialization: array of numbers instead of verbose JSON keys
// Tier order: [discount, override, depth, minPV, minTV, minR]
function tierToArray(t: TierConfig): number[] {
  return [t.personalDiscountPct, t.overrideRatePct, t.overrideDepth, t.minPersonalVolume, t.minTeamVolume, t.minRecruits];
}

function arrayToTier(a: number[]): TierConfig {
  return {
    personalDiscountPct: a[0],
    overrideRatePct: a[1],
    overrideDepth: a[2],
    minPersonalVolume: a[3],
    minTeamVolume: a[4],
    minRecruits: a[5],
  };
}

function encodeState(state: {
  currentPlan: CompensationPlan;
  proposedPlan: CompensationPlan;
  network: NetworkParams;
}): string {
  // Compact format: [currentTiers, proposedTiers, networkValues]
  const compact = [
    [tierToArray(state.currentPlan.consultant), tierToArray(state.currentPlan.leader), tierToArray(state.currentPlan.leader_of_leaders)],
    [tierToArray(state.proposedPlan.consultant), tierToArray(state.proposedPlan.leader), tierToArray(state.proposedPlan.leader_of_leaders)],
    [state.network.consultantHeadcount, state.network.leaderHeadcount, state.network.lolHeadcount,
     state.network.consultantAvgSales, state.network.leaderAvgSales, state.network.lolAvgSales,
     state.network.growthRatePct, state.network.promotionRatePct, state.network.attritionRatePct],
  ];
  return compressToEncodedURIComponent(JSON.stringify(compact));
}

function decodeState(encoded: string): {
  currentPlan: CompensationPlan;
  proposedPlan: CompensationPlan;
  network: NetworkParams;
} | null {
  try {
    const json = decompressFromEncodedURIComponent(encoded);
    if (!json) return null;
    const data = JSON.parse(json);
    if (!Array.isArray(data) || data.length !== 3) return null;

    const [c, p, n] = data;
    return {
      currentPlan: {
        consultant: arrayToTier(c[0]),
        leader: arrayToTier(c[1]),
        leader_of_leaders: arrayToTier(c[2]),
      },
      proposedPlan: {
        consultant: arrayToTier(p[0]),
        leader: arrayToTier(p[1]),
        leader_of_leaders: arrayToTier(p[2]),
      },
      network: {
        consultantHeadcount: n[0],
        leaderHeadcount: n[1],
        lolHeadcount: n[2],
        consultantAvgSales: n[3],
        leaderAvgSales: n[4],
        lolAvgSales: n[5],
        growthRatePct: n[6],
        promotionRatePct: n[7],
        attritionRatePct: n[8],
      },
    };
  } catch {
    return null;
  }
}

let syncTimeout: ReturnType<typeof setTimeout> | null = null;

function debouncedUrlSync(state: CompPlanState) {
  if (syncTimeout) clearTimeout(syncTimeout);
  syncTimeout = setTimeout(() => {
    if (typeof window === "undefined") return;
    const encoded = encodeState({
      currentPlan: state.currentPlan,
      proposedPlan: state.proposedPlan,
      network: state.network,
    });
    const url = new URL(window.location.href);
    url.searchParams.set("s", encoded);
    window.history.replaceState(null, "", url.toString());
  }, 500);
}

export const useCompPlanStore = create<CompPlanState>((set, get) => ({
  currentPlan: structuredClone(defaultCurrentPlan),
  proposedPlan: structuredClone(defaultProposedPlan),
  network: { ...defaultNetwork },
  activeTab: "configure",
  planView: "current",

  updateCurrentTier: (tierId, field, value) => {
    set((state) => {
      const newPlan = structuredClone(state.currentPlan);
      (newPlan[tierId][field] as number) = value;
      const newState = { ...state, currentPlan: newPlan };
      debouncedUrlSync(newState as CompPlanState);
      return { currentPlan: newPlan };
    });
  },

  updateProposedTier: (tierId, field, value) => {
    set((state) => {
      const newPlan = structuredClone(state.proposedPlan);
      (newPlan[tierId][field] as number) = value;
      const newState = { ...state, proposedPlan: newPlan };
      debouncedUrlSync(newState as CompPlanState);
      return { proposedPlan: newPlan };
    });
  },

  updateNetwork: (field, value) => {
    set((state) => {
      const newNetwork = { ...state.network, [field]: value };
      const newState = { ...state, network: newNetwork };
      debouncedUrlSync(newState as CompPlanState);
      return { network: newNetwork };
    });
  },

  setActiveTab: (tab) => set({ activeTab: tab }),
  setPlanView: (view) => set({ planView: view }),

  loadPreset: (presetId, target) => {
    const preset = presets.find((p) => p.id === presetId);
    if (!preset) return;

    set((state) => {
      const updates: Partial<CompPlanState> = {
        network: { ...preset.network },
      };
      if (target === "current") {
        updates.currentPlan = structuredClone(preset.plan);
      } else {
        updates.proposedPlan = structuredClone(preset.plan);
      }
      const newState = { ...state, ...updates };
      debouncedUrlSync(newState as CompPlanState);
      return updates;
    });
  },

  resetAll: () => {
    const newState = {
      currentPlan: structuredClone(defaultCurrentPlan),
      proposedPlan: structuredClone(defaultProposedPlan),
      network: { ...defaultNetwork },
      activeTab: "configure" as ActiveTab,
      planView: "current" as PlanView,
    };
    set(newState);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("s");
      window.history.replaceState(null, "", url.toString());
    }
  },

  getShareUrl: () => {
    const state = get();
    const encoded = encodeState({
      currentPlan: state.currentPlan,
      proposedPlan: state.proposedPlan,
      network: state.network,
    });
    if (typeof window === "undefined") return "";
    const url = new URL(window.location.href);
    url.searchParams.set("s", encoded);
    return url.toString();
  },

  loadFromUrl: () => {
    if (typeof window === "undefined") return false;
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get("s");
    if (!encoded) return false;

    const decoded = decodeState(encoded);
    if (!decoded) return false;

    set({
      currentPlan: decoded.currentPlan,
      proposedPlan: decoded.proposedPlan,
      network: decoded.network,
    });
    return true;
  },
}));
