import { useTasks } from "./useTasks";
import { statsService } from "../services/statsService";

export function useStats() {
  const { allTasks } = useTasks();

  const habitStats = statsService.calculateHabitStats(allTasks);
  const weeklyHabitProgress =
    statsService.calculateWeeklyHabitProgress(allTasks);
  const weeklyCompletion = statsService.calculateWeeklyCompletion(allTasks);
  const generalStreaks = statsService.calculateGeneralStreaks(allTasks);

  return {
    weeklyCompletion,
    currentStreak: generalStreaks.currentStreak,
    categoryDistribution: statsService.calculateCategoryDistribution(allTasks),
    bestStreak: generalStreaks.bestStreak,
    habitStats,
    weeklyHabitProgress,
  };
}
