import { useTasks } from './useTasks';
import { statsService } from '../services/statsService';
import { mockStats } from '../data/mockData';

export function useStats() {
  const { allTasks } = useTasks();

  const habitStats = statsService.calculateHabitStats(allTasks);
  const weeklyHabitProgress = statsService.calculateWeeklyHabitProgress(allTasks);

  return {
    weeklyCompletion: mockStats.weeklyCompletion,
    currentStreak: mockStats.streak,
    categoryDistribution: statsService.calculateCategoryDistribution(allTasks),
    bestStreak: mockStats.bestStreak,
    habitStats,
    weeklyHabitProgress,
  };
}
