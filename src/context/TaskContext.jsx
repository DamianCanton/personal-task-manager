import { useState, useEffect, useCallback, createContext } from 'react';
import { getToday, addDays, getDayOfWeek } from '../utils/dateHelpers';
import { taskService } from '../services/taskService';

export const TaskContext = createContext(null);

const shouldCreateNextHabit = (frequency, currentDate) => {
  const dayOfWeek = getDayOfWeek(currentDate);

  switch (frequency) {
    case 'daily':
      return true;
    case 'weekdays':
      return dayOfWeek >= 1 && dayOfWeek <= 5;
    case 'weekly':
      return dayOfWeek === 1;
    default:
      return true;
  }
};

const getNextHabitDate = (currentDate, frequency) => {
  const dayOfWeek = getDayOfWeek(currentDate);

  switch (frequency) {
    case 'daily':
      return addDays(currentDate, 1);
    case 'weekdays':
      if (dayOfWeek < 5) {
        return addDays(currentDate, 1);
      }
      return addDays(currentDate, 8 - dayOfWeek);
    case 'weekly':
      return addDays(currentDate, 7);
    default:
      return addDays(currentDate, 1);
  }
};

export function TaskProvider({ children }) {
  const [currentDate, setCurrentDate] = useState(getToday());
  const [tasks, setTasks] = useState({});

  const loadTasksForDate = useCallback((date) => {
    setTasks((prev) => {
      if (prev[date]) return prev;
      const loaded = taskService.getTasks(date);
      return { ...prev, [date]: loaded };
    });
  }, []);

  useEffect(() => {
    loadTasksForDate(currentDate);
    loadTasksForDate(addDays(currentDate, 1));
  }, [currentDate, loadTasksForDate]);

  const getTasksForDate = useCallback((date) => {
    return tasks[date] || [];
  }, [tasks]);

  const addTask = useCallback((date, task) => {
    setTasks((prev) => {
      const currentList = prev[date] || [];
      const newTasksForDate = [
        ...currentList,
        { ...task, id: Date.now().toString(), done: false },
      ];
      taskService.saveTasks(date, newTasksForDate);
      return { ...prev, [date]: newTasksForDate };
    });
  }, []);

  const toggleTask = useCallback((date, taskId) => {
    setTasks((prev) => {
      const currentList = prev[date] || [];
      const taskToToggle = currentList.find((t) => t.id === taskId);

      const newTasksForDate = currentList.map((t) =>
        t.id === taskId ? { ...t, done: !t.done } : t
      );

      if (taskToToggle && !taskToToggle.done && taskToToggle.isHabit) {
        const nextDate = getNextHabitDate(date, taskToToggle.habitFrequency);

        setTimeout(() => {
          setTasks((prevState) => {
            const existingTasks = prevState[nextDate] || [];
            const habitAlreadyExists = existingTasks.some(
              (t) => t.title === taskToToggle.title && t.isHabit && !t.done
            );

            if (!habitAlreadyExists && shouldCreateNextHabit(taskToToggle.habitFrequency, date)) {
              const newHabit = {
                ...taskToToggle,
                id: Date.now().toString(),
                done: false,
              };
              const updatedTasks = {
                ...prevState,
                [nextDate]: [...existingTasks, newHabit],
              };
              taskService.saveTasks(nextDate, [...existingTasks, newHabit]);
              return updatedTasks;
            }
            return prevState;
          });
        }, 0);
      }

      taskService.saveTasks(date, newTasksForDate);
      return { ...prev, [date]: newTasksForDate };
    });
  }, []);

  const deleteTask = useCallback((date, taskId) => {
    setTasks((prev) => {
      const currentList = prev[date] || [];
      const newTasksForDate = currentList.filter((t) => t.id !== taskId);
      taskService.saveTasks(date, newTasksForDate);
      return { ...prev, [date]: newTasksForDate };
    });
  }, []);

  const updateTask = useCallback((date, updatedTask) => {
    setTasks((prev) => {
      const currentList = prev[date] || [];
      const newTasksForDate = currentList.map((t) =>
        t.id === updatedTask.id ? updatedTask : t
      );
      taskService.saveTasks(date, newTasksForDate);
      return { ...prev, [date]: newTasksForDate };
    });
  }, []);

  const navigateDay = useCallback((offset) => {
    setCurrentDate((prev) => addDays(prev, offset));
  }, []);

  const value = {
    currentDate,
    tasks,
    getTasksForDate,
    addTask,
    toggleTask,
    deleteTask,
    updateTask,
    navigateDay,
    setCurrentDate,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}
