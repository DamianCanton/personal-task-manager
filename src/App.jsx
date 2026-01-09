import { useState } from 'react';
import { Plus } from 'lucide-react';
import { TaskProvider } from './context/TaskContext';
import { useTasks } from './hooks/useTasks';
import { useStats } from './hooks/useStats';
import { getPrettyDate, getTomorrow, getToday } from './utils/dateHelpers';
import TabBar from './components/layout/TabBar';
import DayNavigator from './components/tasks/DayNavigator';
import TaskList from './components/tasks/TaskList';
import Header from './components/layout/Header';
import StatsOverview from './components/stats/StatsOverview';
import HabitStats from './components/stats/HabitStats';
import CompletionChart from './components/stats/CompletionChart';
import CategoryChart from './components/stats/CategoryChart';
import Modal from './components/common/Modal';
import TaskForm from './components/tasks/TaskForm';
import ProgressBar from './components/common/ProgressBar';
import { AnimatePresence, motion } from 'framer-motion';

function DailyView({ onEditTask }) {
  const { currentDate, todayTasks, toggleTask, deleteTask } = useTasks();
  const completion =
    todayTasks.length > 0
      ? (todayTasks.filter((t) => t.done).length / todayTasks.length) * 100
      : 0;

  const handleDelete = (task) => {
    if (window.confirm('¿Eliminar esta tarea permanentemente?')) {
      deleteTask(currentDate, task.id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="pb-24"
    >
      <DayNavigator />
      <div className="px-4 mt-2 mb-6">
        <div className="flex justify-between items-end mb-2">
          <span className="text-sm text-md-on-surface-variant-dark">
            Progreso diario
          </span>
          <span className="text-sm font-medium text-md-primary-dark">
            {Math.round(completion)}%
          </span>
        </div>
        <ProgressBar progress={completion} />
      </div>
      <TaskList
        tasks={todayTasks}
        onToggle={(id) => toggleTask(currentDate, id)}
        onEdit={onEditTask}
        onDelete={handleDelete}
      />
    </motion.div>
  );
}

function StatsView() {
  const stats = useStats();
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.25 }}
      className="pb-24 px-4 pt-2"
    >
      <Header title="Estadísticas" />
      <div className="mt-4 space-y-6">
        <StatsOverview {...stats} />
        <CompletionChart data={stats.weeklyCompletion} />
        <CategoryChart data={stats.categoryDistribution} />
        <HabitStats habitStats={stats.habitStats} weeklyHabitProgress={stats.weeklyHabitProgress} />
      </div>
    </motion.div>
  );
}

function TaskModal({ isOpen, onClose, targetDate, initialTask }) {
  const { addTask, updateTask, getTasksForDate } = useTasks();
  const dayTasks = targetDate ? getTasksForDate(targetDate) : [];

  const handleTaskSubmit = (taskData) => {
    if (initialTask) {
      updateTask(targetDate, { ...initialTask, ...taskData });
    } else {
      addTask(targetDate, taskData);
    }
    onClose();
  };

  const title = initialTask
    ? 'Editar Tarea'
    : targetDate
    ? `Planificar para ${getPrettyDate(targetDate)}`
    : 'Nueva Tarea';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-6">
        <TaskForm
          onSubmit={handleTaskSubmit}
          initialValues={initialTask}
          submitLabel={initialTask ? 'Guardar Cambios' : 'Agregar Tarea'}
        />

        {!initialTask && dayTasks && dayTasks.length > 0 && (
          <div className="border-t border-md-outline-dark/10 pt-6">
            <h3 className="text-sm font-medium text-md-on-surface-variant-dark mb-4">
              Ya programado
            </h3>
            <div className="space-y-2">
              {dayTasks.map((t) => (
                <div
                  key={t.id}
                  className="p-3 rounded-lg bg-surface-2 text-sm text-md-on-surface-variant-dark"
                >
                  <span className={t.done ? 'line-through' : ''}>{t.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

function MainApp() {
  const [activeTab, setActiveTab] = useState('today');
  const [modalState, setModalState] = useState({
    isOpen: false,
    date: null,
    task: null,
  });
  const { currentDate } = useTasks();

  const openAddModal = () => {
    const today = getToday();
    const defaultDate = currentDate === today ? getTomorrow() : currentDate;
    setModalState({ isOpen: true, date: defaultDate, task: null });
  };

  const openEditModal = (task) => {
    setModalState({ isOpen: true, date: currentDate, task: task });
  };

  const handleCloseModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="min-h-screen bg-md-background-dark font-google text-md-on-surface-dark selection:bg-md-primary-dark/30">
      <AnimatePresence mode="wait">
        {activeTab === 'today' ? (
          <DailyView key="today" onEditTask={openEditModal} />
        ) : (
          <StatsView key="stats" />
        )}
      </AnimatePresence>

      {activeTab === 'today' && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={openAddModal}
          className="fixed bottom-24 right-5 w-14 h-14 bg-md-primary-dark text-md-on-primary-dark rounded-full shadow-md-fab flex items-center justify-center z-30"
          aria-label="Agregar tarea"
        >
          <Plus size={24} />
        </motion.button>
      )}

      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />

      <TaskModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        targetDate={modalState.date}
        initialTask={modalState.task}
      />
    </div>
  );
}

export default function App() {
  return (
    <TaskProvider>
      <MainApp />
    </TaskProvider>
  );
}
