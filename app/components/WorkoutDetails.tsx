"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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

export default function WorkoutDetails({ workout }: { workout: Workout }) {
  const [toast, setToast] = useState("");
  const {
    planIds,
    savedIds,
    addToPlan,
    removeFromPlan,
    saveWorkout,
    removeSaved,
  } = usePlan();

  // Worked out from the context, so no state or effect is needed
  const inPlan = planIds.includes(workout.id);
  const isSaved = savedIds.includes(workout.id);

  function togglePlan() {
    if (inPlan) {
      removeFromPlan(workout.id);
      setToast("");
      return;
    }

    const added = addToPlan(workout.id);

    setToast(
      added
        ? "Added to today's plan"
        : planIds.length >= 5
          ? "Today's plan is limited to five lifts"
          : "Already in today's plan",
    );
  }

  function toggleSaved() {
    if (isSaved) {
      removeSaved(workout.id);
      setToast("");
      return;
    }

    const saved = saveWorkout(workout.id);

    setToast(saved ? "Saved for later" : "Already saved for later");
  }

  const specs = [
    ["EQUIPMENT", workout.equipment],
    ["DIFFICULTY", workout.difficulty],
    ["SETS", String(workout.sets)],
    ["REPS", workout.reps],
    ["DURATION", `${workout.duration} min`],
    ["CALORIES", `${workout.caloriesBurned} kcal`],
    ["RATING", String(workout.rating)],
  ];

  return (
    <main className="min-h-screen bg-[#0b0c0e] px-4 py-5 text-white sm:px-6">
      <div className="mx-auto grid max-w-[1150px] items-start gap-5 rounded-xl border border-white/5 bg-[#0f1014] p-3 sm:p-5 lg:min-h-[80vh] lg:grid-cols-2 lg:gap-7 lg:p-5">
        {/* Left: workout image */}
        <div className="relative h-[260px] overflow-hidden rounded-xl sm:h-[340px] lg:h-[70vh] lg:max-h-[570px]">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            priority
            unoptimized
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        {/* Right: workout information */}
        <div className="min-w-0 py-1">
          <h1 className="font-heading text-2xl font-extrabold uppercase leading-tight sm:text-3xl">
            {workout.name}
          </h1>

          <p className="mt-2 text-sm leading-relaxed text-gray-400">
            {workout.description}
          </p>

          {/* Muscle group tags */}
          <div className="mt-3 flex flex-wrap gap-2">
            {workout.muscleGroups.map((muscle) => (
              <span
                key={muscle}
                className="rounded-full bg-[#ccff00] px-3 py-1 text-[11px] font-bold text-black"
              >
                {muscle}
              </span>
            ))}
          </div>

          {/* Key specifications */}
          <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-[#151820]">
            {specs.map(([label, value]) => (
              <div
                key={label}
                className="flex min-h-[32px] items-center justify-between gap-4 border-b border-white/5 px-3 py-1.5 last:border-b-0"
              >
                <span className="text-[10px] font-bold tracking-wide text-gray-400">
                  {label}
                </span>

                <span className="text-right text-xs text-gray-200">
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* Instructions */}
          <section className="mt-4">
            <h2 className="text-sm font-extrabold tracking-wide">
              INSTRUCTIONS
            </h2>

            <ol className="mt-2 list-decimal space-y-1.5 pl-4 text-xs leading-relaxed text-gray-300 marker:text-gray-500">
              {workout.instructions.map((instruction, index) => (
                <li key={`${index}-${instruction}`}>
                  <span className="pl-1">{instruction}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* Toggle action buttons */}
          <div className="mt-5 flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={togglePlan}
              className={`rounded-lg px-4 py-3 text-xs font-bold transition ${
                inPlan
                  ? "border border-[#ccff00] text-[#ccff00]"
                  : "bg-[#ccff00] text-black hover:bg-[#b8e600]"
              }`}
            >
              {inPlan ? "✓ Added to today's plan" : "▣ Add to today's plan"}
            </button>

            <button
              type="button"
              onClick={toggleSaved}
              className={`rounded-lg border px-4 py-3 text-xs font-medium transition ${
                isSaved
                  ? "border-[#ccff00] text-[#ccff00]"
                  : "border-white/15 text-gray-200 hover:bg-white/5"
              }`}
            >
              {isSaved ? "✓ Saved for later" : "♧ Save for later"}
            </button>
          </div>

          {/* Feedback message */}
          {toast && (
            <div
              role="status"
              className="mt-3 rounded-lg border border-white/10 bg-[#202127] px-3 py-2 text-xs text-[#ccff00]"
            >
              {toast}
            </div>
          )}

          <Link
            href="/"
            className="mt-4 inline-block text-xs text-gray-400 hover:text-white"
          >
            ← Back to workouts
          </Link>
        </div>
      </div>
    </main>
  );
}
