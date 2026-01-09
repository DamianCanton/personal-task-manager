import { useState } from "react";
import {
  Check,
  Clock,
  Edit,
  Delete,
  ChevronDown,
  ChevronUp,
  Repeat,
} from "lucide-react";
import Card from "../common/Card";
import { CATEGORIES } from "../../utils/constants";

export default function TaskCard({
  task,
  onToggle,
  onEdit,
  onDelete,
  onClick,
}) {
  const category =
    CATEGORIES.find((c) => c.value === task.category) || CATEGORIES[0];
  const isDone = task.done;
  const [showNotes, setShowNotes] = useState(false);

  // Bento Pastel Map
  const categoryColorMap = {
    work: "#818cf8", // Indigo
    study: "#c084fc", // Purple
    sport: "#34d399", // Emerald
    personal: "#fb7185", // Rose
  };

  const activeColor = categoryColorMap[task.category] || category.color;

  const hasNotes = task.notes && task.notes.trim().length > 0;
  const isHabit = task.isHabit;

  return (
    <div
      onClick={onClick}
      className={`
        relative group transition-all duration-300
        ${isDone ? "opacity-50 grayscale-[0.5]" : "hover:scale-[1.01]"}
      `}
    >
      <Card
        padding="none"
        className="overflow-visible border-transparent hover:border-white/10 group-hover:shadow-glow-subtle bg-surface"
        interactive
      >
        <div className="flex items-stretch min-h-[5rem]">
          {/* Sidebar Color */}
          <div
            className="w-1.5 flex-shrink-0 transition-colors"
            style={{ backgroundColor: activeColor }}
          />

          <div className="flex-1 flex flex-col justify-center">
            <div className="flex items-center p-4 gap-4">
              {/* Checkbox */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggle(task.id);
                }}
                className={`
                  relative flex-shrink-0 w-6 h-6 rounded-full border-2 cursor-pointer
                  transition-all duration-200 ease-out
                  ${
                    isDone
                      ? "bg-transparent border-primary-muted"
                      : "border-border-subtle group-hover:border-primary-text"
                  }
                `}
                style={
                  isDone
                    ? { borderColor: activeColor, backgroundColor: activeColor }
                    : {}
                }
              >
                <Check
                  size={14}
                  className={`
                    absolute inset-0 m-auto text-black
                    transition-transform duration-200
                    ${isDone ? "scale-100" : "scale-0"}
                  `}
                  strokeWidth={4}
                />
              </button>

              {/* Content */}
              <div className="flex-1 min-w-0 flex flex-col gap-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full uppercase"
                    style={{
                      backgroundColor: `${activeColor}15`,
                      color: activeColor,
                    }}
                  >
                    {category.label}
                  </span>
                  {isHabit && (
                    <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 flex items-center gap-1 uppercase">
                      <Repeat size={10} />
                      Hábito
                    </span>
                  )}
                  {task.time && (
                    <div className="flex items-center gap-1 text-xs text-primary-muted font-medium ml-auto">
                      <Clock size={12} className="flex-shrink-0" />
                      <span>{task.time}</span>
                    </div>
                  )}
                </div>

                <h3
                  className={`
                    text-base font-semibold tracking-tight transition-all
                    ${
                      isDone
                        ? "line-through text-primary-muted"
                        : "text-primary-text"
                    }
                  `}
                >
                  {task.title}
                </h3>
              </div>
            </div>

            {/* Actions & Notes expansion */}
            {(hasNotes || !isDone) && (
              <div className="flex items-center justify-between px-4 pb-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute right-4 top-4">
                {/* Actions floated to right top */}
                <div className="flex items-center gap-1 bg-surface-highlight/90 backdrop-blur-sm rounded-lg p-1 shadow-sm border border-white/5">
                  {hasNotes && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowNotes(!showNotes);
                      }}
                      className={`p-1.5 rounded-md transition-colors ${
                        showNotes
                          ? "text-primary-text bg-white/10"
                          : "text-primary-muted hover:text-primary-text hover:bg-white/5"
                      }`}
                    >
                      {showNotes ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </button>
                  )}
                  {!isDone && onEdit && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(task);
                      }}
                      className="p-1.5 rounded-md text-primary-muted hover:text-primary-text hover:bg-white/5 transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(task);
                      }}
                      className="p-1.5 rounded-md text-primary-muted hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <Delete size={16} />
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Notes content */}
            {hasNotes && showNotes && (
              <div className="px-12 pb-4 pt-0">
                <div className="p-3 rounded-xl bg-surface-highlight/50 text-sm text-primary-muted border-l-2 border-white/10 italic">
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
