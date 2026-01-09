import TaskCard from './TaskCard';
import { AnimatePresence } from 'framer-motion';

export default function TaskList({ tasks, onToggle, onEdit, onDelete }) {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <div className="text-6xl mb-4 opacity-30">📝</div>
        <p className="text-lg font-medium text-md-on-surface-variant-dark mb-2">
          No hay tareas para este día
        </p>
        <p className="text-sm text-md-on-surface-variant-dark/60">
          ¡Añade una nueva tarea para comenzar!
        </p>
      </div>
    );
  }

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.done === b.done) {
      return (a.time || '').localeCompare(b.time || '');
    }
    return a.done ? 1 : -1;
  });

  return (
    <div className="pb-32 px-4 max-w-2xl mx-auto space-y-3">
      <AnimatePresence mode="popLayout">
        {sortedTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
