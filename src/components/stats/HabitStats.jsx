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
      color: 'text-accent-rose',
    },
    {
      title: 'Tasa de Cumplimiento',
      value: `${habitCompletionRate}%`,
      icon: '📈',
      color: 'text-accent-emerald',
    },
      {
          title: 'Hábitos Activos',
          value: `${totalHabits}`,
          icon: '✅',
          color: 'text-primary-text',
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
            <span className="text-xs font-medium text-primary-muted uppercase tracking-wide mb-1">
              {card.title}
            </span>
            <span className={`text-xl font-medium ${card.color}`}>{card.value}</span>
          </Card>
        ))}
      </div>

      <Card variant="filled" padding="large">
        <div className="flex items-center gap-2 mb-4">
          <Repeat size={20} className="text-primary-text" />
          <h3 className="text-base font-medium text-primary-text">
            Desglose por Frecuencia
          </h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 rounded-xl bg-surface-highlight border border-border-subtle">
            <Repeat size={24} className="mx-auto mb-2 text-accent-rose" />
            <p className="text-2xl font-medium text-primary-text">{dailyHabits}</p>
            <p className="text-xs text-primary-muted">Diarios</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-surface-highlight border border-border-subtle">
            <Calendar size={24} className="mx-auto mb-2 text-accent-indigo" />
            <p className="text-2xl font-medium text-primary-text">{weekdayHabits}</p>
            <p className="text-xs text-primary-muted">Lunes-Viernes</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-surface-highlight border border-border-subtle">
            <TrendingUp size={24} className="mx-auto mb-2 text-accent-emerald" />
            <p className="text-2xl font-medium text-primary-text">{weeklyHabits}</p>
            <p className="text-xs text-primary-muted">Semanales</p>
          </div>
        </div>
      </Card>

      <Card variant="filled" padding="large">
        <div className="flex items-center gap-2 mb-4">
          <Trophy size={20} className="text-accent-rose" />
          <h3 className="text-base font-medium text-primary-text">
            Progreso de Hábitos Esta Semana
          </h3>
        </div>
        <div className="space-y-3">
          {weeklyHabitProgress.map((day) => (
            <div key={day.day} className="flex items-center gap-3">
              <span className="text-sm font-medium text-primary-muted w-8">
                {day.day}
              </span>
              <div className="flex-1 h-2 bg-surface-highlight rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    day.completion >= 100
                      ? 'bg-accent-emerald'
                      : day.completion >= 50
                      ? 'bg-accent-rose'
                      : 'bg-md-error'
                  }`}
                  style={{ width: `${day.completion}%` }}
                />
              </div>
              <span className="text-xs text-primary-muted w-16 text-right">
                {day.completed}/{day.habits}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
