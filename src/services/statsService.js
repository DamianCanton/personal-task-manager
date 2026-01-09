export const statsService = {
  calculateWeeklyCompletion() {
    return [
      { day: 'Lun', completion: 85 },
      { day: 'Mar', completion: 92 },
      { day: 'Mié', completion: 78 },
      { day: 'Jue', completion: 88 },
      { day: 'Vie', completion: 95 },
      { day: 'Sáb', completion: 70 },
      { day: 'Dom', completion: 45 },
    ];
  },

  calculateCategoryDistribution(allTasksByDate) {
    if (!allTasksByDate) return [];

    const allTasks = Object.values(allTasksByDate).flat();
    if (allTasks.length === 0) return [];

    const counts = allTasks.reduce((acc, task) => {
      if (!task.category) return acc;
      acc[task.category] = (acc[task.category] || 0) + 1;
      return acc;
    }, {});

    const CATEGORY_LABELS = {
      work: 'Trabajo',
      study: 'Estudio',
      sport: 'Deporte',
      personal: 'Personal',
    };

    const CATEGORY_COLORS = {
      work: '#a8c7fa',
      study: '#c2e7ff',
      sport: '#c8e6c9',
      personal: '#ffe0b2',
    };

    return Object.entries(counts).map(([key, value]) => ({
      name: CATEGORY_LABELS[key] || key,
      value,
      color: CATEGORY_COLORS[key] || '#86868B',
    }));
  },

  calculateHabitStats(allTasksByDate) {
    if (!allTasksByDate) {
      return {
        totalHabits: 0,
        completedHabits: 0,
        habitCompletionRate: 0,
        dailyHabits: 0,
        weekdayHabits: 0,
        weeklyHabits: 0,
        habitStreak: 0,
      };
    }

    const allTasks = Object.values(allTasksByDate).flat();
    const habits = allTasks.filter((task) => task.isHabit);
    const completedHabits = habits.filter((task) => task.done);

    const totalHabits = habits.length;
    const completedCount = completedHabits.length;
    const habitCompletionRate = totalHabits > 0 ? Math.round((completedCount / totalHabits) * 100) : 0;

    const dailyHabits = habits.filter((h) => h.habitFrequency === 'daily').length;
    const weekdayHabits = habits.filter((h) => h.habitFrequency === 'weekdays').length;
    const weeklyHabits = habits.filter((h) => h.habitFrequency === 'weekly').length;

    const habitStreak = this.calculateHabitStreak(allTasksByDate);

    return {
      totalHabits,
      completedHabits,
      habitCompletionRate,
      dailyHabits,
      weekdayHabits,
      weeklyHabits,
      habitStreak,
    };
  },

  calculateHabitStreak(allTasksByDate) {
    if (!allTasksByDate) return 0;

    const dates = Object.keys(allTasksByDate).sort();
    let streak = 0;
    let maxStreak = 0;

    for (const date of dates) {
      const tasks = allTasksByDate[date] || [];
      const habits = tasks.filter((t) => t.isHabit);

      if (habits.length === 0) {
        if (streak > maxStreak) {
          maxStreak = streak;
        }
        streak = 0;
        continue;
      }

      const completedHabits = habits.filter((h) => h.done);
      const completionRate = completedHabits.length / habits.length;

      if (completionRate >= 1) {
        streak++;
      } else {
        if (streak > maxStreak) {
          maxStreak = streak;
        }
        streak = 0;
      }
    }

    return Math.max(streak, maxStreak);
  },

  calculateWeeklyHabitProgress(allTasksByDate) {
    if (!allTasksByDate) {
      return [
        { day: 'Lun', habits: 0, completed: 0 },
        { day: 'Mar', habits: 0, completed: 0 },
        { day: 'Mié', habits: 0, completed: 0 },
        { day: 'Jue', habits: 0, completed: 0 },
        { day: 'Vie', habits: 0, completed: 0 },
        { day: 'Sáb', habits: 0, completed: 0 },
        { day: 'Dom', habits: 0, completed: 0 },
      ];
    }

    const dayNames = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    const dayMap = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const weeklyData = dayNames.map((day, index) => {
      let totalHabits = 0;
      let completedHabits = 0;

      Object.entries(allTasksByDate).forEach(([date, tasks]) => {
        const taskDate = new Date(date);
        const jsDay = taskDate.getDay();
        const mappedDay = jsDay === 0 ? 6 : jsDay - 1;

        if (mappedDay === index) {
          const dayHabits = tasks.filter((t) => t.isHabit);
          totalHabits += dayHabits.length;
          completedHabits += dayHabits.filter((h) => h.done).length;
        }
      });

      return {
        day,
        habits: totalHabits,
        completed: completedHabits,
        completion: totalHabits > 0 ? Math.round((completedHabits / totalHabits) * 100) : 0,
      };
    });

    return weeklyData;
  },
};
