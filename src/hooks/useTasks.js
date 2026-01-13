import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { getTomorrow } from "../utils/dateHelpers";

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within TaskProvider");

  const tomorrow = getTomorrow();

  return {
    currentDate: context.currentDate,
    todayTasks: context.getTasksForDate(context.currentDate),
    tomorrowTasks: context.getTasksForDate(tomorrow),
    allTasks: context.tasks,
    addTask: context.addTask,
    toggleTask: context.toggleTask,
    deleteTask: context.deleteTask,
    updateTask: context.updateTask,
    updateAllFutureHabits: context.updateAllFutureHabits,
    deleteAllFutureHabits: context.deleteAllFutureHabits,
    navigateDay: context.navigateDay,
    setCurrentDate: context.setCurrentDate,
    getTasksForDate: context.getTasksForDate,
  };
}
