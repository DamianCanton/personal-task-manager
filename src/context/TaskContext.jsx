import { useState, useEffect, createContext, useRef, useCallback } from "react";
import { getToday, addDays, getDayOfWeek } from "../utils/dateHelpers";
import { taskService } from "../services/taskService";

export const TaskContext = createContext(null);

const shouldCreateNextHabit = (frequency, currentDate) => {
  const dayOfWeek = getDayOfWeek(currentDate);

  switch (frequency) {
    case "daily":
      return true;
    case "weekdays":
      return dayOfWeek >= 1 && dayOfWeek <= 5;
    case "weekly":
      return dayOfWeek === 1;
    default:
      return true;
  }
};

const getNextHabitDate = (currentDate, frequency) => {
  const dayOfWeek = getDayOfWeek(currentDate);

  switch (frequency) {
    case "daily":
      return addDays(currentDate, 1);
    case "weekdays":
      if (dayOfWeek < 5) {
        return addDays(currentDate, 1);
      }
      return addDays(currentDate, 8 - dayOfWeek);
    case "weekly":
      return addDays(currentDate, 7);
    default:
      return addDays(currentDate, 1);
  }
};

export function TaskProvider({ children }) {
  const [currentDate, setCurrentDate] = useState(getToday());
  const [tasks, setTasks] = useState({});
  const loadedDatesRef = useRef(new Set());

  useEffect(() => {
    // Siempre recargar las tareas de la fecha actual desde localStorage
    // para evitar desincronización cuando se navega con setCurrentDate
    const currentDateTasks = taskService.getTasks(currentDate);
    setTasks((prev) => ({ ...prev, [currentDate]: currentDateTasks }));
    loadedDatesRef.current.add(currentDate);

    // Pre-cargar fechas adyacentes solo si no han sido cargadas
    const adjacentDates = [addDays(currentDate, 1), addDays(currentDate, -1)];

    adjacentDates.forEach((date) => {
      if (!loadedDatesRef.current.has(date)) {
        const loaded = taskService.getTasks(date);
        setTasks((prev) => ({ ...prev, [date]: loaded }));
        loadedDatesRef.current.add(date);
      }
    });
  }, [currentDate]);

  const getTasksForDate = useCallback(
    (date) => {
      return tasks[date] || [];
    },
    [tasks]
  );

  const addTask = useCallback(
    (date, task) => {
      const newTask = { ...task, id: Date.now().toString(), done: false };
      const currentList = tasks[date] || [];
      const newTasksForDate = [...currentList, newTask];

      setTasks((prev) => ({ ...prev, [date]: newTasksForDate }));
      taskService.saveTasks(date, newTasksForDate);
    },
    [tasks]
  );

  const toggleTask = useCallback(
    (date, taskId) => {
      const currentList = tasks[date] || [];
      const taskToToggle = currentList.find((t) => t.id === taskId);

      const newTasksForDate = currentList.map((t) =>
        t.id === taskId ? { ...t, done: !t.done } : t
      );

      setTasks((prev) => ({ ...prev, [date]: newTasksForDate }));
      taskService.saveTasks(date, newTasksForDate);

      if (taskToToggle && !taskToToggle.done && taskToToggle.isHabit) {
        const nextDate = getNextHabitDate(date, taskToToggle.habitFrequency);

        setTimeout(() => {
          setTasks((prevState) => {
            const existingTasks = prevState[nextDate] || [];
            const habitAlreadyExists = existingTasks.some(
              (t) => t.title === taskToToggle.title && t.isHabit && !t.done
            );

            if (
              !habitAlreadyExists &&
              shouldCreateNextHabit(taskToToggle.habitFrequency, date)
            ) {
              const newHabit = {
                ...taskToToggle,
                id: Date.now().toString(),
                done: false,
              };
              const updatedTasks = [...existingTasks, newHabit];
              taskService.saveTasks(nextDate, updatedTasks);
              return { ...prevState, [nextDate]: updatedTasks };
            }
            return prevState;
          });
        }, 0);
      }
    },
    [tasks]
  );

  const deleteTask = useCallback(
    (date, taskId) => {
      const currentList = tasks[date] || [];
      const newTasksForDate = currentList.filter((t) => t.id !== taskId);

      setTasks((prev) => ({ ...prev, [date]: newTasksForDate }));
      taskService.saveTasks(date, newTasksForDate);
    },
    [tasks]
  );

  const updateTask = useCallback(
    (date, updatedTask) => {
      const currentList = tasks[date] || [];
      const newTasksForDate = currentList.map((t) =>
        t.id === updatedTask.id ? updatedTask : t
      );

      setTasks((prev) => ({ ...prev, [date]: newTasksForDate }));
      taskService.saveTasks(date, newTasksForDate);
    },
    [tasks]
  );

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
