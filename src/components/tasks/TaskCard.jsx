import { useState } from 'react';
import { Check, Clock, Edit, Delete, ChevronDown, ChevronUp, Repeat } from 'lucide-react';
import Card from '../common/Card';
import { CATEGORIES } from '../../utils/constants';

export default function TaskCard({
  task,
  onToggle,
  onEdit,
  onDelete,
  onClick,
}) {
  const category = CATEGORIES.find((c) => c.value === task.category) || CATEGORIES[0];
  const isDone = task.done;
  const [showNotes, setShowNotes] = useState(false);

  const categoryColorMap = {
    work: '#a8c7fa',
    study: '#c2e7ff',
    sport: '#c8e6c9',
    personal: '#ffe0b2',
  };

  const hasNotes = task.notes && task.notes.trim().length > 0;
  const isHabit = task.isHabit;

  return (
    <div
      onClick={onClick}
      className={`
        relative group transition-all duration-md-standard
        ${isDone ? 'opacity-60' : 'hover:scale-[1.01]'}
      `}
    >
      <Card
        variant="outlined-interactive"
        padding="none"
        className="overflow-hidden"
      >
        <div className="flex items-stretch">
          <div
            className="w-1.5 flex-shrink-0"
            style={{ backgroundColor: categoryColorMap[task.category] || category.color }}
          />

          <div className="flex-1">
            <div className="flex items-center p-4 gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggle(task.id);
                }}
                className={`
                  relative flex-shrink-0 w-6 h-6 rounded-full border-2
                  transition-all duration-md-short
                  ${isDone
                    ? 'bg-md-primary-dark border-md-primary-dark'
                    : 'border-md-outline-dark group-hover:border-md-primary-dark'
                  }
                `}
              >
                <Check
                  size={16}
                  className={`
                    absolute inset-0 m-auto text-white
                    transition-transform duration-md-short
                    ${isDone ? 'scale-100' : 'scale-0'}
                  `}
                  strokeWidth={3}
                />
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                  <span
                    className="text-[11px] font-medium px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: `${categoryColorMap[task.category]}20`,
                      color: categoryColorMap[task.category],
                    }}
                  >
                    {category.label}
                  </span>
                  {isHabit && (
                    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-amber-400/20 text-amber-400 flex items-center gap-1">
                      <Repeat size={10} />
                      Hábito
                    </span>
                  )}
                </div>
                <h3
                  className={`
                    text-base font-medium truncate transition-all
                    ${isDone ? 'line-through text-md-on-surface-variant-dark' : 'text-md-on-surface-dark'}
                  `}
                >
                  {task.title}
                </h3>
                <div className="flex items-center gap-1 mt-1 text-sm text-md-on-surface-variant-dark">
                  {task.time && (
                    <>
                      <Clock size={14} className="flex-shrink-0" />
                      <span>{task.time}</span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                {hasNotes && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowNotes(!showNotes);
                    }}
                    className={`p-2 rounded-full transition-colors ${showNotes ? 'bg-surface-2 text-md-primary-dark' : 'text-md-on-surface-variant-dark hover:bg-surface-2'}`}
                    title={showNotes ? 'Ocultar notas' : 'Ver notas'}
                  >
                    {showNotes ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                )}
                {!isDone && onEdit && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(task);
                    }}
                    className="p-2 rounded-full text-md-on-surface-variant-dark hover:bg-surface-2 transition-colors"
                    title="Editar"
                  >
                    <Edit size={18} />
                  </button>
                )}

                {onDelete && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(task);
                    }}
                    className="p-2 rounded-full text-md-on-surface-variant-dark hover:bg-error/10 hover:text-md-error transition-colors"
                    title="Eliminar"
                  >
                    <Delete size={18} />
                  </button>
                )}
              </div>
            </div>

            {hasNotes && showNotes && (
              <div className="px-4 pb-4 pl-12">
                <div className="p-3 rounded-lg bg-surface-2 text-sm text-md-on-surface-variant-dark">
                  {task.notes}
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
