
export interface Workout {
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
}
