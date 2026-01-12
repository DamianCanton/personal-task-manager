import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { getPrettyDate } from "../../utils/dateHelpers";
import { useTasks } from "../../hooks/useTasks";
import { getToday } from "../../utils/dateHelpers";

export default function Header({ date, onPrev, onNext, title }) {
  const { navigateDay } = useTasks();
  const today = getToday();
  const isToday = date === today;

  const buttonClass =
    "p-2 rounded-full text-primary-muted hover:text-primary-text hover:bg-white/5 transition-all active:scale-95";

  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-background/50 border-b border-white/5 supports-[backdrop-filter]:bg-background/20">
      <div className="flex justify-between items-center max-w-2xl mx-auto px-6 py-4">
        <div className="w-10">
          {onPrev && (
            <button
              onClick={onPrev}
              className={buttonClass}
              aria-label="Día anterior"
            >
              <ChevronLeft size={20} />
            </button>
          )}
        </div>

        <div className="text-center flex-1">
          {title ? (
            <h1 className="text-lg font-medium tracking-tight text-primary-text">
              {title}
            </h1>
          ) : (
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-semibold tracking-tight text-primary-text capitalize">
                  {date ? getPrettyDate(date).split(",")[0] : "Hoy"}
                </h1>
                {isToday && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/10 text-white border border-white/10 shadow-sm">
                    Hoy
                  </span>
                )}
              </div>
              <p className="text-sm text-primary-muted font-medium capitalize tracking-normal opacity-80">
                {date ? getPrettyDate(date).split(",")[1]?.trim() : ""}
              </p>
            </div>
          )}
        </div>

        <div className="w-10 flex justify-end gap-1">
          <button
            onClick={() => navigateDay(date, 0)}
            className={`
              ${buttonClass}
              ${
                date === today
                  ? "opacity-30 cursor-default hover:bg-transparent hover:text-primary-muted"
                  : ""
              }
            `}
            disabled={date === today}
            aria-label="Ir a hoy"
          >
            <Calendar size={18} />
          </button>
          {onNext && (
            <button
              onClick={onNext}
              className={buttonClass}
              aria-label="Día siguiente"
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
