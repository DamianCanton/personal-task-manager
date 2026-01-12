import Card from '../common/Card';

export default function StatsOverview({ streak, weeklyRate, bestStreak }) {
  const stats = [
    { title: 'Racha Actual', value: `${streak} días`, icon: '🔥' },
    { title: 'Esta Semana', value: `${weeklyRate}%`, icon: '📊' },
    { title: 'Mejor Racha', value: `${bestStreak} días`, icon: '⭐' },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <Card
      variant="filled"
      padding="medium"
      className="flex flex-col items-center justify-center text-center h-full"
    >
      <span className="text-2xl mb-2">{icon}</span>
      <span className="text-xs font-medium text-primary-muted uppercase tracking-wide mb-1">
        {title}
      </span>
      <span className="text-xl font-medium text-primary-text">{value}</span>
    </Card>
  );
}
