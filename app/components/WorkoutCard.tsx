import Image from "next/image";
import Link from "next/link";
import type { Workout } from "../types/workout";

const WorkoutCard = ({ workout }: { workout: Workout }) => {
  const equipment = Array.isArray(workout.equipment)
    ? workout.equipment.join(", ")
    : workout.equipment || "Equipment not specified";

  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="group flex h-[330px] w-full max-w-[450px] flex-col overflow-hidden rounded-xl border border-white/5 bg-[#15161b] transition hover:border-[#ccff00]/40"
    >
      {/* Workout image */}
      <div className="relative h-[200px] w-full shrink-0 overflow-hidden">
        {workout.image ? (
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            unoptimized
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[#202127] text-sm text-gray-500">
            No image available
          </div>
        )}
      </div>

      {/* Card content */}
      <div className="flex flex-1 flex-col p-3">
        {/* Muscle group tags */}
        <div className="flex min-h-[20px] flex-wrap gap-1.5">
          {workout.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="rounded-full bg-[#ccff00] px-2 py-0.5 text-[9px] font-extrabold uppercase text-black"
            >
              {muscle}
            </span>
          ))}
        </div>

        {/* Workout name */}
        <h3 className="mt-2 truncate text-xs font-extrabold uppercase text-white">
          {workout.name}
        </h3>

        {/* Equipment */}
        <p className="mt-1 truncate text-[10px] text-gray-500">{equipment}</p>

        {/* Workout statistics */}
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-white/5 pt-2.5 text-[10px] text-gray-400">
          <span>◷ {workout.duration} min</span>
          <span>♥ {workout.caloriesBurned} kcal</span>
          <span>★ {workout.rating}</span>
        </div>
      </div>
    </Link>
  );
};

export default WorkoutCard;
