import WorkoutCard from "./WorkoutCard";

type Workout = {
  id: string | number;
  name: string;
  image?: string;
  categories?: string[];
  muscleGroups: string[];
  equipment?: string[] | string;
  duration?: number | string;
  calories?: number;
  caloriesBurned: number;
  rating?: number;
};

const LibrarySection = async () => {
  const res = await fetch("https://api.api-store.workers.dev/api/fitlog", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch workouts");
  }

  const data = await res.json();

  // Supports either an array or an object containing a data array.

  const workouts: Workout[] = Array.isArray(data) ? data : (data.data ?? []);

  return (
    <section
      id="library"
      className="scroll-mt-6 border-b border-white/10 bg-[#0b0c0e] px-5 py-12 sm:px-8 lg:px-10"
    >
      <div className="mx-auto max-w-10xl">
        {/* Section heading */}
        <div>
          <h2 className="font-heading text-2xl font-extrabold uppercase text-white">
            The Library
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* Responsive workout grid */}

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>

        {/* Empty state */}
        
        {workouts.length === 0 && (
          <p className="py-10 text-center text-sm text-gray-400">
            No workouts available.
          </p>
        )}
      </div>
    </section>
  );
};

export default LibrarySection;
