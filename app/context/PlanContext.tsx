"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

type PlanContextType = {
  planIds: number[];
  savedIds: number[];
  addToPlan: (id: number) => boolean;
  removeFromPlan: (id: number) => void;
  saveWorkout: (id: number) => boolean;
  removeSaved: (id: number) => void;
};

type StoredData = {
  planIds: number[];
  savedIds: number[];
};

const PlanContext = createContext<PlanContextType | null>(null);

const STORAGE_KEY = "fitlog-data";

function readStoredData(): StoredData {
  try {
    // Support the separate keys used by your previous version.
    const combined = localStorage.getItem(STORAGE_KEY);

    if (combined) {
      const parsed = JSON.parse(combined);

      return {
        planIds: Array.isArray(parsed.planIds) ? parsed.planIds : [],
        savedIds: Array.isArray(parsed.savedIds) ? parsed.savedIds : [],
      };
    }

    const plan = JSON.parse(localStorage.getItem("fitlog-plan") || "[]");
    const saved = JSON.parse(localStorage.getItem("fitlog-saved") || "[]");

    return {
      planIds: Array.isArray(plan) ? plan : [],
      savedIds: Array.isArray(saved) ? saved : [],
    };
  } catch {
    return { planIds: [], savedIds: [] };
  }
}

export const PlanProvider = ({ children }: { children: ReactNode }) => {
  const [planIds, setPlanIds] = useState<number[]>([]);
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [ready, setReady] = useState(false);

  // Load browser storage after the component mounts.
  useEffect(() => {
    let cancelled = false;

    const timeoutId = window.setTimeout(() => {
      if (cancelled) return;

      const stored = readStoredData();

      setPlanIds(stored.planIds);
      setSavedIds(stored.savedIds);
      setReady(true);
    }, 0);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, []);

  // Persist both lists together after loading is complete.
  useEffect(() => {
    if (!ready) return;

    const data: StoredData = { planIds, savedIds };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

    // Keep these keys available for compatibility with existing code.
    localStorage.setItem("fitlog-plan", JSON.stringify(planIds));
    localStorage.setItem("fitlog-saved", JSON.stringify(savedIds));
  }, [planIds, savedIds, ready]);

  const addToPlan = (id: number): boolean => {
    if (planIds.includes(id) || planIds.length >= 5) {
      return false;
    }

    setPlanIds((current) => {
      if (current.includes(id) || current.length >= 5) {
        return current;
      }

      return [...current, id];
    });

    return true;
  };

  const removeFromPlan = (id: number): void => {
    setPlanIds((current) => current.filter((item) => item !== id));
  };

  const saveWorkout = (id: number): boolean => {
    if (savedIds.includes(id)) {
      return false;
    }

    setSavedIds((current) =>
      current.includes(id) ? current : [...current, id],
    );

    return true;
  };

  const removeSaved = (id: number): void => {
    setSavedIds((current) => current.filter((item) => item !== id));
  };

  return (
    <PlanContext.Provider
      value={{
        planIds,
        savedIds,
        addToPlan,
        removeFromPlan,
        saveWorkout,
        removeSaved,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error("usePlan must be used inside PlanProvider");
  }

  return context;
};
