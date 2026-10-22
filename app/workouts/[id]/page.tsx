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

export default async function WorkoutDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
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
