import { Suspense } from "react";
import { notFound } from "next/navigation";
import WorkoutDetails from "@/app/components/WorkoutDetails";

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

type PageProps = {
  params: Promise<{ id: string }>;
};

export default function WorkoutDetailPage({ params }: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0b0c0e] px-6 py-16 text-center text-gray-400">
          Loading workout details...
        </div>
      }
    >
      <WorkoutDetailContent params={params} />
    </Suspense>
  );
}

async function WorkoutDetailContent({ params }: PageProps) {
  const { id } = await params;

  const res = await fetch("https://api.api-store.workers.dev/api/fitlog", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load workouts");
  }

  const data = await res.json();

  const workouts: Workout[] = Array.isArray(data) ? data : (data.data ?? []);

  const workout = workouts.find((item) => String(item.id) === id);

  if (!workout) {
    notFound();
  }

  return <WorkoutDetails workout={workout} />;
}
