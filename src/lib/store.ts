"use client";

import { create } from "zustand";
import type { CompensationPlan, NetworkParams, TierId } from "@/data/types";
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

function encodeState(state: {
  currentPlan: CompensationPlan;
  proposedPlan: CompensationPlan;
  network: NetworkParams;
}): string {
  const json = JSON.stringify({
    c: state.currentPlan,
    p: state.proposedPlan,
    n: state.network,
  });
  return btoa(json);
}

function decodeState(encoded: string): {
  currentPlan: CompensationPlan;
  proposedPlan: CompensationPlan;
  network: NetworkParams;
} | null {
  try {
    const json = atob(encoded);
    const data = JSON.parse(json);
    if (data.c && data.p && data.n) {
      return {
        currentPlan: data.c,
        proposedPlan: data.p,
        network: data.n,
      };
    }
    return null;
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
