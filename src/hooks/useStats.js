import { useTasks } from './useTasks';
import { statsService } from '../services/statsService';

export function useStats() {
  const { allTasks } = useTasks();

  const habitStats = statsService.calculateHabitStats(allTasks);
  const weeklyHabitProgress = statsService.calculateWeeklyHabitProgress(allTasks);
  const weeklyCompletion = statsService.calculateWeeklyCompletion(allTasks);

  return {
    weeklyCompletion,
    currentStreak: habitStats.habitStreak,
    categoryDistribution: statsService.calculateCategoryDistribution(allTasks),
    bestStreak: habitStats.habitStreak,
    habitStats,
    weeklyHabitProgress,
  };
}
