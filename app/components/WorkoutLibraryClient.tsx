"use client";

import { useState } from "react";
import WorkoutCard from "./WorkoutCard";
import type { Workout } from "../types/workout";

export default function WorkoutLibraryClient({
  workouts,
}: {
  workouts: Workout[];
}) {
  const [search, setSearch] = useState("");

  const filteredWorkouts = workouts.filter((workout) => {
    const query = search.trim().toLowerCase();

    const name = workout.name.toLowerCase();
    const muscles = (workout.muscleGroups ?? []).join(" ").toLowerCase();
    const categories = (workout.categories ?? []).join(" ").toLowerCase();

    return (
      name.includes(query) ||
      muscles.includes(query) ||
      categories.includes(query)
    );
  });

  return (
    <>
      <div className="mt-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search workouts by name or muscle group..."
          aria-label="Search workouts by name or muscle group"
          className="w-full rounded-xl border border-white/10 bg-[#13161c] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-[#ccff00] sm:max-w-md"
        />
      </div>

      {filteredWorkouts.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      ) : (
        <p className="py-10 text-center text-sm text-gray-400">
          {search.trim()
            ? `No workouts found for "${search}".`
            : "No workouts available."}
        </p>
      )}
    </>
  );
}
