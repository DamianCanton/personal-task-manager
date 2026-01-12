import { useMemo } from 'react';
import TaskCard from "./TaskCard";
import { AnimatePresence, motion } from "framer-motion";

export default function TaskList({ tasks, onToggle, onEdit, onDelete }) {
  const sortedTasks = useMemo(() => {
    if (!tasks || tasks.length === 0) return [];
    return [...tasks].sort((a, b) => {
      if (a.done === b.done) {
        return (a.time || "").localeCompare(b.time || "");
      }
      return a.done ? 1 : -1;
    });
  }, [tasks]);

  if (!tasks || tasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-20 px-4"
      >
        <div className="w-16 h-16 rounded-full bg-surface-highlight flex items-center justify-center mb-4 text-3xl">
          ✨
        </div>
        <p className="text-lg font-medium text-primary-text mb-2 tracking-tight">
          Tu día está libre
        </p>
        <p className="text-sm text-primary-muted text-center max-w-xs">
          Disfruta del tiempo libre o añade una nueva tarea para comenzar.
        </p>
      </motion.div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="pb-32 px-4 max-w-2xl mx-auto space-y-3"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {sortedTasks.map((task) => (
          <motion.div key={task.id} variants={item} layout>
            <TaskCard
              task={task}
              onToggle={onToggle}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
