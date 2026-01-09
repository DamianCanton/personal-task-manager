import { Repeat, Calendar, TrendingUp, Trophy } from 'lucide-react';
import Card from '../common/Card';

export default function HabitStats({ habitStats, weeklyHabitProgress }) {
  const {
    totalHabits,
    habitCompletionRate,
    dailyHabits,
    weekdayHabits,
    weeklyHabits,
    habitStreak,
  } = habitStats;

  const habitCards = [
    {
      title: 'Racha de Hábitos',
      value: `${habitStreak} días`,
      icon: '🔥',
      color: 'text-amber-400',
    },
    {
      title: 'Tasa de Cumplimiento',
      value: `${habitCompletionRate}%`,
      icon: '📈',
      color: 'text-emerald-400',
    },
      {
        title: 'Hábitos Activos',
        value: `${totalHabits} (${totalHabits > 0 ? Math.round((habitCompletionRate / 100) * totalHabits) : 0} hoy)`,
        icon: '✅',
        color: 'text-md-primary-dark',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-3 mb-6">
        {habitCards.map((card) => (
          <Card
            key={card.title}
            variant="filled"
            padding="medium"
            className="flex flex-col items-center justify-center text-center h-full"
          >
            <span className="text-2xl mb-2">{card.icon}</span>
            <span className="text-xs font-medium text-md-on-surface-variant-dark uppercase tracking-wide mb-1">
              {card.title}
            </span>
            <span className={`text-xl font-medium ${card.color}`}>{card.value}</span>
          </Card>
        ))}
      </div>

      <Card variant="filled" padding="large">
        <div className="flex items-center gap-2 mb-4">
          <Repeat size={20} className="text-md-primary-dark" />
          <h3 className="text-base font-medium text-md-on-surface-dark">
            Desglose por Frecuencia
          </h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 rounded-lg bg-surface-2">
            <Repeat size={24} className="mx-auto mb-2 text-amber-400" />
            <p className="text-2xl font-medium text-md-on-surface-dark">{dailyHabits}</p>
            <p className="text-xs text-md-on-surface-variant-dark">Diarios</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-surface-2">
            <Calendar size={24} className="mx-auto mb-2 text-md-primary-dark" />
            <p className="text-2xl font-medium text-md-on-surface-dark">{weekdayHabits}</p>
            <p className="text-xs text-md-on-surface-variant-dark">Lunes-Viernes</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-surface-2">
            <TrendingUp size={24} className="mx-auto mb-2 text-emerald-400" />
            <p className="text-2xl font-medium text-md-on-surface-dark">{weeklyHabits}</p>
            <p className="text-xs text-md-on-surface-variant-dark">Semanales</p>
          </div>
        </div>
      </Card>

      <Card variant="filled" padding="large">
        <div className="flex items-center gap-2 mb-4">
          <Trophy size={20} className="text-amber-400" />
          <h3 className="text-base font-medium text-md-on-surface-dark">
            Progreso de Hábitos Esta Semana
          </h3>
        </div>
        <div className="space-y-3">
          {weeklyHabitProgress.map((day) => (
            <div key={day.day} className="flex items-center gap-3">
              <span className="text-sm font-medium text-md-on-surface-variant-dark w-8">
                {day.day}
              </span>
              <div className="flex-1 h-2 bg-surface-2 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    day.completion >= 100
                      ? 'bg-emerald-400'
                      : day.completion >= 50
                      ? 'bg-amber-400'
                      : 'bg-md-error'
                  }`}
                  style={{ width: `${day.completion}%` }}
                />
              </div>
              <span className="text-xs text-md-on-surface-variant-dark w-16 text-right">
                {day.completed}/{day.habits}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
