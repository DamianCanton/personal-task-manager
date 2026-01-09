import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { getPrettyDate } from '../../utils/dateHelpers';
import { useTasks } from '../../hooks/useTasks';
import { getToday } from '../../utils/dateHelpers';

export default function Header({ date, onPrev, onNext, title }) {
  const { navigateDay } = useTasks();
  const today = getToday();
  const isToday = date === today;

  return (
    <header className="sticky top-0 z-30 bg-surface-1/90 backdrop-blur-md px-4 py-3">
      <div className="flex justify-between items-center max-w-2xl mx-auto">
        <div className="w-10">
          {onPrev && (
            <button
              onClick={onPrev}
              className="p-2 rounded-full hover:bg-surface-2 text-md-on-surface-variant-dark transition-colors"
              aria-label="Día anterior"
            >
              <ChevronLeft size={24} />
            </button>
          )}
        </div>

        <div className="text-center flex-1">
          {title ? (
            <h1 className="text-xl font-medium text-md-on-surface-dark">{title}</h1>
          ) : (
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-normal text-md-on-surface-dark capitalize">
                  {date ? getPrettyDate(date).split(',')[0] : 'Hoy'}
                </h1>
                {isToday && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-md-primary-dark/20 text-md-primary-dark">
                    Hoy
                  </span>
                )}
              </div>
              <p className="text-sm text-md-on-surface-variant-dark capitalize font-light">
                {date ? getPrettyDate(date).split(',')[1]?.trim() : ''}
              </p>
            </div>
          )}
        </div>

        <div className="w-10 flex justify-end gap-1">
          <button
            onClick={() => navigateDay(date, today - date)}
            className={`
              p-2 rounded-full transition-colors
              ${date === today
                ? 'text-md-on-surface-variant-dark/50 cursor-default'
                : 'hover:bg-surface-2 text-md-on-surface-variant-dark'
              }
            `}
            disabled={date === today}
            aria-label="Ir a hoy"
          >
            <Calendar size={20} />
          </button>
          {onNext && (
            <button
              onClick={onNext}
              className="p-2 rounded-full hover:bg-surface-2 text-md-on-surface-variant-dark transition-colors"
              aria-label="Día siguiente"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
