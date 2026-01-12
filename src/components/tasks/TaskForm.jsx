import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { CATEGORIES, HABIT_FREQUENCIES } from '../../utils/constants';
import Button from '../common/Button';

export default function TaskForm({
  onSubmit,
  initialValues,
  submitLabel = 'Agregar Tarea',
}) {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [category, setCategory] = useState(CATEGORIES[0].value);
  const [notes, setNotes] = useState('');
  const [isHabit, setIsHabit] = useState(false);
  const [habitFrequency, setHabitFrequency] = useState('daily');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showHabitOptions, setShowHabitOptions] = useState(false);

  const resetForm = () => {
    setTitle('');
    setStartTime('09:00');
    setEndTime('10:00');
    setCategory(CATEGORIES[0].value);
    setNotes('');
    setIsHabit(false);
    setHabitFrequency('daily');
    setShowHabitOptions(false);
    setErrors({});
    setTouched({});
  };

  useEffect(() => {
    if (initialValues) {
      setTitle(initialValues.title || '');
      if (initialValues.time && initialValues.time.includes('-')) {
        const [start, end] = initialValues.time.split('-');
        setStartTime(start);
        setEndTime(end);
      } else {
        setStartTime('09:00');
        setEndTime('10:00');
      }
      setCategory(initialValues.category || CATEGORIES[0].value);
      setNotes(initialValues.notes || '');
      setIsHabit(initialValues.isHabit || false);
      setHabitFrequency(initialValues.habitFrequency || 'daily');
      setShowHabitOptions(initialValues.isHabit || false);
    } else {
      resetForm();
    }
  }, [initialValues]);

  const validate = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = 'El título es obligatorio';
    } else if (title.trim().length < 2) {
      newErrors.title = 'Mínimo 2 caracteres';
    } else if (title.trim().length > 100) {
      newErrors.title = 'Máximo 100 caracteres';
    }

    if (startTime && endTime && startTime >= endTime) {
      newErrors.timeRange = 'La hora de fin debe ser posterior a la de inicio';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validate();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setTouched({ title: true, timeRange: true });

    if (!validate()) return;

    const formattedTime = `${startTime}-${endTime}`;

    onSubmit({
      title: title.trim(),
      time: formattedTime,
      category,
      notes: notes.trim(),
      isHabit,
      habitFrequency: isHabit ? habitFrequency : null,
    });

    if (!initialValues) {
      resetForm();
    }
  };

  const categoryColorMap = {
    work: '#a8c7fa',
    study: '#c2e7ff',
    sport: '#c8e6c9',
    personal: '#ffe0b2',
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-md-on-surface-variant-dark">
          Título
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => handleBlur('title')}
          placeholder="Ej: Reunión de diseño"
          className={`
            w-full px-4 py-3 rounded-lg
            bg-surface-2 text-md-on-surface-dark
            border transition-all duration-md-short
            placeholder:text-md-on-surface-variant-dark/50
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-md-primary-dark focus-visible:ring-offset-2 focus-visible:ring-offset-md-surface-dark
            ${errors.title && touched.title
              ? 'border-md-error'
              : 'border-md-outline-dark hover:border-md-on-surface-variant-dark'
            }
          `}
          autoFocus
        />
        {errors.title && touched.title && (
          <p className="text-sm text-md-error">{errors.title}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-md-on-surface-variant-dark">
          Horario
        </label>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label htmlFor="startTime" className="sr-only">Hora de inicio</label>
            <input
              id="startTime"
              type="time"
              value={startTime}
              onChange={(e) => {
                setStartTime(e.target.value);
                setTouched((prev) => ({ ...prev, timeRange: true }));
              }}
              onBlur={() => handleBlur('timeRange')}
              className={`
                w-full px-3 py-2.5 rounded-lg text-center
                bg-surface-2 text-md-on-surface-dark
                border transition-all duration-md-short
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-md-primary-dark focus-visible:ring-offset-2 focus-visible:ring-offset-md-surface-dark
                ${errors.timeRange && touched.timeRange
                  ? 'border-md-error'
                  : 'border-md-outline-dark'
                }
              `}
            />
          </div>
          <span className="text-md-on-surface-variant-dark">—</span>
          <div className="flex-1">
            <label htmlFor="endTime" className="sr-only">Hora de fin</label>
            <input
              id="endTime"
              type="time"
              value={endTime}
              onChange={(e) => {
                setEndTime(e.target.value);
                setTouched((prev) => ({ ...prev, timeRange: true }));
              }}
              onBlur={() => handleBlur('timeRange')}
              className={`
                w-full px-3 py-2.5 rounded-lg text-center
                bg-surface-2 text-md-on-surface-dark
                border transition-all duration-md-short
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-md-primary-dark focus-visible:ring-offset-2 focus-visible:ring-offset-md-surface-dark
                ${errors.timeRange && touched.timeRange
                  ? 'border-md-error'
                  : 'border-md-outline-dark'
                }
              `}
            />
          </div>
        </div>
        {errors.timeRange && touched.timeRange && (
          <p className="text-sm text-md-error">{errors.timeRange}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-md-on-surface-variant-dark">
          Categoría
        </label>
        <div className="grid grid-cols-2 gap-2.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => setCategory(cat.value)}
              className={`
                relative overflow-hidden p-3 rounded-lg border transition-all duration-md-short
                flex items-center gap-2.5
                ${category === cat.value
                  ? 'bg-surface-2 border-md-primary-dark ring-1 ring-md-primary-dark/30'
                  : 'bg-transparent border-md-outline-dark hover:bg-surface-2'
                }
              `}
            >
              <div
                className="w-5 h-5 rounded-full flex-shrink-0"
                style={{ backgroundColor: categoryColorMap[cat.value] }}
              />
              <span
                className={`
                  text-sm font-medium
                  ${category === cat.value ? 'text-md-on-surface-dark' : 'text-md-on-surface-variant-dark'}
                `}
              >
                {cat.label}
              </span>
              {category === cat.value && (
                <Check
                  size={16}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-md-primary-dark"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-md-on-surface-variant-dark">
          Notas (opcional)
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Añade aclaraciones o detalles..."
          rows={3}
          className={`
            w-full px-4 py-3 rounded-lg
            bg-surface-2 text-md-on-surface-dark
            border border-md-outline-dark transition-all duration-md-short
            placeholder:text-md-on-surface-variant-dark/50
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-md-primary-dark focus-visible:ring-offset-2 focus-visible:ring-offset-md-surface-dark
            resize-none
          `}
        />
      </div>

      <div className="space-y-3">
        <button
          type="button"
          onClick={() => {
            setIsHabit(!isHabit);
            setShowHabitOptions(!isHabit);
          }}
          className={`
            w-full p-4 rounded-lg border transition-all duration-md-short
            flex items-center gap-3
            ${isHabit
              ? 'bg-md-primary-dark/10 border-md-primary-dark'
              : 'bg-transparent border-md-outline-dark hover:bg-surface-2'
            }
          `}
        >
          <div className={`
            w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
            ${isHabit
              ? 'bg-md-primary-dark border-md-primary-dark'
              : 'border-md-outline-dark'
            }
          `}>
            {isHabit && <Check size={14} className="text-md-on-primary-dark" />}
          </div>
          <div className="text-left">
            <span className={`text-sm font-medium ${isHabit ? 'text-md-primary-dark' : 'text-md-on-surface-dark'}`}>
              🔄 Repetir como hábito
            </span>
            <p className="text-xs text-md-on-surface-variant-dark mt-0.5">
              Se creará automáticamente cada día
            </p>
          </div>
        </button>

        {showHabitOptions && (
          <div className="pl-4 border-l-2 border-md-outline-dark/20 ml-3 space-y-2">
            <p className="text-xs font-medium text-md-on-surface-variant-dark uppercase tracking-wide">
              Frecuencia
            </p>
            <div className="grid grid-cols-1 gap-2">
              {HABIT_FREQUENCIES.map((freq) => (
                <button
                  key={freq.value}
                  type="button"
                  onClick={() => setHabitFrequency(freq.value)}
                  className={`
                    p-3 rounded-lg border transition-all duration-md-short
                    flex items-center gap-2
                    ${habitFrequency === freq.value
                      ? 'bg-surface-2 border-md-primary-dark'
                      : 'bg-transparent border-md-outline-dark hover:bg-surface-2'
                    }
                  `}
                >
                  <span className="text-lg">{freq.icon}</span>
                  <span className={`text-sm ${habitFrequency === freq.value ? 'text-md-primary-dark font-medium' : 'text-md-on-surface-variant-dark'}`}>
                    {freq.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="pt-2">
        <Button
          type="submit"
          variant="filled"
          size="large"
          className="w-full shadow-md-2"
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
