import { mockTasks } from "../data/mockData";

export const taskService = {
  getTasks(date) {
    const stored = localStorage.getItem(`tasks_${date}`);
    if (stored) return JSON.parse(stored);
    // If not stored, return mock data if available
    return mockTasks[date] || [];
  },

  saveTasks(date, tasks) {
    localStorage.setItem(`tasks_${date}`, JSON.stringify(tasks));
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
