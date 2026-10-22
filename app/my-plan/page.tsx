"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePlan } from "../context/PlanContext";

type Workout = {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
};

type Tab = "plan" | "saved";
type SortOption = "duration" | "calories" | "rating";

export default function MyPlanPage() {
  const { planIds, savedIds, removeFromPlan, removeSaved } = usePlan();

  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [tab, setTab] = useState<Tab>("plan");
  const [sortBy, setSortBy] = useState<SortOption>("duration");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Open the Saved tab when the URL is /my-plan?tab=saved.
  useEffect(() => {
    const readTab = () => {
      setTab(
        new URLSearchParams(window.location.search).get("tab") === "saved"
          ? "saved"
          : "plan",
      );
    };

    readTab();
    window.addEventListener("popstate", readTab);

    return () => window.removeEventListener("popstate", readTab);
  }, []);

  // Fetch workout details from the API.
  useEffect(() => {
    async function fetchWorkouts() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "https://api.api-store.workers.dev/api/fitlog",
        );

        if (!response.ok) {
          throw new Error("Failed to load workouts.");
        }

        const data = await response.json();

        setWorkouts(Array.isArray(data) ? data : (data.data ?? []));
      } catch {
        setError("Unable to load workouts. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchWorkouts();
  }, []);

  const currentIds = tab === "plan" ? planIds : savedIds;

  const currentWorkouts = useMemo(() => {
    const selected = workouts.filter((workout) =>
      currentIds.includes(workout.id),
    );

    return [...selected].sort((a, b) => {
      if (sortBy === "duration") return a.duration - b.duration;
      if (sortBy === "calories") {
        return b.caloriesBurned - a.caloriesBurned;
      }
      return b.rating - a.rating;
    });
  }, [workouts, currentIds, sortBy]);

  const totalMinutes = currentWorkouts.reduce(
    (total, workout) => total + workout.duration,
    0,
  );

  const totalCalories = currentWorkouts.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0,
  );

  function changeTab(nextTab: Tab) {
    setTab(nextTab);

    const url = new URL(window.location.href);

    if (nextTab === "saved") {
      url.searchParams.set("tab", "saved");
    } else {
      url.searchParams.delete("tab");
    }

    window.history.replaceState({}, "", url);
  }

  function removeWorkout(id: number) {
    if (tab === "plan") {
      removeFromPlan(id);
    } else {
      removeSaved(id);
    }
  }

  return (
    <main className="flex-1 bg-[#0b0c0e] px-4 py-7 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page heading */}
        <div>
          <h1 className="font-heading text-2xl font-bold">MY PLAN</h1>
          <p className="mt-1 text-xs text-gray-500">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Summary metrics */}
        <section className="mt-6 grid grid-cols-3 divide-x divide-white/5 rounded-xl border border-white/5 bg-[#13161c] px-3 py-5 sm:px-5">
          <div className="px-2">
            <p className="text-[10px] text-gray-500">Exercises</p>
            <p className="mt-1 font-heading text-2xl font-bold text-[#ccff00]">
              {currentWorkouts.length}
            </p>
          </div>

          <div className="px-3 sm:px-5">
            <p className="text-[10px] text-gray-500">Minutes</p>
            <p className="mt-1 font-heading text-2xl font-bold">
              {totalMinutes}
            </p>
          </div>

          <div className="px-3 sm:px-5">
            <p className="text-[10px] text-gray-500">Calories</p>
            <p className="mt-1 font-heading text-2xl font-bold">
              {totalCalories}
            </p>
          </div>
        </section>

        {/* Tabs and sorting */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex rounded-lg border border-white/5 bg-[#13161c] p-1">
            <button
              type="button"
              onClick={() => changeTab("plan")}
              className={`rounded-md px-4 py-2 text-xs transition ${
                tab === "plan"
                  ? "bg-[#252830] text-white"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              Today&apos;s Plan
            </button>

            <button
              type="button"
              onClick={() => changeTab("saved")}
              className={`rounded-md px-4 py-2 text-xs transition ${
                tab === "saved"
                  ? "bg-[#252830] text-white"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              Saved
            </button>
          </div>

          <label className="flex items-center gap-2 text-[12px] text-gray-500">
            Sort By
            <div className="relative">
              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(event.target.value as SortOption)
                }
                className="appearance-none rounded-md border border-white/10 bg-[#13161c] py-2 pl-3 pr-8 text-xs text-gray-200 outline-none transition hover:border-white/20 focus:border-[#ccff00]/50"
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>

              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                ▾
              </span>
            </div>
          </label>
        </div>

        {/* Workout list / empty state */}
        <section className="mt-4 space-y-3">
          {loading ? (
            <div className="rounded-xl border border-white/5 bg-[#13161c] py-16 text-center text-sm text-gray-400">
              Loading workouts...
            </div>
          ) : error ? (
            <div
              role="alert"
              className="rounded-xl border border-red-500/20 bg-[#13161c] py-12 text-center text-sm text-red-300"
            >
              {error}
            </div>
          ) : currentWorkouts.length === 0 ? (
            <div className="flex min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-[#0d0e11] px-4 py-12 text-center">
              <h2 className="font-heading text-lg font-bold">
                NOTHING HERE YET
              </h2>

              <p className="mt-2 max-w-sm text-xs text-gray-500">
                {tab === "plan"
                  ? "Browse the library and add a lift to get today moving."
                  : "Save workouts you like and come back to them later."}
              </p>

              <Link
                href="/"
                className="mt-5 rounded-full bg-[#ccff00] px-5 py-3 text-xs font-bold text-black transition hover:bg-[#b8e600]"
              >
                Go to workouts
              </Link>
            </div>
          ) : (
            currentWorkouts.map((workout) => (
              <article
                key={workout.id}
                className="flex flex-col gap-4 rounded-xl border border-white/5 bg-[#13161c] p-3 sm:flex-row sm:items-center"
              >
                {/* Thumbnail */}
                <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-lg sm:h-20 sm:w-32">
                  <Image
                    src={workout.image}
                    alt={workout.name}
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 100vw, 128px"
                    className="object-cover"
                  />
                </div>

                {/* Workout information */}
                <div className="min-w-0 flex-1">
                  <h2 className="font-heading text-sm font-bold uppercase">
                    {workout.name}
                  </h2>

                  <p className="mt-1 text-[11px] text-gray-500">
                    {workout.equipment}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-3 text-[10px] text-gray-400">
                    <span>◷ {workout.duration} min</span>
                    <span>♨ {workout.caloriesBurned} kcal</span>
                    <span>★ {workout.rating}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                  <Link
                    href={`/workouts/${workout.id}`}
                    className="rounded-full border border-white/10 px-3 py-2 text-[10px] text-gray-200 transition hover:bg-white/5"
                  >
                    View Details
                  </Link>

                  {tab === "plan" && (
                    <button
                      type="button"
                      onClick={() => removeFromPlan(workout.id)}
                      className="rounded-full bg-[#ccff00] px-3 py-2 text-[10px] font-bold text-black transition hover:bg-[#b8e600]"
                    >
                      ✓ Mark as Done
                    </button>
                  )}

                  <button
                    type="button"
                    aria-label={`Remove ${workout.name} from ${
                      tab === "plan" ? "today's plan" : "saved workouts"
                    }`}
                    onClick={() => removeWorkout(workout.id)}
                    className="px-2 py-2 text-xs text-gray-500 transition hover:text-red-400"
                  >
                    ✕
                  </button>
                </div>
              </article>
            ))
          )}
        </section>
      </div>
    </main>
  );
}
