import { getToday, addDays } from "../utils/dateHelpers";

const today = getToday();
const yesterday = addDays(today, -1);
const tomorrow = addDays(today, 1);

export const mockTasks = {
  [today]: [
    {
      id: "1",
      time: "09:00-11:00",
      title: "Diseñar interfaz",
      category: "work",
      done: true,
      notes: "Usar Material Design 3",
      isHabit: false,
    },
    {
      id: "2",
      time: "11:00-12:00",
      title: "Daily Meeting",
      category: "work",
      done: true,
      notes: "Revisar métricas del equipo",
      isHabit: false,
    },
    {
      id: "3",
      time: "13:00-14:00",
      title: "Almuerzo",
      category: "personal",
      done: true,
      isHabit: false,
    },
    {
      id: "4",
      time: "15:00-17:00",
      title: "Implementar Componentes",
      category: "work",
      done: false,
      notes: "Card, Button, Modal",
      isHabit: false,
    },
    {
      id: "5",
      time: "18:00-19:00",
      title: "Gimnasio",
      category: "sport",
      done: false,
      isHabit: true,
      habitFrequency: "daily",
    },
    {
      id: "6",
      time: "07:00-08:00",
      title: "Meditación",
      category: "personal",
      done: false,
      notes: "使用Headspace应用",
      isHabit: true,
      habitFrequency: "weekdays",
    },
  ],
  [tomorrow]: [
    {
      id: "7",
      time: "09:30-11:00",
      title: "Arreglar techo deck",
      category: "personal",
      done: false,
      isHabit: false,
    },
    {
      id: "8",
      time: "11:00-13:30",
      title: "Avanzar tp final Angular",
      category: "study",
      done: false,
      isHabit: false,
    },
    {
      id: "9",
      time: "14:00-17:00",
      title: "Avanzar tp final Angular",
      category: "study",
      done: false,
      isHabit: false,
    },
    {
      id: "10",
      time: "17:00-17:30",
      title: "Caminar",
      category: "sport",
      done: false,
      isHabit: true,
      habitFrequency: "daily",
    },
  ],
  [yesterday]: [
    {
      id: "9",
      time: "10:00-18:00",
      title: "Maratón de código",
      category: "work",
      done: true,
      notes: "Completar refactorización",
      isHabit: false,
    },
  ],
};

export const mockStats = {
  weeklyCompletion: [
    { day: "Lun", completion: 85 },
    { day: "Mar", completion: 92 },
    { day: "Mié", completion: 78 },
    { day: "Jue", completion: 88 },
    { day: "Vie", completion: 95 },
    { day: "Sáb", completion: 70 },
    { day: "Dom", completion: 0 },
  ],
  categoryDistribution: [
    { name: "Trabajo", value: 40, color: "#a8c7fa" },
    { name: "Estudio", value: 35, color: "#c2e7ff" },
    { name: "Deporte", value: 15, color: "#c8e6c9" },
    { name: "Personal", value: 10, color: "#ffe0b2" },
  ],
  streak: 12,
  bestStreak: 45,
  weeklyRate: 87,
};
