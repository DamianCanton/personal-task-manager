import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { TaskProvider, TaskContext } from '../context/TaskContext';
import { getToday, getTomorrow, addDays } from '../utils/dateHelpers';

const TestHabitComponent = ({ onRender }) => {
  const {
    tasks,
    currentDate,
    addTask,
    updateAllFutureHabits,
    deleteAllFutureHabits,
  } = React.useContext(TaskContext);

  React.useEffect(() => {
    onRender({
      tasks,
      currentDate,
      addTask,
      updateAllFutureHabits,
      deleteAllFutureHabits,
    });
  }, [tasks, currentDate, addTask, updateAllFutureHabits, deleteAllFutureHabits, onRender]);

  return (
    <div>
      <h1 data-testid="current-date">{currentDate}</h1>
      <div data-testid="task-count">{Object.keys(tasks).length}</div>
    </div>
  );
};

describe('Habit Management', () => {
  let renderedData;

  const Wrapper = ({ children }) => (
    <TaskProvider>{children}</TaskProvider>
  );

  beforeEach(() => {
    localStorage.clear();
    renderedData = null;
  });

  describe('updateAllFutureHabits', () => {
    it('updates all future instances of a habit', async () => {
      const user = userEvent.setup();

      render(
        <Wrapper>
          <TestHabitComponent onRender={(data) => { renderedData = data; }} />
        </Wrapper>
      );

      const today = getToday();
      const tomorrow = getTomorrow();
      const dayAfter = addDays(today, 2);

      // Crear hábito en 3 días diferentes
      const habitTask = {
        title: 'Ejercicio Matutino',
        category: 'sport',
        time: '08:00-09:00',
        isHabit: true,
        habitFrequency: 'daily',
        notes: 'Antes del desayuno',
      };

      renderedData.addTask(today, habitTask);
      
      await waitFor(() => {
        expect(renderedData.tasks[today]).toBeDefined();
      });

      // Simular creación de instancias futuras
      renderedData.addTask(tomorrow, { ...habitTask, id: 'habit-2' });
      renderedData.addTask(dayAfter, { ...habitTask, id: 'habit-3' });

      await waitFor(() => {
        expect(renderedData.tasks[tomorrow]).toBeDefined();
        expect(renderedData.tasks[dayAfter]).toBeDefined();
      });

      // Actualizar todas las instancias futuras
      const updatedData = {
        time: '07:00-08:00',
        notes: 'Nueva hora - temprano',
      };

      const originalTask = renderedData.tasks[today][0];
      renderedData.updateAllFutureHabits(today, originalTask, updatedData);

      await waitFor(() => {
        // Verificar que todos los días tienen el hábito actualizado
        const todayHabit = renderedData.tasks[today]?.find(t => t.title === 'Ejercicio Matutino');
        const tomorrowHabit = renderedData.tasks[tomorrow]?.find(t => t.title === 'Ejercicio Matutino');
        const dayAfterHabit = renderedData.tasks[dayAfter]?.find(t => t.title === 'Ejercicio Matutino');

        expect(todayHabit?.time).toBe('07:00-08:00');
        expect(tomorrowHabit?.time).toBe('07:00-08:00');
        expect(dayAfterHabit?.time).toBe('07:00-08:00');

        expect(todayHabit?.notes).toBe('Nueva hora - temprano');
        expect(tomorrowHabit?.notes).toBe('Nueva hora - temprano');
        expect(dayAfterHabit?.notes).toBe('Nueva hora - temprano');
      });
    });

    it('preserves unique IDs for each habit instance', async () => {
      render(
        <Wrapper>
          <TestHabitComponent onRender={(data) => { renderedData = data; }} />
        </Wrapper>
      );

      const today = getToday();
      const tomorrow = getTomorrow();

      const habitTask = {
        title: 'Meditar',
        category: 'personal',
        time: '20:00-20:30',
        isHabit: true,
        habitFrequency: 'daily',
      };

      renderedData.addTask(today, habitTask);
      
      await waitFor(() => {
        expect(renderedData.tasks[today]).toBeDefined();
      });

      renderedData.addTask(tomorrow, { ...habitTask });

      await waitFor(() => {
        expect(renderedData.tasks[tomorrow]).toBeDefined();
      });

      const todayId = renderedData.tasks[today][0].id;
      const tomorrowId = renderedData.tasks[tomorrow][0].id;

      // IDs deben ser diferentes
      expect(todayId).not.toBe(tomorrowId);

      // Actualizar todas las instancias futuras
      const originalTask = renderedData.tasks[today][0];
      renderedData.updateAllFutureHabits(today, originalTask, { notes: 'Actualizado' });

      await waitFor(() => {
        const todayIdAfter = renderedData.tasks[today][0].id;
        const tomorrowIdAfter = renderedData.tasks[tomorrow][0].id;

        // IDs deben mantenerse únicos después de actualizar
        expect(todayIdAfter).toBe(todayId);
        expect(tomorrowIdAfter).toBe(tomorrowId);
        expect(todayIdAfter).not.toBe(tomorrowIdAfter);
      });
    });

    it('does not affect non-habit tasks', async () => {
      render(
        <Wrapper>
          <TestHabitComponent onRender={(data) => { renderedData = data; }} />
        </Wrapper>
      );

      const today = getToday();

      // Agregar hábito y tarea normal
      const habitTask = {
        title: 'Hábito Test',
        category: 'work',
        isHabit: true,
        habitFrequency: 'daily',
      };

      const regularTask = {
        title: 'Tarea Normal',
        category: 'work',
        isHabit: false,
      };

      renderedData.addTask(today, habitTask);
      renderedData.addTask(today, regularTask);

      await waitFor(() => {
        expect(renderedData.tasks[today]?.length).toBe(2);
      });

      // Actualizar hábito
      const habit = renderedData.tasks[today].find(t => t.isHabit);
      renderedData.updateAllFutureHabits(today, habit, { notes: 'Nueva nota' });

      await waitFor(() => {
        const regular = renderedData.tasks[today]?.find(t => !t.isHabit);
        const habitUpdated = renderedData.tasks[today]?.find(t => t.isHabit);

        // La tarea normal no debe cambiar
        expect(regular?.notes).toBeUndefined();
        // El hábito sí debe cambiar
        expect(habitUpdated?.notes).toBe('Nueva nota');
      });
    });
  });

  describe('deleteAllFutureHabits', () => {
    it('deletes all future instances of a habit', async () => {
      render(
        <Wrapper>
          <TestHabitComponent onRender={(data) => { renderedData = data; }} />
        </Wrapper>
      );

      const today = getToday();
      const tomorrow = getTomorrow();
      const dayAfter = addDays(today, 2);

      const habitTask = {
        title: 'Leer 30 minutos',
        category: 'personal',
        time: '21:00-21:30',
        isHabit: true,
        habitFrequency: 'daily',
      };

      // Crear instancias en 3 días
      renderedData.addTask(today, habitTask);
      
      await waitFor(() => {
        expect(renderedData.tasks[today]).toBeDefined();
      });

      renderedData.addTask(tomorrow, { ...habitTask });
      renderedData.addTask(dayAfter, { ...habitTask });

      await waitFor(() => {
        expect(renderedData.tasks[tomorrow]).toBeDefined();
        expect(renderedData.tasks[dayAfter]).toBeDefined();
      });

      // Eliminar todas las instancias futuras
      const originalTask = renderedData.tasks[today][0];
      renderedData.deleteAllFutureHabits(today, originalTask);

      await waitFor(() => {
        // Verificar que se eliminaron
        const todayTasks = renderedData.tasks[today] || [];
        const tomorrowTasks = renderedData.tasks[tomorrow] || [];
        const dayAfterTasks = renderedData.tasks[dayAfter] || [];

        expect(todayTasks.length).toBe(0);
        expect(tomorrowTasks.length).toBe(0);
        expect(dayAfterTasks.length).toBe(0);
      });
    });

    it('only deletes matching habit instances', async () => {
      render(
        <Wrapper>
          <TestHabitComponent onRender={(data) => { renderedData = data; }} />
        </Wrapper>
      );

      const today = getToday();
      const tomorrow = getTomorrow();

      const habit1 = {
        title: 'Correr',
        category: 'sport',
        isHabit: true,
        habitFrequency: 'daily',
      };

      const habit2 = {
        title: 'Nadar',
        category: 'sport',
        isHabit: true,
        habitFrequency: 'weekly',
      };

      // Crear ambos hábitos en ambos días
      renderedData.addTask(today, habit1);
      renderedData.addTask(today, habit2);
      
      await waitFor(() => {
        expect(renderedData.tasks[today]?.length).toBe(2);
      });

      renderedData.addTask(tomorrow, { ...habit1 });
      renderedData.addTask(tomorrow, { ...habit2 });

      await waitFor(() => {
        expect(renderedData.tasks[tomorrow]?.length).toBe(2);
      });

      // Eliminar solo habit1
      const habitToDelete = renderedData.tasks[today].find(t => t.title === 'Correr');
      renderedData.deleteAllFutureHabits(today, habitToDelete);

      await waitFor(() => {
        const todayTasks = renderedData.tasks[today] || [];
        const tomorrowTasks = renderedData.tasks[tomorrow] || [];

        // Debe quedar solo habit2 en ambos días
        expect(todayTasks.length).toBe(1);
        expect(tomorrowTasks.length).toBe(1);
        expect(todayTasks[0].title).toBe('Nadar');
        expect(tomorrowTasks[0].title).toBe('Nadar');
      });
    });

    it('does not delete past instances', async () => {
      render(
        <Wrapper>
          <TestHabitComponent onRender={(data) => { renderedData = data; }} />
        </Wrapper>
      );

      const today = getToday();
      const yesterday = addDays(today, -1);
      const tomorrow = getTomorrow();

      const habitTask = {
        title: 'Test Habit',
        category: 'work',
        isHabit: true,
        habitFrequency: 'daily',
      };

      // Crear en ayer, hoy y mañana
      renderedData.addTask(yesterday, habitTask);
      renderedData.addTask(today, habitTask);
      renderedData.addTask(tomorrow, habitTask);

      await waitFor(() => {
        expect(renderedData.tasks[yesterday]).toBeDefined();
        expect(renderedData.tasks[today]).toBeDefined();
        expect(renderedData.tasks[tomorrow]).toBeDefined();
      });

      // Eliminar desde hoy hacia futuro
      const habitToDelete = renderedData.tasks[today][0];
      renderedData.deleteAllFutureHabits(today, habitToDelete);

      await waitFor(() => {
        const yesterdayTasks = renderedData.tasks[yesterday] || [];
        const todayTasks = renderedData.tasks[today] || [];
        const tomorrowTasks = renderedData.tasks[tomorrow] || [];

        // Ayer debe mantenerse (está en el pasado)
        expect(yesterdayTasks.length).toBe(1);
        // Hoy y mañana deben eliminarse
        expect(todayTasks.length).toBe(0);
        expect(tomorrowTasks.length).toBe(0);
      });
    });
  });
});
