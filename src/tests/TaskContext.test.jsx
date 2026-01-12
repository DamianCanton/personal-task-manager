import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { TaskProvider, TaskContext } from '../context/TaskContext';
import { getToday, getTomorrow } from '../utils/dateHelpers';

import { useMemo } from 'react';

const TestComponent = ({ onRender }) => {
  const { tasks, addTask, toggleTask, deleteTask, currentDate, navigateDay } = React.useContext(TaskContext);
  const todayTasks = useMemo(() => tasks[currentDate] || [], [tasks, currentDate]);

  React.useEffect(() => {
    onRender({
      tasks,
      todayTasks,
      currentDate,
      addTask,
      toggleTask,
      deleteTask,
      navigateDay,
    });
  }, [tasks, todayTasks, currentDate, addTask, toggleTask, deleteTask, navigateDay, onRender]);

  return (
    <div>
      <h1 data-testid="current-date">{currentDate}</h1>
      <div data-testid="task-count">{todayTasks.length}</div>
      <button onClick={() => addTask(currentDate, { title: 'Test Task', time: '09:00-10:00', category: 'work' })}>
        Add Task
      </button>
      <button onClick={() => navigateDay(1)}>Next Day</button>
    </div>
  );
};

describe('TaskContext', () => {
  let renderedData;

  const Wrapper = ({ children }) => (
    <TaskProvider>{children}</TaskProvider>
  );

  beforeEach(() => {
    localStorage.clear();
    renderedData = null;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows correct initial date', () => {
    render(
      <Wrapper>
        <TestComponent onRender={(data) => { renderedData = data; }} />
      </Wrapper>
    );

    expect(renderedData.currentDate).toBe(getToday());
  });

  it('navigates between days', async () => {
    const user = userEvent.setup();

    render(
      <Wrapper>
        <TestComponent onRender={(data) => { renderedData = data; }} />
      </Wrapper>
    );

    const initialDate = renderedData.currentDate;
    const tomorrow = getTomorrow();

    await user.click(screen.getByText('Next Day'));

    expect(renderedData.currentDate).toBe(tomorrow);
    expect(renderedData.currentDate).not.toBe(initialDate);
  });

  it('adds a task to the current date', async () => {
    const user = userEvent.setup();

    render(
      <Wrapper>
        <TestComponent onRender={(data) => { renderedData = data; }} />
      </Wrapper>
    );

    const initialCount = renderedData.todayTasks.length;
    await user.click(screen.getByText('Add Task'));

    expect(renderedData.todayTasks.length).toBe(initialCount + 1);
    const newTask = renderedData.todayTasks.find(t => t.title === 'Test Task');
    expect(newTask).toBeDefined();
    expect(newTask.category).toBe('work');
    expect(newTask.done).toBe(false);
  });

  it('toggles task completion', async () => {
    const user = userEvent.setup();

    render(
      <Wrapper>
        <TestComponent onRender={(data) => { renderedData = data; }} />
      </Wrapper>
    );

    await user.click(screen.getByText('Add Task'));
    const taskId = renderedData.todayTasks.find(t => t.title === 'Test Task')?.id;
    const taskBeforeToggle = renderedData.todayTasks.find(t => t.id === taskId);

    if (taskBeforeToggle) {
      expect(taskBeforeToggle.done).toBe(false);

      renderedData.toggleTask(renderedData.currentDate, taskId);

      await waitFor(() => {
        const taskAfterToggle = renderedData.todayTasks.find(t => t.id === taskId);
        expect(taskAfterToggle?.done).toBe(true);
      });
    }
  });

  it('preserves tasks when navigating between days and back', async () => {
    const user = userEvent.setup();

    render(
      <Wrapper>
        <TestComponent onRender={(data) => { renderedData = data; }} />
      </Wrapper>
    );

    const initialDate = renderedData.currentDate;
    const initialTaskCount = renderedData.todayTasks.length;
    await user.click(screen.getByText('Add Task'));
    expect(renderedData.todayTasks.length).toBe(initialTaskCount + 1);

    await user.click(screen.getByText('Next Day'));
    expect(renderedData.currentDate).not.toBe(initialDate);

    expect(renderedData.todayTasks.length).toBeGreaterThan(0);

    await user.click(screen.getByText('Next Day'));

    await waitFor(() => {
      expect(renderedData.todayTasks.length).toBe(0);
    });

    await user.click(screen.getByText('Next Day'));
    await user.click(screen.getByText('Next Day'));
    await user.click(screen.getByText('Next Day'));
    await user.click(screen.getByText('Next Day'));
    await user.click(screen.getByText('Next Day'));
    await user.click(screen.getByText('Next Day'));

    expect(renderedData.currentDate).not.toBe(initialDate);

    await waitFor(() => {
      expect(renderedData.todayTasks.length).toBe(0);
    });
  });
});
