export const statsService = {
  calculateWeeklyCompletion(allTasksByDate) {
    if (!allTasksByDate) allTasksByDate = {};

    const today = new Date();
    // Adjust to local time if needed, but Date() is usually local in browser or system.
    // However, for strict consistency with string dates 'YYYY-MM-DD', we should be careful.
    // Let's assume the keys 'YYYY-MM-DD' are local date strings.

    const currentDay = today.getDay(); // 0 (Sun) to 6 (Sat)
    const diffToMon = currentDay === 0 ? 6 : currentDay - 1;

    // Get last Monday
    const monday = new Date(today);
    monday.setDate(today.getDate() - diffToMon);

    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      weekDates.push(`${year}-${month}-${day}`);
    }

    const dayNames = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

    return weekDates.map((dateStr, index) => {
      const tasks = allTasksByDate[dateStr] || [];
      const totalTasks = tasks.length;
      const completedTasks = tasks.filter((t) => t.done).length;

      return {
        day: dayNames[index],
        completion:
          totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
      };
    });
  },

  calculateGeneralStreaks(allTasksByDate) {
    if (!allTasksByDate || Object.keys(allTasksByDate).length === 0) {
      return { currentStreak: 0, bestStreak: 0 };
    }

    const perfectDays = new Set();
    Object.entries(allTasksByDate).forEach(([date, tasks]) => {
      if (tasks.length > 0 && tasks.every((t) => t.done)) {
        perfectDays.add(date);
      }
    });

    // Helper to get simple date string YYYY-MM-DD from Date object
    const toDateStr = (d) => {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    // Calculate Best Streak
    const sortedPerfectDays = Array.from(perfectDays).sort();
    let maxStreak = 0;
    let currentRun = 0;
    let prevTimestamp = 0;

    sortedPerfectDays.forEach((dateStr) => {
      // Parse as local date components to avoid timezone shifts
      const [y, m, d] = dateStr.split("-").map(Number);
      const startOfDay = new Date(y, m - 1, d).getTime();

      if (currentRun === 0) {
        currentRun = 1;
      } else {
        // Check if consecutive (difference of 24h roughly, safe margin 23-25h)
        const diff = (startOfDay - prevTimestamp) / (1000 * 60 * 60 * 24);
        if (Math.round(diff) === 1) {
          currentRun++;
        } else {
          currentRun = 1;
        }
      }
      if (currentRun > maxStreak) maxStreak = currentRun;
      prevTimestamp = startOfDay;
    });

    // Calculate Current Streak
    const today = new Date();
    const todayStr = toDateStr(today);

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const yesterdayStr = toDateStr(yesterday);

    let streakEnd = null;
    if (perfectDays.has(todayStr)) {
      streakEnd = today;
    } else if (perfectDays.has(yesterdayStr)) {
      streakEnd = yesterday;
    }

    let currentStreak = 0;
    if (streakEnd) {
      currentStreak = 1;
      let checkDate = new Date(streakEnd);
      while (true) {
        checkDate.setDate(checkDate.getDate() - 1);
        const checkStr = toDateStr(checkDate);
        if (perfectDays.has(checkStr)) {
          currentStreak++;
        } else {
          break;
        }
      }
    }

    return {
      currentStreak,
      bestStreak: maxStreak,
    };
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
      work: "Trabajo",
      study: "Estudio",
      sport: "Deporte",
      personal: "Personal",
    };

    const CATEGORY_COLORS = {
      work: "#a8c7fa",
      study: "#c2e7ff",
      sport: "#c8e6c9",
      personal: "#ffe0b2",
    };

    return Object.entries(counts).map(([key, value]) => ({
      name: CATEGORY_LABELS[key] || key,
      value,
      color: CATEGORY_COLORS[key] || "#86868B",
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
        currentHabitStreak: 0,
      };
    }

    const allTasks = Object.values(allTasksByDate).flat();
    const habits = allTasks.filter((task) => task.isHabit);
    const completedHabits = habits.filter((task) => task.done);

    const totalHabits = habits.length;
    const completedCount = completedHabits.length;
    const habitCompletionRate =
      totalHabits > 0 ? Math.round((completedCount / totalHabits) * 100) : 0;

    const dailyHabits = habits.filter(
      (h) => h.habitFrequency === "daily"
    ).length;
    const weekdayHabits = habits.filter(
      (h) => h.habitFrequency === "weekdays"
    ).length;
    const weeklyHabits = habits.filter(
      (h) => h.habitFrequency === "weekly"
    ).length;

    const habitStreak = this.calculateHabitStreak(allTasksByDate);
    const currentHabitStreak = this.calculateCurrentHabitStreak(allTasksByDate);

    return {
      totalHabits,
      completedHabits,
      habitCompletionRate,
      dailyHabits,
      weekdayHabits,
      weeklyHabits,
      habitStreak, // Máxima racha histórica
      currentHabitStreak, // Racha activa actual
    };
  },

  // Calcula la MÁXIMA racha de hábitos histórica (no necesariamente activa)
  calculateHabitStreak(allTasksByDate) {
    if (!allTasksByDate) return 0;

    const dates = Object.keys(allTasksByDate).sort();
    let streak = 0;
    let maxStreak = 0;

    for (const date of dates) {
      const tasks = allTasksByDate[date] || [];
      const habits = tasks.filter((t) => t.isHabit);

      const taskDate = new Date(date);
      const jsDay = taskDate.getDay();
      const isWeekend = jsDay === 0 || jsDay === 6;

      if (habits.length === 0) {
        if (streak > maxStreak) {
          maxStreak = streak;
        }
        streak = 0;
        continue;
      }

      const weekdayHabits = habits.filter(
        (h) => h.habitFrequency === "weekdays"
      );
      const otherHabits = habits.filter((h) => h.habitFrequency !== "weekdays");

      let shouldCountDay = true;

      if (weekdayHabits.length > 0 && otherHabits.length === 0 && isWeekend) {
        shouldCountDay = false;
      }

      if (!shouldCountDay) {
        if (streak > maxStreak) {
          maxStreak = streak;
        }
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

  // Calcula la racha de hábitos ACTUAL (debe incluir hoy o ayer para ser válida)
  calculateCurrentHabitStreak(allTasksByDate) {
    if (!allTasksByDate) return 0;

    const toDateStr = (d) => {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const today = new Date();
    const todayStr = toDateStr(today);
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const yesterdayStr = toDateStr(yesterday);

    // Determinar si hay una racha activa (hoy o ayer debe estar perfecto)
    const checkHabitCompletion = (dateStr) => {
      const tasks = allTasksByDate[dateStr] || [];
      const habits = tasks.filter((t) => t.isHabit);
      
      if (habits.length === 0) return false;
      
      const completedHabits = habits.filter((h) => h.done);
      return completedHabits.length === habits.length;
    };

    let streakEnd = null;
    if (checkHabitCompletion(todayStr)) {
      streakEnd = today;
    } else if (checkHabitCompletion(yesterdayStr)) {
      streakEnd = yesterday;
    }

    if (!streakEnd) return 0;

    // Contar hacia atrás desde el último día perfecto
    let currentStreak = 1;
    let checkDate = new Date(streakEnd);
    
    while (true) {
      checkDate.setDate(checkDate.getDate() - 1);
      const checkStr = toDateStr(checkDate);
      
      const tasks = allTasksByDate[checkStr] || [];
      const habits = tasks.filter((t) => t.isHabit);
      
      // Manejar días sin hábitos o weekends para hábitos weekdays-only
      if (habits.length === 0) {
        break;
      }

      const taskDate = new Date(checkStr);
      const jsDay = taskDate.getDay();
      const isWeekend = jsDay === 0 || jsDay === 6;

      const weekdayHabits = habits.filter((h) => h.habitFrequency === "weekdays");
      const otherHabits = habits.filter((h) => h.habitFrequency !== "weekdays");

      // Si solo hay hábitos weekdays y es fin de semana, no rompe la racha
      if (weekdayHabits.length > 0 && otherHabits.length === 0 && isWeekend) {
        continue;
      }

      const completedHabits = habits.filter((h) => h.done);
      if (completedHabits.length === habits.length) {
        currentStreak++;
      } else {
        break;
      }
    }

    return currentStreak;
  },

  // Agrega TODOS los hábitos históricos por día de la semana
  // (ej: suma todos los Lunes históricos, todos los Martes históricos, etc.)
  calculateWeeklyHabitProgress(allTasksByDate) {
    if (!allTasksByDate) {
      return [
        { day: "Lun", habits: 0, completed: 0 },
        { day: "Mar", habits: 0, completed: 0 },
        { day: "Mié", habits: 0, completed: 0 },
        { day: "Jue", habits: 0, completed: 0 },
        { day: "Vie", habits: 0, completed: 0 },
        { day: "Sáb", habits: 0, completed: 0 },
        { day: "Dom", habits: 0, completed: 0 },
      ];
    }

    const dayNames = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

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
        completion:
          totalHabits > 0
            ? Math.round((completedHabits / totalHabits) * 100)
            : 0,
      };
    });

    return weeklyData;
  },

  // Calcula progreso de hábitos SOLO para la semana actual (Lun-Dom)
  calculateCurrentWeekHabitProgress(allTasksByDate) {
    if (!allTasksByDate) {
      return [
        { day: "Lun", habits: 0, completed: 0, completion: 0 },
        { day: "Mar", habits: 0, completed: 0, completion: 0 },
        { day: "Mié", habits: 0, completed: 0, completion: 0 },
        { day: "Jue", habits: 0, completed: 0, completion: 0 },
        { day: "Vie", habits: 0, completed: 0, completion: 0 },
        { day: "Sáb", habits: 0, completed: 0, completion: 0 },
        { day: "Dom", habits: 0, completed: 0, completion: 0 },
      ];
    }

    const today = new Date();
    const currentDay = today.getDay(); // 0 (Sun) to 6 (Sat)
    const diffToMon = currentDay === 0 ? 6 : currentDay - 1;

    // Get last Monday
    const monday = new Date(today);
    monday.setDate(today.getDate() - diffToMon);

    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      weekDates.push(`${year}-${month}-${day}`);
    }

    const dayNames = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

    return weekDates.map((dateStr, index) => {
      const tasks = allTasksByDate[dateStr] || [];
      const dayHabits = tasks.filter((t) => t.isHabit);
      const completedHabits = dayHabits.filter((h) => h.done).length;
      const totalHabits = dayHabits.length;

      return {
        day: dayNames[index],
        habits: totalHabits,
        completed: completedHabits,
        completion:
          totalHabits > 0
            ? Math.round((completedHabits / totalHabits) * 100)
            : 0,
      };
    });
  },
};
