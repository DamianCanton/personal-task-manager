import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskForm from '../components/tasks/TaskForm';

describe('TaskForm', () => {
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('renders correctly with default values', () => {
    render(<TaskForm onSubmit={mockOnSubmit} />);

    expect(screen.getByPlaceholderText('Ej: Reunión de diseño')).toBeInTheDocument();
    expect(screen.getByDisplayValue('09:00')).toBeInTheDocument();
    expect(screen.getByDisplayValue('10:00')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /agregar tarea/i })).toBeInTheDocument();
  });

  it('shows error when title is empty and blurred', async () => {
    const user = userEvent.setup();

    render(<TaskForm onSubmit={mockOnSubmit} />);

    const input = screen.getByPlaceholderText('Ej: Reunión de diseño');
    await user.click(input);
    await user.tab();

    expect(await screen.findByText('El título es obligatorio')).toBeInTheDocument();
  });

  it('shows error when title is too short', async () => {
    const user = userEvent.setup();

    render(<TaskForm onSubmit={mockOnSubmit} />);

    const input = screen.getByPlaceholderText('Ej: Reunión de diseño');
    await user.type(input, 'A');
    await user.tab();

    expect(await screen.findByText('Mínimo 2 caracteres')).toBeInTheDocument();
  });

  it('shows error when end time is before start time', async () => {
    const user = userEvent.setup();

    render(<TaskForm onSubmit={mockOnSubmit} />);

    const endTimeInput = screen.getByDisplayValue('10:00');
    await user.clear(endTimeInput);
    await user.type(endTimeInput, '08:00');
    await user.tab();

    expect(await screen.findByText('La hora de fin debe ser posterior a la de inicio')).toBeInTheDocument();
  });

  it('calls onSubmit with correct data when valid', async () => {
    const user = userEvent.setup();

    render(<TaskForm onSubmit={mockOnSubmit} />);

    await user.type(screen.getByPlaceholderText('Ej: Reunión de diseño'), 'Nueva tarea');
    await user.click(screen.getByRole('button', { name: /agregar tarea/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: 'Nueva tarea',
        time: '09:00-10:00',
        category: 'work',
        notes: '',
        isHabit: false,
        habitFrequency: null,
      });
    });
  });

  it('prefills values when initialValues are provided', () => {
    const initialValues = {
      title: 'Tarea existente',
      time: '14:00-15:00',
      category: 'study',
      notes: 'Notas de prueba',
      isHabit: true,
      habitFrequency: 'daily',
    };

    render(<TaskForm onSubmit={mockOnSubmit} initialValues={initialValues} />);

    expect(screen.getByDisplayValue('Tarea existente')).toBeInTheDocument();
    expect(screen.getByDisplayValue('14:00')).toBeInTheDocument();
    expect(screen.getByDisplayValue('15:00')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Notas de prueba')).toBeInTheDocument();
  });

  it('submits habit data when habit option is selected', async () => {
    const user = userEvent.setup();

    render(<TaskForm onSubmit={mockOnSubmit} />);

    await user.type(screen.getByPlaceholderText('Ej: Reunión de diseño'), 'Hábito diario');
    await user.click(screen.getByText('🔄 Repetir como hábito'));
    await user.click(screen.getByRole('button', { name: /agregar tarea/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: 'Hábito diario',
        time: '09:00-10:00',
        category: 'work',
        notes: '',
        isHabit: true,
        habitFrequency: 'daily',
      });
    });
  });
});
