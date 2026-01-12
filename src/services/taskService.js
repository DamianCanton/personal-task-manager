import { mockTasks } from "../data/mockData";

export const taskService = {
  getTasks(date) {
    try {
      const stored = localStorage.getItem(`tasks_${date}`);
      if (stored) return JSON.parse(stored);
    } catch (error) {
      console.warn(`Error parsing tasks for ${date}:`, error);
    }
    return mockTasks[date] || [];
  },

  saveTasks(date, tasks) {
    try {
      localStorage.setItem(`tasks_${date}`, JSON.stringify(tasks));
    } catch (error) {
      console.warn(`Error saving tasks for ${date}:`, error);
    }
  },

  updateTask(date, updatedTask) {
    const stored = this.getTasks(date);
    const newTasks = stored.map((t) =>
      t.id === updatedTask.id ? updatedTask : t
    );
    this.saveTasks(date, newTasks);
    return newTasks;
  },
};
