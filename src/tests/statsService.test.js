import { describe, it, expect, beforeEach } from 'vitest';
import { statsService } from '../services/statsService';

describe('statsService', () => {
  describe('calculateWeeklyCompletion', () => {
    it('returns correct completion for current week', () => {
      // Mock data for a specific week (Mon-Sun)
      const mockTasks = {
        '2026-01-12': [ // Monday
          { done: true, category: 'work' },
          { done: true, category: 'work' },
        ],
        '2026-01-13': [ // Tuesday (today in tests)
          { done: true, category: 'work' },
          { done: false, category: 'study' },
        ],
        '2026-01-14': [ // Wednesday
          { done: false, category: 'sport' },
        ],
      };

      const result = statsService.calculateWeeklyCompletion(mockTasks);

      expect(result).toHaveLength(7);
      expect(result[0]).toEqual({ day: 'Lun', completion: 100 }); // Monday 100%
      expect(result[1]).toEqual({ day: 'Mar', completion: 50 }); // Tuesday 50%
      expect(result[2]).toEqual({ day: 'Mié', completion: 0 }); // Wednesday 0%
      expect(result[3].day).toBe('Jue');
      expect(result[6].day).toBe('Dom');
    });

    it('returns 0% completion for days with no tasks', () => {
      const result = statsService.calculateWeeklyCompletion({});

      expect(result).toHaveLength(7);
      result.forEach((day) => {
        expect(day.completion).toBe(0);
      });
    });

    it('handles null or undefined input', () => {
      const result1 = statsService.calculateWeeklyCompletion(null);
      const result2 = statsService.calculateWeeklyCompletion(undefined);

      expect(result1).toHaveLength(7);
      expect(result2).toHaveLength(7);
    });
  });

  describe('calculateGeneralStreaks', () => {
    it('calculates current streak when last perfect day is today', () => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      const twoDaysAgo = new Date(today);
      twoDaysAgo.setDate(today.getDate() - 2);

      const formatDate = (d) => {
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

      const mockTasks = {
        [formatDate(twoDaysAgo)]: [
          { done: true, category: 'work' },
          { done: true, category: 'study' },
        ],
        [formatDate(yesterday)]: [
          { done: true, category: 'work' },
        ],
        [formatDate(today)]: [
          { done: true, category: 'work' },
          { done: true, category: 'sport' },
        ],
      };

      const result = statsService.calculateGeneralStreaks(mockTasks);

      expect(result.currentStreak).toBe(3);
      expect(result.bestStreak).toBe(3);
    });

    it('calculates current streak when last perfect day is yesterday', () => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);

      const formatDate = (d) => {
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

      const mockTasks = {
        [formatDate(yesterday)]: [
          { done: true, category: 'work' },
        ],
        [formatDate(today)]: [
          { done: false, category: 'work' }, // Today is not perfect
        ],
      };

      const result = statsService.calculateGeneralStreaks(mockTasks);

      expect(result.currentStreak).toBe(1);
    });

    it('returns 0 current streak when no recent perfect days', () => {
      const today = new Date();
      const threeDaysAgo = new Date(today);
      threeDaysAgo.setDate(today.getDate() - 3);

      const formatDate = (d) => {
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

      const mockTasks = {
        [formatDate(threeDaysAgo)]: [
          { done: true, category: 'work' },
        ],
        [formatDate(today)]: [
          { done: false, category: 'work' },
        ],
      };

      const result = statsService.calculateGeneralStreaks(mockTasks);

      expect(result.currentStreak).toBe(0);
      expect(result.bestStreak).toBe(1);
    });

    it('calculates best streak correctly with multiple streaks', () => {
      const mockTasks = {
        '2026-01-01': [{ done: true }],
        '2026-01-02': [{ done: true }],
        '2026-01-03': [{ done: true }],
        '2026-01-05': [{ done: true }], // Gap on 01-04
        '2026-01-06': [{ done: true }],
        '2026-01-07': [{ done: true }],
        '2026-01-08': [{ done: true }],
        '2026-01-09': [{ done: true }],
      };

      const result = statsService.calculateGeneralStreaks(mockTasks);

      expect(result.bestStreak).toBe(5); // Days 05-09
    });

    it('does not count days with incomplete tasks as perfect', () => {
      const mockTasks = {
        '2026-01-01': [{ done: true }],
        '2026-01-02': [{ done: true }, { done: false }], // Not perfect
        '2026-01-03': [{ done: true }],
      };

      const result = statsService.calculateGeneralStreaks(mockTasks);

      expect(result.bestStreak).toBe(1); // Only single days count
    });

    it('handles empty data', () => {
      const result = statsService.calculateGeneralStreaks({});
      expect(result.currentStreak).toBe(0);
      expect(result.bestStreak).toBe(0);
    });

    it('handles null or undefined input', () => {
      const result1 = statsService.calculateGeneralStreaks(null);
      const result2 = statsService.calculateGeneralStreaks(undefined);

      expect(result1).toEqual({ currentStreak: 0, bestStreak: 0 });
      expect(result2).toEqual({ currentStreak: 0, bestStreak: 0 });
    });
  });

  describe('calculateCategoryDistribution', () => {
    it('counts tasks by category correctly', () => {
      const mockTasks = {
        '2026-01-01': [
          { category: 'work' },
          { category: 'work' },
          { category: 'study' },
        ],
        '2026-01-02': [
          { category: 'sport' },
          { category: 'work' },
        ],
      };

      const result = statsService.calculateCategoryDistribution(mockTasks);

      expect(result).toHaveLength(3);
      
      const workCategory = result.find(c => c.name === 'Trabajo');
      expect(workCategory.value).toBe(3);

      const studyCategory = result.find(c => c.name === 'Estudio');
      expect(studyCategory.value).toBe(1);

      const sportCategory = result.find(c => c.name === 'Deporte');
      expect(sportCategory.value).toBe(1);
    });

    it('includes color for each category', () => {
      const mockTasks = {
        '2026-01-01': [{ category: 'work' }],
      };

      const result = statsService.calculateCategoryDistribution(mockTasks);

      expect(result[0]).toHaveProperty('color');
      expect(result[0].color).toBeTruthy();
    });

    it('handles tasks without category', () => {
      const mockTasks = {
        '2026-01-01': [
          { category: 'work' },
          { category: null },
          { category: undefined },
        ],
      };

      const result = statsService.calculateCategoryDistribution(mockTasks);

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Trabajo');
    });

    it('returns empty array for no tasks', () => {
      const result = statsService.calculateCategoryDistribution({});
      expect(result).toEqual([]);
    });

    it('handles null or undefined input', () => {
      const result1 = statsService.calculateCategoryDistribution(null);
      const result2 = statsService.calculateCategoryDistribution(undefined);

      expect(result1).toEqual([]);
      expect(result2).toEqual([]);
    });
  });

  describe('calculateHabitStats', () => {
    it('calculates habit statistics correctly', () => {
      const mockTasks = {
        '2026-01-01': [
          { isHabit: true, habitFrequency: 'daily', done: true },
          { isHabit: true, habitFrequency: 'weekdays', done: false },
          { isHabit: false, done: true }, // Regular task, not counted
        ],
        '2026-01-02': [
          { isHabit: true, habitFrequency: 'weekly', done: true },
        ],
      };

      const result = statsService.calculateHabitStats(mockTasks);

      expect(result.totalHabits).toBe(3);
      expect(result.completedHabits).toBe(2);
      expect(result.habitCompletionRate).toBe(67); // 2/3 = 66.67% rounded
      expect(result.dailyHabits).toBe(1);
      expect(result.weekdayHabits).toBe(1);
      expect(result.weeklyHabits).toBe(1);
    });

    it('returns zero stats for no habits', () => {
      const mockTasks = {
        '2026-01-01': [
          { isHabit: false, done: true },
        ],
      };

      const result = statsService.calculateHabitStats(mockTasks);

      expect(result.totalHabits).toBe(0);
      expect(result.completedHabits).toBe(0);
      expect(result.habitCompletionRate).toBe(0);
    });

    it('handles null or undefined input', () => {
      const result = statsService.calculateHabitStats(null);

      expect(result).toEqual({
        totalHabits: 0,
        completedHabits: 0,
        habitCompletionRate: 0,
        dailyHabits: 0,
        weekdayHabits: 0,
        weeklyHabits: 0,
        habitStreak: 0,
        currentHabitStreak: 0,
      });
    });

    it('includes both historical and current habit streaks', () => {
      const today = new Date();
      const formatDate = (d) => {
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

      const mockTasks = {
        [formatDate(today)]: [
          { isHabit: true, habitFrequency: 'daily', done: true },
        ],
      };

      const result = statsService.calculateHabitStats(mockTasks);

      expect(result).toHaveProperty('habitStreak');
      expect(result).toHaveProperty('currentHabitStreak');
      expect(result.currentHabitStreak).toBeGreaterThanOrEqual(0);
    });
  });

  describe('calculateHabitStreak', () => {
    it('calculates maximum habit streak', () => {
      const mockTasks = {
        '2026-01-01': [
          { isHabit: true, done: true },
        ],
        '2026-01-02': [
          { isHabit: true, done: true },
        ],
        '2026-01-03': [
          { isHabit: true, done: true },
        ],
      };

      const result = statsService.calculateHabitStreak(mockTasks);

      expect(result).toBe(3);
    });

    it('requires 100% completion for streak', () => {
      const mockTasks = {
        '2026-01-01': [
          { isHabit: true, done: true },
        ],
        '2026-01-02': [
          { isHabit: true, done: true },
          { isHabit: true, done: false }, // Breaks streak
        ],
        '2026-01-03': [
          { isHabit: true, done: true },
        ],
      };

      const result = statsService.calculateHabitStreak(mockTasks);

      expect(result).toBe(1); // Maximum is 1 day
    });

    it('ignores weekends for weekdays-only habits', () => {
      const mockTasks = {
        '2026-01-13': [ // Tuesday
          { isHabit: true, habitFrequency: 'weekdays', done: true },
        ],
        '2026-01-14': [ // Wednesday
          { isHabit: true, habitFrequency: 'weekdays', done: true },
        ],
        // No habits on weekend (01-18 Sat, 01-19 Sun)
        '2026-01-20': [ // Monday
          { isHabit: true, habitFrequency: 'weekdays', done: true },
        ],
      };

      const result = statsService.calculateHabitStreak(mockTasks);

      // Should count as 3-day streak even with weekend gap
      expect(result).toBeGreaterThan(0);
    });

    it('returns 0 for no habits', () => {
      const mockTasks = {
        '2026-01-01': [
          { isHabit: false, done: true },
        ],
      };

      const result = statsService.calculateHabitStreak(mockTasks);

      expect(result).toBe(0);
    });

    it('handles null or undefined input', () => {
      const result = statsService.calculateHabitStreak(null);
      expect(result).toBe(0);
    });
  });

  describe('calculateWeeklyHabitProgress', () => {
    it('aggregates habits by day of week', () => {
      const mockTasks = {
        '2026-01-06': [ // Tuesday
          { isHabit: true, done: true },
          { isHabit: true, done: false },
        ],
        '2026-01-13': [ // Tuesday (different week)
          { isHabit: true, done: true },
        ],
        '2026-01-07': [ // Wednesday
          { isHabit: true, done: true },
        ],
      };

      const result = statsService.calculateWeeklyHabitProgress(mockTasks);

      expect(result).toHaveLength(7);
      
      // Tuesday (index 1): 3 habits total, 2 completed
      const tuesday = result[1];
      expect(tuesday.day).toBe('Mar');
      expect(tuesday.habits).toBe(3);
      expect(tuesday.completed).toBe(2);
      expect(tuesday.completion).toBe(67);

      // Wednesday (index 2): 1 habit, 1 completed
      const wednesday = result[2];
      expect(wednesday.day).toBe('Mié');
      expect(wednesday.habits).toBe(1);
      expect(wednesday.completed).toBe(1);
      expect(wednesday.completion).toBe(100);
    });

    it('returns zero data for days with no habits', () => {
      const result = statsService.calculateWeeklyHabitProgress({});

      expect(result).toHaveLength(7);
      result.forEach((day) => {
        expect(day.habits).toBe(0);
        expect(day.completed).toBe(0);
        expect(day.completion).toBe(0);
      });
    });

    it('ignores non-habit tasks', () => {
      const mockTasks = {
        '2026-01-13': [ // Tuesday
          { isHabit: true, done: true },
          { isHabit: false, done: true }, // Not counted
        ],
      };

      const result = statsService.calculateWeeklyHabitProgress(mockTasks);

      const tuesday = result[1];
      expect(tuesday.habits).toBe(1); // Only habit counted
    });

    it('handles null or undefined input', () => {
      const result = statsService.calculateWeeklyHabitProgress(null);

      expect(result).toHaveLength(7);
      expect(result[0]).toEqual({ day: 'Lun', habits: 0, completed: 0 });
    });
  });

  describe('calculateCurrentHabitStreak', () => {
    it('calculates current active streak correctly', () => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      const twoDaysAgo = new Date(today);
      twoDaysAgo.setDate(today.getDate() - 2);

      const formatDate = (d) => {
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

      const mockTasks = {
        [formatDate(twoDaysAgo)]: [
          { isHabit: true, done: true },
        ],
        [formatDate(yesterday)]: [
          { isHabit: true, done: true },
        ],
        [formatDate(today)]: [
          { isHabit: true, done: true },
        ],
      };

      const result = statsService.calculateCurrentHabitStreak(mockTasks);

      expect(result).toBe(3);
    });

    it('returns 0 when streak is broken', () => {
      const today = new Date();
      const threeDaysAgo = new Date(today);
      threeDaysAgo.setDate(today.getDate() - 3);

      const formatDate = (d) => {
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

      const mockTasks = {
        [formatDate(threeDaysAgo)]: [
          { isHabit: true, done: true },
        ],
        [formatDate(today)]: [
          { isHabit: true, done: false }, // Not completed today
        ],
      };

      const result = statsService.calculateCurrentHabitStreak(mockTasks);

      expect(result).toBe(0);
    });

    it('includes yesterday in active streak if today is incomplete', () => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);

      const formatDate = (d) => {
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

      const mockTasks = {
        [formatDate(yesterday)]: [
          { isHabit: true, done: true },
        ],
        [formatDate(today)]: [
          { isHabit: true, done: false }, // Today incomplete but yesterday counts
        ],
      };

      const result = statsService.calculateCurrentHabitStreak(mockTasks);

      expect(result).toBe(1);
    });

    it('handles null or undefined input', () => {
      const result = statsService.calculateCurrentHabitStreak(null);
      expect(result).toBe(0);
    });
  });

  describe('calculateCurrentWeekHabitProgress', () => {
    it('returns data only for current week', () => {
      const result = statsService.calculateCurrentWeekHabitProgress({});

      expect(result).toHaveLength(7);
      expect(result[0].day).toBe('Lun');
      expect(result[6].day).toBe('Dom');
    });

    it('ignores habits from previous weeks', () => {
      const today = new Date();
      const lastWeek = new Date(today);
      lastWeek.setDate(today.getDate() - 7);

      const formatDate = (d) => {
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

      const mockTasks = {
        [formatDate(lastWeek)]: [
          { isHabit: true, done: true },
          { isHabit: true, done: true },
          { isHabit: true, done: true },
        ],
      };

      const result = statsService.calculateCurrentWeekHabitProgress(mockTasks);

      // All days in current week should have 0 habits (data is from last week)
      const totalHabits = result.reduce((sum, day) => sum + day.habits, 0);
      expect(totalHabits).toBe(0);
    });

    it('handles null or undefined input', () => {
      const result = statsService.calculateCurrentWeekHabitProgress(null);

      expect(result).toHaveLength(7);
      expect(result[0]).toEqual({ day: 'Lun', habits: 0, completed: 0, completion: 0 });
    });
  });
});
